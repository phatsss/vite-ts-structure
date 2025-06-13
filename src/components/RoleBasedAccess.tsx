import type { Permission, UserRole } from '@/types/AuthType'
import { type ReactNode } from 'react'
import { usePermissions } from '../hooks/usePermissions'

interface RoleBasedAccessProps {
  children: ReactNode
  requiredPermission?: Permission
  requiredRole?: UserRole | UserRole[]
  fallback?: ReactNode
}

export default function RoleBasedAccess({
  children,
  requiredPermission,
  requiredRole,
  fallback = null,
}: RoleBasedAccessProps) {
  const { hasPermission, hasRole } = usePermissions()

  // Check if user has required permission
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <>{fallback}</>
  }

  // Check if user has required role
  if (requiredRole && !hasRole(requiredRole)) {
    return <>{fallback}</>
  }

  // User has required permission/role, render children
  return <>{children}</>
}
