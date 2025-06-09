import { useAuth } from '@/contexts/AuthContext'

export default function UserProfile() {
  const { user, logout } = useAuth()

  if (!user) {
    return null
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        User Profile
      </h2>

      <div className="mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <span className="font-medium text-gray-700">Name:</span> {user.name}
          </div>
          <div>
            <span className="font-medium text-gray-700">Email:</span>{' '}
            {user.email}
          </div>
          <div>
            <span className="font-medium text-gray-700">Role:</span>{' '}
            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
              {user.role}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700 block mb-1">
              Permissions:
            </span>
            <div className="flex flex-wrap gap-1">
              {user.permissions.map((permission) => (
                <span
                  key={permission}
                  className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"
                >
                  {permission}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => logout()}
        className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
      >
        Logout
      </button>
    </div>
  )
}
