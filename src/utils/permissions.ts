import type { Permission, User, UserRole } from '@/types/AuthType'

export const checkPermission = (
  user: User | null,
  permission: Permission,
): boolean => {
  if (!user) return false
  return user.permissions.includes(permission)
}

export const checkRole = (
  user: User | null,
  role: UserRole | UserRole[],
): boolean => {
  if (!user) return false

  if (Array.isArray(role)) {
    return role.includes(user.role)
  }

  return user.role === role
}
