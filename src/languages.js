import '@formatjs/intl-getcanonicallocales/polyfill'
import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/locale-data/it';
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/locale-data/it';

function loadLocaleData(locale) {
  console.log('locale', locale);
  if (locale !== 'en') return import(`./compiled-lang/${locale}.json`);
  return import('./compiled-lang/en.json');
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
