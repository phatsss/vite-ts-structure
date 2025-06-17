import { Moon, Sun, SunMoon } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { useTheme } from '@/contexts/ThemeContext'
import { useTranslation } from 'react-i18next'

export default function ModeToggle() {
  const { t } = useTranslation()

  const { setTheme, theme } = useTheme()

  const { isMobile } = useSidebar()

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem key={'mode-switcher'}>
          <SidebarMenuButton asChild>
            <a href={'#'}>
              <SunMoon />
              <span>{t('nav.switchMode')}</span>
            </a>
          </SidebarMenuButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuAction
                showOnHover
                className="data-[state=open]:bg-accent rounded-sm"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-24 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align={isMobile ? 'end' : 'start'}
            >
              <DropdownMenuCheckboxItem
                key={'light'}
                checked={theme === 'light'}
                onClick={() => setTheme('light')}
              >
                <span>{t('common.light')}</span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                key={'dark'}
                checked={theme === 'dark'}
                onClick={() => setTheme('dark')}
              >
                <span>{t('common.dark')}</span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                key={'system'}
                checked={theme === 'system'}
                onClick={() => setTheme('system')}
              >
                <span>{t('common.system')}</span>
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  )
}
