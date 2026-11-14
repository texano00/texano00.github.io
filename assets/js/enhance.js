/*
 * Progressive enhancement only.
 * Nothing here is required to read the CV: if this file fails to load, the page
 * stays complete and navigable (FR-011).
 */
(function () {
  'use strict';

  var root = document.documentElement;
  var STORAGE_KEY = 'cv-theme';

  function applyTheme(theme) {
    if (theme === 'light' || theme === 'dark') {
      root.setAttribute('data-theme', theme);
    } else {
      root.removeAttribute('data-theme');
    }
  }

  try {
    applyTheme(localStorage.getItem(STORAGE_KEY));
  } catch (error) {
    /* storage may be unavailable (private mode, blocked cookies) */
  }

  var toggle = document.querySelector('[data-theme-toggle]');
  if (toggle) {
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)');
    var current = function () {
      return root.getAttribute('data-theme') || (systemDark.matches ? 'dark' : 'light');
    };
    var sync = function () {
      var isDark = current() === 'dark';
      toggle.textContent = isDark ? 'Light mode' : 'Dark mode';
      toggle.setAttribute('aria-pressed', String(isDark));
    };

    toggle.hidden = false;
    sync();

    toggle.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (error) {
        /* ignore */
      }
      sync();
    });

    if (typeof systemDark.addEventListener === 'function') {
      systemDark.addEventListener('change', sync);
    }
  }

  // Upgrade the inert [at] text into a mailto link. The plain address never
  // exists in the served HTML, only in the DOM after this script runs.
  var emailTarget = document.querySelector('[data-email]');
  if (emailTarget && emailTarget.parentNode) {
    var address =
      emailTarget.getAttribute('data-user') + '@' + emailTarget.getAttribute('data-domain');
    var link = document.createElement('a');
    link.href = 'mailto:' + address;
    link.textContent = emailTarget.textContent;
    emailTarget.parentNode.replaceChild(link, emailTarget);
  }
})();
