import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Header from '@/components/Header'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />

      <Outlet />

      {/* Development tools */}
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  ),
})
