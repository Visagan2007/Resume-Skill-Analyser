(function () {
  var preference = 'full';
  try {
    var stored = localStorage.getItem('rsa-effects');
    if (stored === 'full' || stored === 'system' || stored === 'reduced') preference = stored;
  } catch {
    // Keep full effects when storage is unavailable.
  }
  var systemMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false;
  var systemTransparency =
    window.matchMedia?.('(prefers-reduced-transparency: reduce)').matches || false;
  var root = document.documentElement;
  root.dataset.effects = preference;
  root.dataset.motion =
    preference === 'reduced' || (preference === 'system' && systemMotion) ? 'reduced' : 'full';
  root.dataset.transparency =
    preference === 'reduced' || (preference === 'system' && systemTransparency)
      ? 'reduced'
      : 'full';
})();
