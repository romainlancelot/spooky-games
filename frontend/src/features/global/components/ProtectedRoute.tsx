import { toast } from "react-toastify"
import { Navigate, Outlet } from "react-router-dom"
import { useEffect } from "react"
import { User } from "../../users/models"

function ProtectedRoute({
  user,
  redirectPath = "/login",
  needAdmin = false,
}: {
  user: User | null
  redirectPath?: string
  needAdmin?: boolean
}) {
  useEffect(() => {
    if (needAdmin && !user?.is_staff && !user?.is_superuser) {
      toast.error("You don't have the permission to access this page")
    } else if (!user || localStorage.getItem("token") === null) {
      toast.info("You need to be logged in to access this page")
    }
  }, [user, needAdmin])
  if (needAdmin && (!user?.is_staff || !user?.is_superuser))
    return <Navigate to="/" replace />
  else if (!user) return <Navigate to={redirectPath} replace />
  return <Outlet />
}

export default ProtectedRoute
