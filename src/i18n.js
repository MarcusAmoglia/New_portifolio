import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import ptTranslations from './locales/pt.json'
import enTranslations from './locales/en.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: ptTranslations },
      en: { translation: enTranslations }
    },
    fallbackLng: 'pt',
    interpolation: { escapeValue: false },
    detection: {
      order: ['navigator', 'localStorage', 'sessionStorage', 'htmlTag'],
      caches: ['localStorage']
    }
  })

export default i18n
