import { useMutation } from "@tanstack/react-query"
import { flowApi } from "@/api/flow"
import { Time } from "@/util/duration"
import { delayedPromise } from "@/util/promise"
import { useToast } from "@/components/toast"
import { HttpError } from "@/core/http/error"

export default function useFlowList() {
  const toast = useToast()
  const navigate = useNavigate()
  const deleteFlowMutation = useMutation(delayedPromise(1 * Time.Second, flowApi.delete), {
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
    deleteFlowMutation,
    onDeleteFlow,
    onEditFlow,
  }
}
