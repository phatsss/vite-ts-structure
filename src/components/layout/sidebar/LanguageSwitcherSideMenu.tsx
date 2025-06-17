import { EllipsisVertical, Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

/**
 * LanguageSwitcher component
 *
 * Provides a dropdown menu to switch between available languages (English and Lao)
 * Uses react-i18next to handle language changes
 */
export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation()

  const { isMobile } = useSidebar()

  // Current language code
  const currentLanguage = i18n.language

  // Available languages
  const languages = [
    { code: 'en', name: t('language.english') },
    { code: 'lo', name: t('language.lao') },
  ]

  // Change language handler
  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code)
  }

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem key={'language-switcher'}>
          <SidebarMenuButton asChild>
            <a href={'#'}>
              <Languages />
              <span>{t('language.title')}</span>
            </a>
          </SidebarMenuButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuAction
                showOnHover
                className="data-[state=open]:bg-accent rounded-sm"
              >
                <EllipsisVertical />
                <span className="sr-only">More</span>
              </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-24 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align={isMobile ? 'end' : 'start'}
            >
              {languages.map((lang) => (
                <DropdownMenuCheckboxItem
                  checked={currentLanguage === lang.code}
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                >
                  <span>{lang.name}</span>
                  <DropdownMenuShortcut>
                    {lang.code.toUpperCase()}
                  </DropdownMenuShortcut>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  )
}
