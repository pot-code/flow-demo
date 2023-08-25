import { useQuery, useQueryClient } from "@tanstack/react-query"
import { flowApi } from "@/api/flow"
import { useToast } from "@/components/toast"
import { HttpError } from "@/core/http/error"
import { Time } from "@/util/duration"
import { delayedPromise } from "@/util/promise"

const cacheKey = "flow-list"

export default function useFlowListQuery(enabled = true) {
  const toast = useToast()
  const queryClient = useQueryClient()
  const query = useQuery([cacheKey], () => delayedPromise(0.3 * Time.Second, flowApi.list)().then((res) => res.data), {
    enabled,
  })

  const invalidateCache = useCallback(() => {
    queryClient.invalidateQueries([cacheKey])
  }, [queryClient])

  useEffect(() => {
    if (query.isError) {
      toast.error("获取流程列表失败", {
        description: (query.error as HttpError).message,
      })
    }
  }, [query.error, query.isError, toast])

  return {
    isLoading: query.isLoading,
    isRefreshing: query.isFetching,
    data: query.data,
    invalidateCache,
  }
}
