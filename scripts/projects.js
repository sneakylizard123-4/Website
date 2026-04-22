/**
 * Projects loader and renderer.
 * Loads project data from data/projects.json and renders it dynamically.
 */

async function loadProjects() {
  try {
    const response = await fetch("../../data/projects.json");
    if (!response.ok) throw new Error("Failed to load projects");
    return await response.json();
  } catch (error) {
    console.error("Error loading projects:", error);
    return { projects: [] };
  }
}

const SECTION_LABELS = {
  featured: "Featured",
  "in-progress": "In Progress",
  archive: "Archive",
};

function normalizeProjectsData(data) {
  if (Array.isArray(data.projects)) {
    return data.projects;
  }

  // Backward compatibility for older shape: { featured: [], in-progress: [], archive: [] }
  const knownSections = ["featured", "in-progress", "archive"];
  const fallbackProjects = [];

  knownSections.forEach((section) => {
    const sectionProjects = Array.isArray(data[section]) ? data[section] : [];
    sectionProjects.forEach((project) => {
      fallbackProjects.push({
        ...project,
        sections: [section],
      });
    });
  });

  return fallbackProjects;
}

function getProjectsForSection(data, section) {
  return normalizeProjectsData(data).filter((project) => {
    if (!Array.isArray(project.sections)) {
      return false;
    }

    return project.sections.includes(section);
  });
}

function getSortSelect() {
  return document.getElementById("project-sort");
}

function getCategorySelect() {
  return document.getElementById("project-category");
}

function getNameFilterInput() {
  return document.getElementById("project-name-filter");
}

function getSortMode() {
  const sortSelect = getSortSelect();
  return sortSelect ? sortSelect.value : "default";
}

function getSelectedCategory(defaultCategory) {
  const categorySelect = getCategorySelect();
  return categorySelect && categorySelect.value
    ? categorySelect.value
    : defaultCategory;
}

function getNameFilterValue() {
  const nameFilterInput = getNameFilterInput();
  return nameFilterInput ? nameFilterInput.value.trim().toLowerCase() : "";
}

function getTagSortKey(project) {
  return (Array.isArray(project.tags) ? project.tags : [])
    .map((tag) => tag.toLowerCase())
    .join(" ");
}

function sortProjects(projects, sortMode) {
  const sortedProjects = [...projects];

  if (sortMode === "tags-asc") {
    sortedProjects.sort((left, right) => {
      const leftKey = getTagSortKey(left);
      const rightKey = getTagSortKey(right);
      return (
        leftKey.localeCompare(rightKey) || left.title.localeCompare(right.title)
      );
    });
  }

  if (sortMode === "tags-desc") {
    sortedProjects.sort((left, right) => {
      const leftKey = getTagSortKey(left);
      const rightKey = getTagSortKey(right);
      return (
        rightKey.localeCompare(leftKey) || left.title.localeCompare(right.title)
      );
    });
  }

  return sortedProjects;
}

function filterProjectsByName(projects, nameFilter) {
  if (!nameFilter) {
    return projects;
  }

  return projects.filter((project) => {
    const title = (project.title || "").toLowerCase();
    return title.includes(nameFilter);
  });
}

function getProjectsByActiveCategory(data, activeCategory) {
  if (activeCategory === "all") {
    return normalizeProjectsData(data);
  }

  return getProjectsForSection(data, activeCategory);
}

function getEmptyStateLabel(activeCategory) {
  return SECTION_LABELS[activeCategory] || "Selected";
}

function renderProject(project) {
  const tagsHTML = (Array.isArray(project.tags) ? project.tags : [])
    .map((tag) => `<span class="project-tag">${tag}</span>`)
    .join("");
  const statusBadge = project.status
    ? `<span class="project-status-badge">${project.status}</span>`
    : "";
  const dateText = project.date
    ? `<span class="project-date">${project.date}</span>`
    : "";
  const projectMeta = statusBadge || dateText
    ? `<div class="project-meta">${statusBadge}${dateText}</div>`
    : "";
  const projectLink = project.file || project.link || "#";
  const projectImage = project.image || "";
  const imageAlt = project.imageAlt || `${project.title} preview`;
  const hoverImage = project.hoverImage || "";
  const imageHTML = projectImage
    ? `<div class="project-card-image-wrap">
        <img class="project-card-image project-card-image-base" src="${projectImage}" alt="${imageAlt}" loading="lazy" />
        ${hoverImage ? `<img class="project-card-image project-card-image-hover" src="${hoverImage}" alt="" aria-hidden="true" loading="lazy" />` : ""}
      </div>`
    : "";

  return `
    <li class="project-card">
      <div class="project-card-content">
        ${projectMeta}
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p><a href="${projectLink}" class="project-link">View project →</a></p>
        ${tagsHTML ? `<div class="project-tags">${tagsHTML}</div>` : ""}
      </div>
      ${imageHTML}
    </li>
  `;
}

function renderProjectsByCategory(defaultCategory) {
  const container = document.getElementById("projects-container");
  if (!container) return;

  loadProjects().then((data) => {
    const activeCategory = getSelectedCategory(defaultCategory);
    const filteredByCategory = getProjectsByActiveCategory(
      data,
      activeCategory,
    );
    const filteredByName = filterProjectsByName(
      filteredByCategory,
      getNameFilterValue(),
    );
    const projects = sortProjects(filteredByName, getSortMode());

    if (projects.length === 0) {
      const label = getEmptyStateLabel(activeCategory);
      container.innerHTML = `<p>No projects found for ${label}. <a href="../../index.html">Back home</a></p>`;
      return;
    }

    const html = `<ul class="projects-list">${projects
      .map(renderProject)
      .join("")}</ul>`;

    container.innerHTML = html;
  });
}

// Auto-detect category from page URL and render
function initializeProjectsPage() {
  const path = window.location.pathname;
  let category = "featured";

  if (path.includes("in-progress")) {
    category = "in-progress";
  } else if (path.includes("archive")) {
    category = "archive";
  }

  const categorySelect = getCategorySelect();
  if (categorySelect && !categorySelect.value) {
    categorySelect.value = category;
  }

  renderProjectsByCategory(category);

  const sortSelect = getSortSelect();
  if (sortSelect) {
    sortSelect.addEventListener("change", () =>
      renderProjectsByCategory(category),
    );
  }

  if (categorySelect) {
    categorySelect.addEventListener("change", () =>
      renderProjectsByCategory(category),
    );
  }

  const nameFilterInput = getNameFilterInput();
  if (nameFilterInput) {
    nameFilterInput.addEventListener("input", () =>
      renderProjectsByCategory(category),
    );
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeProjectsPage);
} else {
  initializeProjectsPage();
}
