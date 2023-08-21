import { useMutation, useQuery } from "@tanstack/react-query"
import { Edge, Node } from "reactflow"
import { isEmpty } from "lodash-es"
import { graphApi } from "@/api/flow"
import { Time } from "@/util/duration"
import { delayedPromise } from "@/util/promise"
import { FlowGraphRef } from "./graph"
import { useToast } from "@/components/toast"

const defaultGraphName = "Untitled"

export default function useEditor() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [graphName, setGraphName] = useState("")

  const flowId = useParams().flowId as string
  const toast = useToast()
  const graphRef = useRef<FlowGraphRef>(null)
  const queryFlow = useQuery({
    enabled: Boolean(flowId),
    queryKey: ["flow", flowId],
    queryFn: () => delayedPromise(0.5 * Time.Second, graphApi.getByID)(flowId).then((res) => res.data.data),
  })
  const updateFlow = useMutation(delayedPromise(0.5 * Time.Second, graphApi.update), {
    onSuccess: () => {
      toast.success("保存成功")
    },
    onError: () => {
      toast.error("保存失败")
    },
  })

  function saveGraph() {
    const nds = graphRef.current?.getNodes()
    const eds = graphRef.current?.getEdges()
    if (nds && eds) {
      updateFlow.mutate({
        id: flowId,
        name: graphName,
        nodes: JSON.stringify(nds),
        edges: JSON.stringify(eds),
      })
    }
  }

  function onChangeGraphName(name: string) {
    if (isEmpty(name)) setGraphName(defaultGraphName)
    else setGraphName(name)
  }

  useEffect(() => {
    if (queryFlow.data) {
      if (queryFlow.data.nodes) setNodes(JSON.parse(queryFlow.data.nodes))
      if (queryFlow.data.edges) setEdges(JSON.parse(queryFlow.data.edges))
      setGraphName(queryFlow.data.name)
    }
  }, [queryFlow.data])

  useEffect(() => {
    if (queryFlow.isError) {
      toast.error("加载失败")
    }
  }, [queryFlow.isError, toast])

  return {
    isSaving: updateFlow.isLoading,
    isLoadingData: queryFlow.isFetching,
    graphName,
    nodes,
    edges,
    graphRef,
    onChangeGraphName,
    saveGraph,
  }
}
