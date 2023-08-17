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
  const saveMutation = useMutation(delayedPromise(1 * Time.Second, graphApi.save))
  const dataQuery = useQuery({
    enabled: !!flowId,
    queryKey: ["flow", flowId],
    queryFn: () => delayedPromise(1 * Time.Second, graphApi.get)(flowId!).then((res) => res.data.data),
  })

  function saveGraph() {
    const nds = graphRef.current?.getNodes()
    const eds = graphRef.current?.getEdges()
    if (nds && eds) {
      saveMutation.mutate({ nodes: nds, edges: eds })
    }
  }

  useEffect(() => {
    if (dataQuery.data) {
      setNodes(dataQuery.data.nodes)
      setEdges(dataQuery.data.edges)
    }
  }, [dataQuery.data])

  return { isSaving: saveMutation.isLoading, isLoadingData: dataQuery.isFetching, nodes, edges, graphRef, saveGraph }
}
