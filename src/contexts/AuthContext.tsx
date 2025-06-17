import { authService } from '@/services/authService'
import type {
  AuthContextType,
  LoginCredentials,
  Permission,
  UserRole,
} from '@/types/AuthType'
import type { LoginCredentialsInput } from '@/types/schemas/LoginSchema'
import { checkPermission, checkRole } from '@/utils/permissions'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext, useContext, type ReactNode } from 'react'

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()

  // Query to get the current user
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authService.getCurrentUser(),
    staleTime: Infinity, // Don't refetch automatically
  })

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentialsInput) =>
      authService.login(credentials),
    onSuccess: (userData) => {
      queryClient.setQueryData(['currentUser'], userData)
    },
  })

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(['currentUser'], null)
    },
  })

  // Login function
  const login = async (credentials: LoginCredentials) => {
    await loginMutation.mutateAsync(credentials)
  }

  // Logout function
  const logout = async () => {
    await logoutMutation.mutateAsync()
  }

  // Check if user has a specific permission
  const hasPermission = (permission: Permission) => {
    if (!user) return false

    return user && checkPermission(user, permission)
  }

  // Check if user has a specific role
  const hasRole = (role: UserRole | UserRole[]) => {
    if (!user) return false

    return checkRole(user, role)
  }

  // Context value
  const value: AuthContextType = {
    user: user || null,
    isAuthenticated: !!user,
    isLoading,
    error: error ? (error as Error).message : null,
    login,
    logout,
    hasPermission,
    hasRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
