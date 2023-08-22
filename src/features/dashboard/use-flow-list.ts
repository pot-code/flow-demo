import { useMutation, useQuery } from "@tanstack/react-query"
import { flowApi } from "@/api/flow"
import { delayedPromise } from "@/util/promise"
import { Time } from "@/util/duration"
import { useToast } from "@/components/toast"
import { HttpError } from "@/core/http/error"

export default function useFlowList() {
  const toast = useToast()
  const navigate = useNavigate()
  const listGraphQuery = useQuery(["flow-list"], () =>
    delayedPromise(1 * Time.Second, flowApi.list)().then((res) => res.data.data),
  )
  const createGraphMutation = useMutation(delayedPromise(3 * Time.Second, flowApi.create), {
    onSuccess: ({ data: { data } }) => {
      if (data) navigate(`/flow/${data.id}`)
    },
    onError: (err: HttpError) => {
      toast.error("创建失败", {
        description: err.message,
      })
    },
  })

  function createGraph() {
    createGraphMutation.mutate({
      name: "Untitled",
    })
  }

  return {
    isLoadingGraph: listGraphQuery.isLoading,
    isCreatingGraph: createGraphMutation.isLoading,
    graphList: listGraphQuery.data,
    createGraph,
  }
}
