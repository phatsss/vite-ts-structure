import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Import the generated route tree
import { routeTree } from '@/routeTree.gen'

// Import fonts, styles and utilities
import '@fontsource/noto-sans-lao/400.css'
import '@fontsource/noto-sans-lao/700.css'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'

// Import contexts
import { AuthProvider } from '@/contexts/AuthContext'
import { ServiceProvider } from '@/contexts/ServiceContext.tsx'
import { ThemeProvider } from './contexts/ThemeContext'

// Import i18n configuration
import './i18n/config'

/**
 * QueryClient configuration
 *
 * Sets up the TanStack Query client with default options:
 * - 5 minute stale time for cached data
 * - Disabled automatic refetching on window focus
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
})

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      {/* Provide React Query */}
      <QueryClientProvider client={queryClient}>
        {/* Provide API service implementations */}
        <ServiceProvider>
          {/* Provide auth state */}
          <AuthProvider>
            <ThemeProvider>
              {/* TanStack Router */}
              <RouterProvider router={router} />
            </ThemeProvider>
          </AuthProvider>
        </ServiceProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
