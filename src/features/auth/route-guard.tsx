import { useQuery } from "@tanstack/react-query"
import { Navigate } from "react-router-dom"
import { authApi } from "@/api/auth"
import { HttpError } from "@/core/http/error"

export interface RouteGuardProps {
  children: React.ReactElement
}

export default function RouteGuard({ children }: RouteGuardProps) {
  const { isLoading, isError, error } = useQuery(["is-authenticated"], () => authApi.isAuthenticated())

  if (isLoading) {
    return null
  }

  if (isError && (error as HttpError).code === 401) {
    return <Navigate to="/login" />
  }

  return children
}
