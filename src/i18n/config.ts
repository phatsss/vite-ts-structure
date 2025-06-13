import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslation from './locales/en.json';
import loTranslation from './locales/lo.json';

/**
 * i18next configuration
 * 
 * This sets up internationalization for the application with the following features:
 * - Language detection from browser/localStorage
 * - English and Lao language support
 * - Fallback to English if a translation is missing
 * - Debug mode in development environment
 */
i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      lo: {
        translation: loTranslation
      }
    },
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    
    interpolation: {
      escapeValue: false // React already safes from XSS
    },
    
    // Detection options
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;