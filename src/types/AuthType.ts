export type UserRole = 'admin' | 'manager' | 'user' | 'guest'

export type Permission = 
  | 'create:users'
  | 'read:users'
  | 'update:users'
  | 'delete:users'
  | 'create:posts'
  | 'read:posts'
  | 'update:posts'
  | 'delete:posts'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  permissions: Permission[]
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
  hasPermission: (permission: Permission) => boolean
  hasRole: (role: UserRole | UserRole[]) => boolean
}