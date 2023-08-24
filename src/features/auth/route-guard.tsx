import { Navigate } from "react-router-dom"
import useAuth from "./use-auth"

export interface RouteGuardProps {
  children: React.ReactElement
}

export default function RouteGuard({ children }: RouteGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return children
}
