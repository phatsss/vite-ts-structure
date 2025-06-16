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

const data = {
  user: {
    name: 'phatsss',
    email: 'phats@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: LayoutDashboard,
    },
    {
      title: 'Lifecycle',
      url: '#',
      icon: Fan,
    },
    {
      title: 'Analytics',
      url: '#',
      icon: ChartBar,
    },
    {
      title: 'Projects',
      url: '#',
      icon: Folder,
    },
    {
      title: 'Team',
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
      title: 'Settings',
      url: '#',
      icon: Settings,
    },
    {
      title: 'Get Help',
      url: '#',
      icon: CircleHelp,
    },
    {
      title: 'Search',
      url: '#',
      icon: Search,
    },
  ],
  documents: [
    {
      name: 'Data Library',
      url: '#',
      icon: Database,
    },
    {
      name: 'Reports',
      url: '#',
      icon: FileText,
    },
    {
      name: 'Word Assistant',
      url: '#',
      icon: Earth,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                <span className="text-base font-semibold">Dashboard.</span>
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
