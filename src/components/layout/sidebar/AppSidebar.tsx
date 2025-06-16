import {
  Binary,
  Camera,
  ChartBar,
  CircleHelp,
  Database,
  Earth,
  Fan,
  FileInput,
  FileText,
  Folder,
  LayoutDashboard,
  PackageSearch,
  Search,
  Settings,
  Users,
} from 'lucide-react'
import * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { NavDocuments } from './NavDocuments'
import { NavMain } from './NavMain'
import { NavSecondary } from './NavSecondary'
import { NavUser } from './NavUser'
import { useTranslation } from 'react-i18next'

const data = {
  user: {
    name: 'phatsss',
    email: 'phats@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'dashboard',
      url: '#',
      icon: LayoutDashboard,
    },
    {
      title: 'products',
      url: '/products',
      icon: PackageSearch,
    },
    {
      title: 'lifecycle',
      url: '#',
      icon: Fan,
    },
    {
      title: 'analytics',
      url: '#',
      icon: ChartBar,
    },
    {
      title: 'projects',
      url: '#',
      icon: Folder,
    },
    {
      title: 'team',
      url: '#',
      icon: Users,
    },
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: Camera,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Proposal',
      icon: Folder,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Prompts',
      icon: FileInput,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'settings',
      url: '#',
      icon: Settings,
    },
    {
      title: 'help',
      url: '#',
      icon: CircleHelp,
    },
    {
      title: 'search',
      url: '#',
      icon: Search,
      action: () => {
        console.log('click')
      },
    },
  ],
  documents: [
    {
      name: 'dataLibrary',
      url: '#',
      icon: Database,
    },
    {
      name: 'reports',
      url: '#',
      icon: FileText,
    },
    {
      name: 'wordAssistant',
      url: '#',
      icon: Earth,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation()

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Binary className="!size-5" />
                <span className="text-base font-semibold">
                  {t('common.appName')}
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
