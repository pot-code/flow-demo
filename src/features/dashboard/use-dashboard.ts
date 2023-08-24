import { useMutation } from "@tanstack/react-query"
import { flowApi } from "@/api/flow"
import { useToast } from "@/components/toast"
import { HttpError } from "@/core/http/error"
import { Time } from "@/util/duration"
import { delayedPromise } from "@/util/promise"
import { DEFAULT_FLOW_NAME } from "../flow/config"
import { authApi } from "@/api/auth"
import useAuthStore from "../auth/use-auth-store"

export default function useDashboard() {
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
  const createFlowMutation = useMutation(delayedPromise(1 * Time.Second, flowApi.create), {
    onSuccess: ({ data: { data } }) => {
      if (data) navigate(`/flow/${data.id}`)
    },
    onError: (err: HttpError) => {
      toast.error("创建失败", {
        description: err.message,
      })
    },
  })

  const createFlow = useCallback(() => {
    createFlowMutation.mutate({
      name: DEFAULT_FLOW_NAME,
    })
  }, [createFlowMutation])

  const onLogout = useCallback(() => {
    logoutMutation.mutate()
  }, [logoutMutation])

  return {
    isCreatingFlow: createFlowMutation.isLoading,
    isLoggingOut: logoutMutation.isLoading,
    createFlow,
    onLogout,
  }
}
