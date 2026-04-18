// Theme selection logic with auto-detect support.
const themeToggle = document.getElementById("theme-toggle");
const colorSchemeMedia = window.matchMedia("(prefers-color-scheme: dark)");

function resolveTheme(mode) {
  if (mode === "auto") {
    return colorSchemeMedia.matches ? "dark" : "light";
  }
  return mode;
}

function applyTheme(mode) {
  const resolved = resolveTheme(mode);
  document.documentElement.dataset.themeMode = mode;
  document.documentElement.dataset.theme = resolved;
  document.documentElement.style.colorScheme = resolved;

  // Trigger a quick animation on theme changes.
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.body.classList.remove("theme-fade");
    void document.body.offsetWidth;
    document.body.classList.add("theme-fade");
  }
}

function updateThemeToggle(mode) {
  if (!themeToggle) {
    return;
  }

  const resolvedMode = resolveTheme(mode);

  const iconByMode = {
    light:
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4" fill="currentColor"/><path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1M18.7 18.7l-2.1-2.1M7.4 7.4 5.3 5.3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    dark: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M14.7 2.8a9.2 9.2 0 1 0 6.5 15.8 7.6 7.6 0 1 1-6.5-15.8Z"/></svg>',
  };

  const titleByMode = {
    auto: "Theme: Auto (system)",
    light: "Theme: Light",
    dark: "Theme: Dark",
  };

  const iconMode = mode === "auto" ? resolvedMode : mode;
  themeToggle.innerHTML = iconByMode[iconMode] || iconByMode.light;
  themeToggle.title = titleByMode[mode] || "Theme: Auto";
  themeToggle.setAttribute(
    "aria-label",
    `${titleByMode[mode] || "Theme: Auto"}. Click to change`,
  );
}

const initialMode = document.documentElement.dataset.themeMode || "auto";
updateThemeToggle(initialMode);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentMode = document.documentElement.dataset.themeMode || "auto";

    // Auto is the default startup mode, but manual toggling is only light <-> dark.
    let nextMode;
    if (currentMode === "auto") {
      nextMode = resolveTheme("auto") === "dark" ? "light" : "dark";
    } else {
      nextMode = currentMode === "dark" ? "light" : "dark";
    }

    localStorage.setItem("themePreference", nextMode);
    applyTheme(nextMode);
    updateThemeToggle(nextMode);
  });
}

colorSchemeMedia.addEventListener("change", () => {
  const mode = document.documentElement.dataset.themeMode || "auto";
  if (mode === "auto") {
    applyTheme("auto");
    updateThemeToggle("auto");
  }
});
