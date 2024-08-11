import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import I18NextHttpBackend from 'i18next-http-backend'

i18n
  .use(I18NextHttpBackend)
  // Enable automatic language detection
  .use(LanguageDetector)

  // Enables the hook initialization module
  .use(initReactI18next)
  .init({
    lng: 'en',
    backend: {
      /* translation file path */
      loadPath: '/locales/{{lng}}.json'
    },
    fallbackLng: 'en',
    debug: false,
    keySeparator: false,
    react: {
      useSuspense: false
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    }
  })

export default i18n
