(function () {
  var preference;
  try {
    preference = localStorage.getItem('rsa-theme');
  } catch {
    // The system preference still works when browser storage is unavailable.
  }
  var theme =
    preference === 'light' || preference === 'dark'
      ? preference
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#17111F' : '#F7F4FA');
})();
