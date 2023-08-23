import { useMutation } from "@tanstack/react-query"
import { flowApi } from "@/api/flow"
import { useToast } from "@/components/toast"
import { HttpError } from "@/core/http/error"
import { Time } from "@/util/duration"
import { delayedPromise } from "@/util/promise"
import useFlowListQuery from "./use-flow-list-query"

export default function useFlowList() {
  const toast = useToast()
  const navigate = useNavigate()
  const { isLoading, isRefreshing, data, invalidateCache } = useFlowListQuery()
  const deleteFlowMutation = useMutation(delayedPromise(0.5 * Time.Second, flowApi.delete), {
    onSuccess: () => {
      toast.success("删除成功")
      invalidateCache()
    },
    onError: (err: HttpError) => {
      toast.error("删除失败", {
        description: err.message,
      })
    },
  })

  const onDeleteFlow = useCallback(
    (id: string) => {
      deleteFlowMutation.mutate(id)
    },
    [deleteFlowMutation],
  )

  const onEditFlow = useCallback(
    (id: string) => {
      navigate(`/flow/${id}`)
    },
    [navigate],
  )

  return {
    isLoading,
    isRefreshing,
    data,
    deleteFlowMutation,
    onDeleteFlow,
    onEditFlow,
  }
}
