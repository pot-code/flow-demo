import { useMutation } from "@tanstack/react-query"
import { flowApi } from "@/api/flow"
import { useToast } from "@/components/toast"
import { HttpError } from "@/core/http/error"
import { Time } from "@/util/duration"
import { delayedPromise } from "@/util/promise"
import useLogout from "../auth/use-logout"
import { DEFAULT_FLOW_NAME } from "../flow/config"

export default function useDashboard() {
  const toast = useToast()
  const navigate = useNavigate()
  const { logout, isLoading: isLoggingOut } = useLogout()
  const createFlowMutation = useMutation(delayedPromise(1 * Time.Second, flowApi.create), {
    onSuccess: ({ data }) => {
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
    logout()
  }, [logout])

  return {
    isCreatingFlow: createFlowMutation.isLoading,
    isLoggingOut,
    createFlow,
    onLogout,
  }
}
