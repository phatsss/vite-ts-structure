import { useAuth } from '@/contexts/AuthContext'

export function usePermissions() {
  const { hasPermission, hasRole } = useAuth()

  return {
    hasPermission,
    hasRole,
    // Helper for common permission checks
    canCreateUsers: () => hasPermission('create:users'),
    canReadUsers: () => hasPermission('read:users'),
    canUpdateUsers: () => hasPermission('update:users'),
    canDeleteUsers: () => hasPermission('delete:users'),
    canCreatePosts: () => hasPermission('create:posts'),
    canReadPosts: () => hasPermission('read:posts'),
    canUpdatePosts: () => hasPermission('update:posts'),
    canDeletePosts: () => hasPermission('delete:posts'),
    // Helper for common role checks
    isAdmin: () => hasRole('admin'),
    isManager: () => hasRole('manager'),
    isUser: () => hasRole('user'),
    isAtLeastManager: () => hasRole(['admin', 'manager']),
  }
}
