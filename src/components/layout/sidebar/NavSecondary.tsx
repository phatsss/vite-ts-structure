import * as React from 'react'
import { type LucideIcon } from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import LanguageSwitcher from '@/components/layout/sidebar/LanguageSwitcherSideMenu'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import ModeToggle from '@/components/layout/sidebar/ModeToggleSideMenu'

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    action?: () => void
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const { t } = useTranslation()

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild onClick={item.action}>
                <Link to={item.url}>
                  <item.icon />
                  <span>{t(`nav.${item.title}`)}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <LanguageSwitcher />
        <ModeToggle />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
