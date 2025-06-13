import type { LoginCredentials, User } from '@/types/AuthType'

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    permissions: [
      'create:users',
      'read:users',
      'update:users',
      'delete:users',
      'create:posts',
      'read:posts',
      'update:posts',
      'delete:posts',
      'create:product',
      'read:product',
      'update:product',
      'delete:product',
    ],
  },
  {
    id: '2',
    name: 'Manager User',
    email: 'manager@example.com',
    password: 'manager123',
    role: 'manager',
    permissions: ['read:users', 'create:posts', 'read:posts', 'update:posts'],
  },
  {
    id: '3',
    name: 'Regular User',
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
    permissions: ['read:posts', 'create:posts'],
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const authService = {
  // Login user
  async login(credentials: LoginCredentials): Promise<User> {
    // Simulate API call
    await delay(800)

    const user = MOCK_USERS.find(
      (user) =>
        user.email === credentials.email &&
        user.password === credentials.password,
    )

    if (!user) {
      throw new Error('Invalid credentials')
    }

    // Remove password before returning user
    const { password, ...userWithoutPassword } = user

    // Store user in localStorage (in a real app, store only the token)
    localStorage.setItem('user', JSON.stringify(userWithoutPassword))

    return userWithoutPassword as User
  },

  // Logout user
  async logout(): Promise<void> {
    await delay(300)
    localStorage.removeItem('user')
  },

  // Get current user from localStorage
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('user')
    if (!userJson) return null

    try {
      return JSON.parse(userJson) as User
    } catch {
      return null
    }
  },
}
