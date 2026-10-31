// Runs before paint (loaded via <Script strategy="beforeInteractive"> in the
// root layout) so the saved/system theme is applied without a flash.
// The storage key must match ThemeToggle's.
(function () {
  try {
    var theme = localStorage.getItem("theme");
    var dark = theme
      ? theme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (dark) {
      document.documentElement.classList.add("dark");
    }
  } catch (error) {
    // localStorage can throw (e.g. blocked cookies); fall back to light.
  }
})();
