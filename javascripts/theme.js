(function () {
  'use strict';

  var root = document.documentElement;
  var storageKey = 'opale-color-mode';
  var mode = 'light';

  try {
    if (localStorage.getItem(storageKey) === 'dark') mode = 'dark';
  } catch (error) {
    // Storage can be unavailable; the switch still works for this page.
  }

  // Apply the saved palette before the body renders.
  root.setAttribute('data-opale-color-mode', mode);

  function mountSwitch() {
    if (document.getElementById('opale-color-mode-toggle')) return;

    var button = document.createElement('button');
    var chinese = /^zh\b/i.test(root.lang);
    button.id = 'opale-color-mode-toggle';
    button.type = 'button';
    button.setAttribute('aria-label', chinese ? '暗色模式' : 'Dark mode');

    function render() {
      var dark = root.getAttribute('data-opale-color-mode') === 'dark';
      button.setAttribute('aria-pressed', String(dark));
      button.textContent = dark ? (chinese ? '☀ 亮色模式' : '☀ Light mode') : (chinese ? '☾ 暗色模式' : '☾ Dark mode');
      button.title = button.textContent;
    }

    button.addEventListener('click', function () {
      var next = root.getAttribute('data-opale-color-mode') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-opale-color-mode', next);
      render();
      try {
        localStorage.setItem(storageKey, next);
      } catch (error) {
        // Do not prevent switching when browser storage is blocked.
      }
    });

    render();
    (document.getElementById('header') || document.body).appendChild(button);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountSwitch, { once: true });
  } else {
    mountSwitch();
  }
}());
