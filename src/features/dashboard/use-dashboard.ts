import { useMutation } from "@tanstack/react-query"
import { flowApi } from "@/api/flow"
import { useToast } from "@/components/toast"
import { HttpError } from "@/core/http/error"
import { Time } from "@/util/duration"
import { delayedPromise } from "@/util/promise"
import { DEFAULT_FLOW_NAME } from "../flow/config"

export default function useDashboard() {
  const toast = useToast()
  const navigate = useNavigate()

  const createGraphMutation = useMutation(delayedPromise(1 * Time.Second, flowApi.create), {
    onSuccess: ({ data: { data } }) => {
      if (data) navigate(`/flow/${data.id}`)
    },
    onError: (err: HttpError) => {
      toast.error("创建失败", {
        description: err.message,
      })
    },
  })

  const createGraph = useCallback(() => {
    createGraphMutation.mutate({
      name: DEFAULT_FLOW_NAME,
    })
  }, [createGraphMutation])

  return {
    isCreatingGraph: createGraphMutation.isLoading,
    createGraph,
  }
}
