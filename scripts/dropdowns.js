// Header dropdowns with click-outside-close and animations
const headerDropdowns = document.querySelectorAll(".header-dropdown");

// Handle each dropdown
headerDropdowns.forEach((dropdown) => {
  const summary = dropdown.querySelector("summary");
  const panel = dropdown.querySelector(".dropdown-panel");

  // Custom toggle handler
  summary.addEventListener("click", (e) => {
    e.preventDefault();

    if (dropdown.hasAttribute("open")) {
      // Close with animation
      panel.style.opacity = "0";
      panel.style.transform = "translateY(-8px)";
      setTimeout(() => {
        dropdown.removeAttribute("open");
        panel.style.opacity = "";
        panel.style.transform = "";
      }, 150);
    } else {
      // Open
      dropdown.setAttribute("open", "");
      panel.style.opacity = "0";
      panel.style.transform = "translateY(-8px)";
      requestAnimationFrame(() => {
        panel.style.transition = "opacity 150ms ease, transform 150ms ease";
        panel.style.opacity = "1";
        panel.style.transform = "translateY(0)";
      });

      // Close others
      headerDropdowns.forEach((other) => {
        if (other !== dropdown && other.hasAttribute("open")) {
          const otherPanel = other.querySelector(".dropdown-panel");
          otherPanel.style.opacity = "0";
          otherPanel.style.transform = "translateY(-8px)";
          setTimeout(() => {
            other.removeAttribute("open");
            otherPanel.style.opacity = "";
            otherPanel.style.transform = "";
          }, 150);
        }
      });
    }
  });
});

// Close dropdowns when clicking outside
document.addEventListener("click", (e) => {
  headerDropdowns.forEach((dropdown) => {
    if (dropdown.hasAttribute("open") && !dropdown.contains(e.target)) {
      const panel = dropdown.querySelector(".dropdown-panel");
      panel.style.opacity = "0";
      panel.style.transform = "translateY(-8px)";
      setTimeout(() => {
        dropdown.removeAttribute("open");
        panel.style.opacity = "";
        panel.style.transform = "";
      }, 150);
    }
  });
});
