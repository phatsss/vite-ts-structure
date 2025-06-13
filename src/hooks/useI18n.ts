import { useTranslation } from 'react-i18next'

/**
 * Custom hook for internationalization
 *
 * Provides translation functions and language utilities.
 * Wraps react-i18next's useTranslation hook to provide a consistent API.
 *
 * @returns Object with translation and language utilities
 */
export function useI18n() {
  const { t, i18n } = useTranslation()

  /**
   * Change the current language
   *
   * @param {string} lang - Language code to switch to
   */
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  /**
   * Get the current language code
   *
   * @returns {string} Current language code
   */
  const getCurrentLanguage = () => i18n.language

  /**
   * Check if the current language is the specified language
   *
   * @param {string} lang - Language code to check
   * @returns {boolean} Whether the current language matches
   */
  const isCurrentLanguage = (lang: string) => i18n.language === lang

  /**
   * Get all available languages
   *
   * @returns {string[]} Array of available language codes
   */
  const getAvailableLanguages = () => Object.keys(i18n.options.resources || {})

  return {
    t,
    i18n,
    changeLanguage,
    getCurrentLanguage,
    isCurrentLanguage,
    getAvailableLanguages,
  }
}
