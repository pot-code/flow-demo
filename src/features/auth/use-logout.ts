import { useMutation } from "@tanstack/react-query"
import { authApi } from "@/api/auth"
import { HttpError } from "@/core/http/error"
import { Time } from "@/util/duration"
import { delayedPromise } from "@/util/promise"
import useAuthStore from "./use-auth-store"
import { useToast } from "@/components/toast"

export default function useLogout() {
  const toast = useToast()
  const navigate = useNavigate()
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)
  const logoutMutation = useMutation(delayedPromise(1 * Time.Second, authApi.logout), {
    onSuccess: () => {
      toast.success("注销成功")
      setIsAuthenticated(false)
      navigate("/login")
    },
    onError: (err: HttpError) => {
      toast.error("注销失败", {
        description: err.message,
      })
    },
  })

  return {
    isLoading: logoutMutation.isLoading,
    logout: logoutMutation.mutate,
  }
}
