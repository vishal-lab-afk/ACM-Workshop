// Developer Dashboard — small helpers.
// Students do not need to edit this file during the workshop.

(function () {
  'use strict';

  // ---------- Theme toggle ----------
  var STORAGE_KEY = 'dashboard-theme';
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function currentTheme() {
    var explicit = root.getAttribute('data-theme');
    if (explicit === 'dark' || explicit === 'light') return explicit;
    return systemPrefersDark() ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (toggle) toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) { /* ignore: theme just won't persist */ }
  }

  if (toggle) {
    toggle.setAttribute('aria-pressed', currentTheme() === 'dark' ? 'true' : 'false');
    toggle.addEventListener('click', function () {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });
  }

  // ---------- Status badge colors ----------
  // Turns the badge text ("Development") into a data attribute
  // ("development") so styles.css can color the known statuses.
  var badges = document.querySelectorAll('.status');
  for (var i = 0; i < badges.length; i++) {
    var label = badges[i].textContent.trim().toLowerCase().replace(/\s+/g, '-');
    badges[i].setAttribute('data-status', label);
  }

  // ---------- Today's date ----------
  var dateEl = document.getElementById('today-date');
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString(undefined, {
      weekday: 'long', month: 'long', day: 'numeric'
    });
  }
})();
