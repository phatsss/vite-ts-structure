import { createFileRoute } from '@tanstack/react-router'
import ProtectedRoute from '@/components/ProtectedRoute'
import UserProfile from '@/components/UserProfile'
import RoleBasedAccess from '@/components/RoleBasedAccess'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <UserProfile />
          </div>

          <div className="space-y-6">
            <RoleBasedAccess requiredRole="admin">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Admin Panel
                </h2>
                <p className="text-gray-600">
                  This content is only visible to admins.
                </p>
                <div className="mt-4">
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                    Manage Users
                  </button>
                </div>
              </div>
            </RoleBasedAccess>

            <RoleBasedAccess requiredRole={['admin', 'manager']}>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Management Tools
                </h2>
                <p className="text-gray-600">
                  This content is visible to admins and managers.
                </p>
                <div className="mt-4">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                    View Reports
                  </button>
                </div>
              </div>
            </RoleBasedAccess>

            <RoleBasedAccess requiredPermission="create:posts">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Content Creation
                </h2>
                <p className="text-gray-600">
                  This content is visible to users with 'create:posts'
                  permission.
                </p>
                <div className="mt-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Create New Post
                  </button>
                </div>
              </div>
            </RoleBasedAccess>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
