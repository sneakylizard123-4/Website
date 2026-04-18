// Keep header dropdowns mutually exclusive: opening one closes the others.
const headerDropdowns = document.querySelectorAll(".header-dropdown");

headerDropdowns.forEach((dropdown) => {
  dropdown.addEventListener("toggle", () => {
    if (!dropdown.open) {
      return;
    }

    headerDropdowns.forEach((other) => {
      if (other !== dropdown) {
        other.open = false;
      }
    });
  });
});
