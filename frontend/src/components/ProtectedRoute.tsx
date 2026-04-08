import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "@/stores/useAuthStore"

interface ProtectedRouteProps {
  allowedRoles?: ("admin" | "customer")[]
  redirectTo?: string
}

export function ProtectedRoute({ allowedRoles, redirectTo = "/login" }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // If user role is not in the allowed list, send to home or error page
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
