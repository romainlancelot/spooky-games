import { toast } from "react-toastify"
import { Navigate, Outlet } from "react-router-dom"
import { User } from "../../users/models"

export function ProtectedRoute({
  user,
  redirectPath = "/login",
  needAdmin = false,
}: {
  user: User | null
  redirectPath?: string
  needAdmin?: boolean
}) {
  if (!user || user === null) {
    toast.error("You need to login to access this page")
    return <Navigate to={redirectPath} replace />
  } else if (needAdmin && !user.is_staff && !user.is_superuser) {
    toast.error("You don't have permission to access this page")
    return <Navigate to="/" replace />
  }
  return <Outlet />
}
