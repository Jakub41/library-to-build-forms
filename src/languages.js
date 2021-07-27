import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/polyfill';

function loadLocaleData(locale) {
  switch (locale) {
    default:
      return import('../compiled-lang/en.json');
  }
}

export const getLanguage = () =>
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage ||
  'en';

export const getMessages = (ln = getLanguage()) => {
  const lang = ln.toLowerCase().split(/[_-]+/)[0];

  return loadLocaleData(lang);
};
