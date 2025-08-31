import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "@/store/useAuthStore"

export function ProtectedRoute({ roles }: { roles?: Array<"ADMIN" | "BROKER" | "ANALYST" | "VIEWER"> }) {
  const user = useAuthStore(s => s.user)
  const hasRole = useAuthStore(s => s.hasRole)
  if (!user) return <Navigate to="/login" replace />
  if (roles && roles.length > 0 && !hasRole(...roles)) return <Navigate to="/unauthorized" replace />
  return <Outlet />
}
