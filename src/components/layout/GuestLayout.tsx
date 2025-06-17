import { useTheme } from '@/contexts/ThemeContext'
import { Moon, Sun } from 'lucide-react'
import { GuestNavbar } from './GuestNavbar'
import { Button } from '../ui/button'

interface GuestLayoutProps {
  children: React.ReactNode
}

export default function GuestLayout({ children }: GuestLayoutProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between p-4">
        <a href="/" className="text-2xl font-bold text-primary">
          MyApp
        </a>
        <GuestNavbar />
        <Button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          variant={'outline'}
          size={'icon'}
        >
          {theme === 'light' ? <Moon /> : <Sun />}
        </Button>
      </header>
      <main className="p-6">{children}</main>
    </div>
  )
}
