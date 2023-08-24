import { useQuery } from "@tanstack/react-query"
import { authApi } from "@/api/auth"
import useAuthStore from "./use-auth-store"
import { HttpError } from "@/core/http/error"

export default function useAuth() {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore()
  const { isLoading, isSuccess, isError, error } = useQuery(["is-authenticated"], () => authApi.isAuthenticated())

  useEffect(() => {
    if (isError && (error as HttpError).code === 401) {
      setIsAuthenticated(false)
    }
  }, [error, isError, setIsAuthenticated])

  useEffect(() => {
    if (isSuccess) {
      setIsAuthenticated(true)
    }
  }, [isSuccess, setIsAuthenticated])

  return {
    isAuthenticated,
    isLoading,
  }
}
