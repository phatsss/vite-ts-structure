import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslation } from 'react-i18next'

import logo from '../logo.svg'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()

  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center  text-white text-[calc(10px+2vmin)]">
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
          alt="logo"
        />

        <h1 className="text-4xl font-bold mb-6">{t('home.welcome')}</h1>

        <p className="max-w-md mb-8 text-lg">{t('home.description')}</p>

        {isAuthenticated ? (
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-lg"
          >
            {t('home.goToDashboard')}
          </Link>
        ) : (
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-lg"
          >
            {t('home.loginToStart')}
          </Link>
        )}

        <div className="mt-12">
          <a
            className="text-[#61dafb] hover:underline"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <span className="mx-2">|</span>
          <a
            className="text-[#61dafb] hover:underline"
            href="https://tanstack.com/router/latest"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn TanStack Router
          </a>
        </div>
      </header>
    </div>
  )
}
