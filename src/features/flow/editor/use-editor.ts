import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Edge, Node } from "reactflow"
import { isEmpty } from "lodash-es"
import { flowApi } from "@/api/flow"
import { Time } from "@/util/duration"
import { delayedPromise } from "@/util/promise"
import { GraphRef } from "./graph"
import { useToast } from "@/components/toast"
import { DEFAULT_FLOW_NAME } from "../config"

export default function useEditor() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [graphName, setGraphName] = useState("")

  const flowId = useParams().flowId as string
  const toast = useToast()
  const graphRef = useRef<GraphRef>(null)
  const queryClient = useQueryClient()
  const flowQuery = useQuery(
    ["flow", flowId],
    () => delayedPromise(0.5 * Time.Second, flowApi.getByID)(flowId).then((res) => res.data.data),
    {
      enabled: Boolean(flowId),
    },
  )
  const updateFlow = useMutation(delayedPromise(0.5 * Time.Second, flowApi.update), {
    onSuccess: () => {
      toast.success("保存成功")
      queryClient.invalidateQueries(["flow", flowId])
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
    if (isEmpty(name)) setGraphName(DEFAULT_FLOW_NAME)
    else setGraphName(name)
  }

  useEffect(() => {
    if (flowQuery.data) {
      if (flowQuery.data.nodes) setNodes(JSON.parse(flowQuery.data.nodes))
      if (flowQuery.data.edges) setEdges(JSON.parse(flowQuery.data.edges))
      setGraphName(flowQuery.data.name)
    }
  }, [flowQuery.data])

  useEffect(() => {
    if (flowQuery.isError) {
      toast.error("加载失败")
    }
  }, [flowQuery.isError, toast])

  return {
    isSaving: updateFlow.isLoading,
    isLoadingFlow: flowQuery.isLoading,
    isRefreshing: flowQuery.isRefetching,
    graphName,
    nodes,
    edges,
    graphRef,
    onChangeGraphName,
    saveGraph,
  }
}
