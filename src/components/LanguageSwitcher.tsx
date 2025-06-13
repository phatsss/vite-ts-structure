import { useState } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * LanguageSwitcher component
 * 
 * Provides a dropdown menu to switch between available languages (English and Lao)
 * Uses react-i18next to handle language changes
 */
export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  
  // Current language code
  const currentLanguage = i18n.language
  
  // Available languages
  const languages = [
    { code: 'en', name: t('language.english') },
    { code: 'lo', name: t('language.lao') }
  ]
  
  // Change language handler
  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code)
    setIsOpen(false)
  }
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-1 text-sm rounded-md hover:bg-gray-100 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{currentLanguage === 'en' ? 'EN' : 'LO'}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-10"
          role="menu"
          aria-orientation="vertical"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`block w-full text-left px-4 py-2 text-sm ${currentLanguage === lang.code ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'}`}
              role="menuitem"
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}