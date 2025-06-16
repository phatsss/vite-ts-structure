import { Link } from '@tanstack/react-router'
import { useAuth } from '@/contexts/AuthContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useTheme } from '@/contexts/ThemeContext'

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  const { theme, toggle } = useTheme()

  return (
    <header className="p-4 bg-white shadow-md text-black">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            My App
          </Link>
        </div>

        <nav className="flex items-center space-x-6">
          <Link
            to="/"
            className="hover:text-blue-600 transition-colors"
            activeProps={{ className: 'text-blue-600 font-medium' }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-blue-600 transition-colors"
                activeProps={{ className: 'text-blue-600 font-medium' }}
              >
                Dashboard
              </Link>
              <Link
                to="/products"
                className="hover:text-blue-600 transition-colors"
                activeProps={{ className: 'text-blue-600 font-medium' }}
              >
                Products
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Hi, {user?.name}</span>
                <button
                  onClick={() => logout()}
                  className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              activeProps={{ className: 'bg-blue-700' }}
            >
              Login
            </Link>
          )}

          {/* Language switcher */}
          <LanguageSwitcher />

          <button
            onClick={toggle}
            className="p-2 rounded focus:outline-none focus:ring"
            aria-label="Toggle theme"
          >
            {theme === 'light'
              ? // <MoonIcon className="h-6 w-6 text-gray-800" />
                'Light'
              : // <SunIcon className="h-6 w-6 text-yellow-400" />
                'Dark'}
          </button>
        </nav>
      </div>
    </header>
  )
}
