import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { useAuth } from '@/contexts/AuthContext'
import GuestLayout from '@/components/layout/GuestLayout'
import AdminLayout from '@/components/layout/AdminLayout'

// RootRoute decides which layout to render around all child routes.
// – If no `user` → render public “guest” chrome
// – If `user`   → render admin sidebar/dashboard chrome
export const Route = createRootRoute({
  component: () => {
    const { user } = useAuth()

    return (
      <>
        {user ? (
          // Authenticated / Admin layout
          <AdminLayout>
            <Outlet />
          </AdminLayout>
        ) : (
          // Public / Guest layout (login, marketing pages, etc.)
          <GuestLayout>
            <Outlet />
          </GuestLayout>
        )}

        {/* DevTools: Router + React-Query */}
        <TanStackRouterDevtools />
        <ReactQueryDevtools initialIsOpen={false} />
      </>
    )
  },
})
