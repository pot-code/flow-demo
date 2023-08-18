import { useMutation, useQuery } from "@tanstack/react-query"
import { Edge, Node } from "reactflow"
import { graphApi } from "@/api/flow"
import { Time } from "@/util/duration"
import { delayedPromise } from "@/util/promise"
import { FlowGraphRef } from "./flow-graph"

export default function useEditor() {
  const { flowId } = useParams()
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const graphRef = useRef<FlowGraphRef>(null)
  const query = useQuery({
    enabled: Boolean(flowId),
    queryKey: ["flow", flowId],
    queryFn: () => delayedPromise(1 * Time.Second, graphApi.get)(flowId!).then((res) => res.data.data),
  })
  const updateMutation = useMutation(delayedPromise(1 * Time.Second, graphApi.update))

  function saveGraph() {
    const nds = graphRef.current?.getNodes()
    const eds = graphRef.current?.getEdges()
    if (nds && eds) {
      updateMutation.mutate({ id: flowId!, nodes: JSON.stringify(nds), edges: JSON.stringify(eds) })
    }
  }

  useEffect(() => {
    if (query.data) {
      if (query.data.nodes) setNodes(JSON.parse(query.data.nodes))
      if (query.data.edges) setEdges(JSON.parse(query.data.edges))
    }
  }, [query.data])

  return { isSaving: updateMutation.isLoading, isLoadingData: query.isFetching, nodes, edges, graphRef, saveGraph }
}
