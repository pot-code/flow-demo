import { useMutation, useQuery } from "@tanstack/react-query"
import { flowApi } from "@/api/flow"
import { useToast } from "@/components/toast"
import { HttpError } from "@/core/http/error"
import { Time } from "@/util/duration"
import { delayedPromise } from "@/util/promise"

export default function useDashboard() {
  const toast = useToast()
  const navigate = useNavigate()
  const listFlowQuery = useQuery(["flow-list"], () =>
    delayedPromise(0.3 * Time.Second, flowApi.list)().then((res) => res.data.data),
  )
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
      name: "Untitled",
    })
  }, [createGraphMutation])

  useEffect(() => {
    if (listFlowQuery.isError) {
      toast.error("获取流程列表失败", {
        description: (listFlowQuery.error as HttpError).message,
      })
    }
  }, [listFlowQuery.error, listFlowQuery.isError, toast])

  return {
    isLoadingGraph: listFlowQuery.isLoading,
    isRefreshingGraph: listFlowQuery.isFetching,
    isCreatingGraph: createGraphMutation.isLoading,
    graphList: listFlowQuery.data,
    createGraph,
  }
}
