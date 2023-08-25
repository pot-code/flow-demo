import { useQuery } from "@tanstack/react-query"
import { authApi } from "@/api/auth"
import useAuthStore from "./use-auth-store"

export default function useAuth() {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore()
  const { isLoading, isSuccess } = useQuery(["is-authenticated"], () => authApi.isAuthenticated())

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
