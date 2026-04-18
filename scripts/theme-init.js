// Apply theme as early as possible to reduce theme flash on load.
(() => {
  const savedMode = localStorage.getItem("themePreference") || "auto";
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolvedTheme =
    savedMode === "auto" ? (prefersDark ? "dark" : "light") : savedMode;

  document.documentElement.dataset.themeMode = savedMode;
  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.style.colorScheme = resolvedTheme;
})();
