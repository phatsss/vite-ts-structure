import { useTheme } from '@/contexts/ThemeContext'

interface GuestLayoutProps {
  children: React.ReactNode
}

export default function GuestLayout({ children }: GuestLayoutProps) {
  const { theme, toggle } = useTheme()
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-xl font-bold">MyApp (Guest)</h1>
        </div>
        <button onClick={toggle} className="px-3 py-1 bg-primary  rounded">
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </header>

      <main className="flex-grow container mx-auto p-6">
        {/* Render <login />, <index />, etc. */}
        {children}
      </main>

      <footer className="bg-gray-100 text-center p-4 text-sm">
        © 2025 MyApp
      </footer>
    </div>
  )
}
