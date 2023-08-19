import { useMutation, useQuery } from "@tanstack/react-query"
import { Edge, Node } from "reactflow"
import { graphApi } from "@/api/flow"
import { Time } from "@/util/duration"
import { delayedPromise } from "@/util/promise"
import { FlowGraphRef } from "./flow-graph"

export default function useEditor() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  const { flowId } = useParams()
  const graphRef = useRef<FlowGraphRef>(null)
  const flowQuery = useQuery({
    enabled: Boolean(flowId),
    queryKey: ["flow", flowId],
    queryFn: () => delayedPromise(0.5 * Time.Second, graphApi.getByID)(flowId!).then((res) => res.data.data),
  })
  const updateMutation = useMutation(delayedPromise(0.5 * Time.Second, graphApi.update))

  function saveGraph() {
    const nds = graphRef.current?.getNodes()
    const eds = graphRef.current?.getEdges()
    if (nds && eds) {
      updateMutation.mutate({ id: flowId!, nodes: JSON.stringify(nds), edges: JSON.stringify(eds) })
    }
  }

  useEffect(() => {
    if (flowQuery.data) {
      if (flowQuery.data.nodes) setNodes(JSON.parse(flowQuery.data.nodes))
      if (flowQuery.data.edges) setEdges(JSON.parse(flowQuery.data.edges))
    }
  }, [flowQuery.data])

  return { isSaving: updateMutation.isLoading, isLoadingData: flowQuery.isFetching, nodes, edges, graphRef, saveGraph }
}
