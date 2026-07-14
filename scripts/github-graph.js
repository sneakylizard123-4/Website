/**
 * GitHub Contribution Graph
 * Fetches events from GitHub API and displays contribution activity
 */

(function() {
  'use strict';

  const USERNAME = 'sneakylizard123-4';
  const API_URL = `https://api.github.com/users/${USERNAME}/events`;
  const PERIODS = {
    month: 30,
    '3months': 90,
    '6months': 180,
    year: 365
  };

  let currentPeriod = 'year';
  let allContributions = {};

  // Colors for contribution levels (matching GitHub's theme)
  const COLORS = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
  };

  function getColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return isDark ? COLORS.dark : COLORS.light;
  }

  /**
   * Fetch events from GitHub API
   */
  async function fetchEvents() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch GitHub events:', error);
      return [];
    }
  }

  /**
   * Count contributions per day from events
   * Note: GitHub public API only returns last ~90 days
   */
  function countContributionsByDay(events) {
    const contributions = {};
    const now = new Date();

    // Initialize last 90 days (API limit for public requests)
    const maxDays = 90;
    for (let i = maxDays - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split('T')[0];
      contributions[key] = 0;
    }

    // Debug: log event types
    const eventTypes = {};
    events.forEach(e => {
      eventTypes[e.type] = (eventTypes[e.type] || 0) + 1;
    });
    console.log('GitHub event types:', eventTypes);

    // Count PushEvents (one push = at least one commit)
    // Note: Public API doesn't include commit counts in payload
    let totalPushes = 0;
    events.forEach(event => {
      if (event.type === 'PushEvent') {
        const date = event.created_at.split('T')[0];
        if (contributions[date] !== undefined) {
          // Count as 1 commit minimum (actual count unavailable without auth)
          contributions[date] += 1;
          totalPushes++;
        }
      }
    });

    console.log(`GitHub: Fetched ${events.length} events, ${totalPushes} pushes`);
    return contributions;
  }

  /**
   * Get contribution level from count
   */
  function getLevel(count) {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 4) return 2;
    if (count <= 8) return 3;
    return 4;
  }

  /**
   * Filter contributions by period
   */
  function filterByPeriod(contributions, period) {
    const days = PERIODS[period] || 365;
    const filtered = {};
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split('T')[0];
      filtered[key] = contributions[key] || 0;
    }

    return filtered;
  }

  /**
   * Render the contribution grid with labels
   */
  function renderGrid(contributions) {
    const grid = document.getElementById('contribution-grid');
    const labelContainer = document.getElementById('graph-labels');
    if (!grid) return;

    const colors = getColors();
    const dates = Object.keys(contributions);

    const cellSize = 14;
    const cellGap = 3;
    const labelOffset = 25; // space for day labels on left
    const headerOffset = 20; // space for month labels on top

    const weeks = Math.ceil(dates.length / 7);
    const width = labelOffset + weeks * (cellSize + cellGap);
    const height = headerOffset + 7 * (cellSize + cellGap);

    // Update viewBox to fit the data
    grid.setAttribute('viewBox', `0 0 ${width} ${height}`);
    grid.setAttribute('preserveAspectRatio', 'xMinYMin meet');

    let html = '';
    const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
    const months = [];

    // Generate day labels (left side)
    dayLabels.forEach((label, i) => {
      if (label) {
        html += `<text x="8" y="${headerOffset + i * (cellSize + cellGap) + cellSize / 2 + 4}" font-size="10" fill="var(--text-secondary)">${label}</text>`;
      }
    });

    // Track months for labels
    let lastMonth = -1;

    dates.forEach((date, index) => {
      const count = contributions[date];
      const level = getLevel(count);
      const weekIndex = Math.floor(index / 7);
      const dayIndex = new Date(date).getDay();
      const x = labelOffset + weekIndex * (cellSize + cellGap);
      const y = headerOffset + dayIndex * (cellSize + cellGap);

      // Add month label at start of each month
      const currentMonth = new Date(date).getMonth();
      if (currentMonth !== lastMonth && dayIndex === 0) {
        const monthName = new Date(date).toLocaleString('default', { month: 'short' });
        html += `<text x="${x}" y="12" font-size="10" fill="var(--text-secondary)" font-weight="500">${monthName}</text>`;
        lastMonth = currentMonth;
      }

      html += `<rect class="day" x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="2" ry="2" data-count="${count}" fill="${colors[level]}" data-date="${date}"></rect>`;
    });

    grid.innerHTML = html;
  }

  /**
   * Render stats summary
   */
  function renderStats(contributions) {
    const stats = document.getElementById('contribution-stats');
    if (!stats) return;

    const values = Object.values(contributions);
    const total = values.reduce((a, b) => a + b, 0);
    const daysWithActivity = values.filter(v => v > 0).length;
    const maxDay = Math.max(...values);

    stats.innerHTML = `
      <div class="stat">
        <span class="stat-value">${total}</span>
        <span class="stat-label">contributions</span>
      </div>
      <div class="stat">
        <span class="stat-value">${daysWithActivity}</span>
        <span class="stat-label">active days</span>
      </div>
      <div class="stat">
        <span class="stat-value">${maxDay}</span>
        <span class="stat-label">max / day</span>
      </div>
    `;
  }

  /**
   * Render a specific period
   */
  function renderPeriod(period) {
    currentPeriod = period;
    const filtered = filterByPeriod(allContributions, period);
    renderGrid(filtered);
    renderStats(filtered);

    // Update active tab
    document.querySelectorAll('.graph-tabs .tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.period === period);
    });
  }

  /**
   * Update colors when theme changes
   */
  function updateColors() {
    if (Object.keys(allContributions).length > 0) {
      const filtered = filterByPeriod(allContributions, currentPeriod);
      renderGrid(filtered);
    }
  }

  /**
   * Set up tab click handlers
   */
  function setupTabs() {
    document.querySelectorAll('.graph-tabs .tab').forEach(tab => {
      tab.addEventListener('click', () => {
        renderPeriod(tab.dataset.period);
      });
    });
  }

  async function init() {
    // Fetch and cache all data
    const events = await fetchEvents();
    allContributions = countContributionsByDay(events);

    // Initial render
    renderPeriod(currentPeriod);
    setupTabs();

    // Listen for theme changes
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        setTimeout(updateColors, 300);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();