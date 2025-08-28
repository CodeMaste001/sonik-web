document.addEventListener('DOMContentLoaded', () => {
  const defaultLang = 'es';
  const savedLang = localStorage.getItem('lang') || defaultLang;

  const loadLanguage = async (lang) => {
    try {
      const res = await fetch(`./locales/${lang}.json`);
      const translations = await res.json();
      applyTranslations(translations);
      localStorage.setItem('lang', lang);
    } catch (err) {
      console.error('Error cargando archivo de idioma:', err);
    }
  };

  const applyTranslations = (translations) => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) el.textContent = translations[key];
    });
  };

  loadLanguage(savedLang);

  document.getElementById('language-selector').addEventListener('change', (e) => {
    loadLanguage(e.target.value);
  });
});