import { useMutation, useQuery } from "@tanstack/react-query"
import { flowApi } from "@/api/flow"
import { Time } from "@/util/duration"
import { delayedPromise } from "@/util/promise"
import { useToast } from "@/components/toast"
import { HttpError } from "@/core/http/error"

export default function useDashboard() {
  const toast = useToast()
  const navigate = useNavigate()
  const listGraphQuery = useQuery(["flow-list"], () =>
    delayedPromise(1 * Time.Second, flowApi.list)().then((res) => res.data.data),
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

  return {
    isLoadingGraph: listGraphQuery.isLoading,
    isRefreshingGraph: listGraphQuery.isFetching,
    isCreatingGraph: createGraphMutation.isLoading,
    graphList: listGraphQuery.data,
    createGraph,
  }
}
