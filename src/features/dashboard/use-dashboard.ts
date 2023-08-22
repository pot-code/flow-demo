import { useQuery } from "@tanstack/react-query"
import { flowApi } from "@/api/flow"
import { Time } from "@/util/duration"
import { delayedPromise } from "@/util/promise"

export default function useDashboard() {
  const listGraphQuery = useQuery(["flow-list"], () =>
    delayedPromise(1 * Time.Second, flowApi.list)().then((res) => res.data.data),
  )

  return {
    isLoadingGraph: listGraphQuery.isLoading,
    graphList: listGraphQuery.data,
  }
}
