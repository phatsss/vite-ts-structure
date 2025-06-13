# SOLID Project Structure

A React + Vite + TanStack Query + TanStack Router application with SOLID-compliant architecture and robust form validation.

## Tech Stack

- React 18
- Vite
- TanStack Query
- TanStack Router
- React Hook Form + Zod (validation)
- Tailwind CSS
- TypeScript
- i18next (multilingual support)

## Coding Standards

- SOLID architecture (interfaces, DI, single-responsibility)
- Feature-first co-location (hooks + UI + types per feature)
- React Query for all server data
- React Context for auth & service DI
- No global store unless absolutely needed

## Form Validation Standard

All forms must use React Hook Form together with Zod for:

- Type-safe schemas
- Runtime validation
- Declarative error messages
- Zero boilerplate on inputs

## Project Structure

```bash
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components
│   │   └── common/       # Shared components used across features
│   ├── features/         # Feature-based modules
│   │   └── [feature]/    # Feature-specific components, hooks, and utils
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Third-party library configurations
│   ├── routes/           # TanStack Router route definitions
│   ├── services/         # API services and data fetching
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── styles.css        # Global styles
│   ├── main.tsx          # Application entry point
│   └── reportWebVitals.ts # Performance monitoring
├── .vscode/              # VSCode configuration
├── eslint.config.js      # ESLint configuration
├── prettier.config.js    # Prettier configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.js        # Vite configuration
└── index.html            # HTML entry point
```

### CRUD Product Example:

```bash
src/                          # Application source root
├── components/               # Reusable, presentation-only React components
│   └── …                     # e.g. Header.tsx, RoleBasedAccess.tsx, etc.
│
├── contexts/                 # React Context providers & hooks
│   ├── AuthContext.tsx       # Authentication state (login, logout, current user)
│   └── ServiceContext.tsx    # Dependency-injection container for service implementations
│
├── features/                 # “Feature‐first” modules: co-locate logic + UI
│   └── products/             # Products feature
│       ├── hooks.ts          # React-Query hooks (getAll, getById, create, update, delete)
│       ├── ProductForm.tsx   # Form component for create/edit, with validation
│       └── ProductList.tsx   # List view & product action buttons
│
├── routes/                   # File-based route components (TanStack Router)
│   └── products/             # /products routes
│       ├── index.tsx         # GET  /products           → ProductList page
│       ├── new.tsx           # GET  /products/new       → Create Product page
│       └── $productId/       # Nested “layout” for a single product
│           ├── index.tsx     # GET  /products/:productId       → Detail page
│           └── edit.tsx      # GET  /products/:productId/edit  → Edit page
│
├── services/                 # Service layer (abstractions + implementations)
│   ├── IProductService.ts    # Service interface (SOLID: DIP/ISP)
│   ├── ProductService.ts     # Concrete HTTP implementation (CRUD)
│   └── MockProductService.ts # In-memory mock for dev/testing
│
├── types/                    # TypeScript type & schema definitions
│   └── Product.ts            # Product DTO & Zod schema for validation
│
├── utils/                    # Shared utility functions (formatters, permissions, etc.)
│   └── …
│
├── main.tsx                  # App entry: compose QueryClient, Providers, RouterProvider
└── styles.css                # Global styles & Tailwind imports
```

#### With this structure:

• SRP: each file does only one thing (service, hook, form, list, route).

• OCP: to add new product‐related APIs (e.g. archive), just extend IProductService and ProductService, without touching hooks or UI.

• LSP: you could swap in a MockProductService for testing that implements IProductService.
• ISP: consumers only see the methods they need.

• DIP: our hooks/components depend on IProductService (the abstraction), not the concrete ProductService.

## Naming Conventions

### Files and Directories

- Components : Use PascalCase for component files and directories
  - Button.tsx , UserProfile.tsx , AuthForm/
- Hooks : Use camelCase with use prefix
  - useAuth.ts , useLocalStorage.ts
- Utilities : Use camelCase
  - formatDate.ts , validation.ts
- Types : Use PascalCase with descriptive names
  - UserType.ts , AuthState.ts
- Constants : Use UPPER_SNAKE_CASE for constant values
  - API_ENDPOINTS , COLOR_PALETTE

# Getting Started

To run this application:

```bash
npm install
npm run start
```

# Building For Production

To build this application for production:

```bash
npm run build
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
npm run test
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.

## Linting & Formatting

This project uses [eslint](https://eslint.org/) and [prettier](https://prettier.io/) for linting and formatting. Eslint is configured using [tanstack/eslint-config](https://tanstack.com/config/latest/docs/eslint). The following scripts are available:

```bash
npm run lint
npm run format
npm run check
```

## Routing

This project uses [TanStack Router](https://tanstack.com/router). The initial setup is a file based router. Which means that the routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add another a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from '@tanstack/react-router'
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you use the `<Outlet />` component.

Here is an example layout that includes a header:

```tsx
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Link } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
```

The `<TanStackRouterDevtools />` component is not required so you can remove it if you don't want it in your layout.

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).

## Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
const peopleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/people',
  loader: async () => {
    const response = await fetch('https://swapi.dev/api/people')
    return response.json() as Promise<{
      results: {
        name: string
      }[]
    }>
  },
  component: () => {
    const data = peopleRoute.useLoaderData()
    return (
      <ul>
        {data.results.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    )
  },
})
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

### React-Query

React-Query is an excellent addition or alternative to route loading and integrating it into you application is a breeze.

First add your dependencies:

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

Next we'll need to create a query client and provider. We recommend putting those in `main.tsx`.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// ...

const queryClient = new QueryClient()

// ...

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )
}
```

You can also add TanStack Query Devtools to the root route (optional).

```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools />
    </>
  ),
})
```

Now you can use `useQuery` to fetch your data.

```tsx
import { useQuery } from '@tanstack/react-query'

import './App.css'

function App() {
  const { data } = useQuery({
    queryKey: ['people'],
    queryFn: () =>
      fetch('https://swapi.dev/api/people')
        .then((res) => res.json())
        .then((data) => data.results as { name: string }[]),
    initialData: [],
  })

  return (
    <div>
      <ul>
        {data.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
```

You can find out everything you need to know on how to use React-Query in the [React-Query documentation](https://tanstack.com/query/latest/docs/framework/react/overview).

# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).
