import { useMutation } from "@tanstack/react-query"
import { flowApi } from "@/api/flow"
import { useToast } from "@/components/toast"
import { HttpError } from "@/core/http/error"
import { Time } from "@/util/duration"
import { delayedPromise } from "@/util/promise"
import { DEFAULT_FLOW_NAME } from "../flow/config"
import useFlowListQuery from "./use-flow-list-query"

export default function useDashboard() {
  const toast = useToast()
  const navigate = useNavigate()
  const { invalidateCache } = useFlowListQuery(false)
  const createFlowMutation = useMutation(delayedPromise(1 * Time.Second, flowApi.create), {
    onSuccess: ({ data: { data } }) => {
      invalidateCache()
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

  return {
    isCreatingFlow: createFlowMutation.isLoading,
    createFlow,
  }
}
