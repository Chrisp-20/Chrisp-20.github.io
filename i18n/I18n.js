const translations = {
  es: i18n_es,
  en: i18n_en
};

let currentLang = localStorage.getItem('lang') || 'es';

function t(key) {
  const dict = translations[currentLang] || translations.es;
  return dict[key] !== undefined ? dict[key] : (translations.es[key] || key);
}

function applyTranslations(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  const dict = translations[lang] || translations.es;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) el.placeholder = dict[key];
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (dict[key] !== undefined) el.title = dict[key];
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria-label');
    if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
  });

  const esBtn = document.getElementById('langEsBtn');
  const enBtn = document.getElementById('langEnBtn');
  if (esBtn && enBtn) {
    esBtn.classList.toggle('active', lang === 'es');
    enBtn.classList.toggle('active', lang === 'en');
  }

  // Si el modal de colaborar está en el paso 2, refresca el texto del botón
  const btnSend = document.getElementById('btnSend');
  const modalStep2 = document.getElementById('modalStep2');
  if (btnSend && modalStep2 && modalStep2.style.display === 'block') {
    btnSend.textContent = dict['modal.sendwhatsapp'];
  }
}

function setLang(lang) {
  localStorage.setItem('lang', lang);
  applyTranslations(lang);
}

function setTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark', isDark);
  localStorage.setItem('theme', theme);
  const darkBtn = document.getElementById('themeDarkBtn');
  const lightBtn = document.getElementById('themeLightBtn');
  if (darkBtn && lightBtn) {
    darkBtn.classList.toggle('active', isDark);
    lightBtn.classList.toggle('active', !isDark);
  }
}

function toggleOptionsPanel() {
  document.getElementById('optionsPanel').classList.toggle('open');
}

document.addEventListener('click', (e) => {
  const wrap = document.querySelector('.options-wrap');
  const panel = document.getElementById('optionsPanel');
  if (wrap && panel && panel.classList.contains('open') && !wrap.contains(e.target)) {
    panel.classList.remove('open');
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const panel = document.getElementById('optionsPanel');
    if (panel) panel.classList.remove('open');
  }
});

(function init() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  applyTranslations(localStorage.getItem('lang') || 'es');
})();