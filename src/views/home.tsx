import { Navigate } from "react-router-dom"
import useAuth from "@/features/auth/use-auth"

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return <Navigate to="/dashboard" />
}
