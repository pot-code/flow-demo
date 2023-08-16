import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
} from "reactflow"
import { produce } from "immer"
import { useDataFlowContext } from "./context"
import { newNodeId } from "../nodes"

type NodeType = "number" | "multiple" | "result" | "add"

export default function useFlowGraph(initialNodes: Node[], initialEdges: Edge[]) {
  const [nodes, setNodes] = useState<any[]>(initialNodes)
  const [edges, setEdges] = useState<any[]>(initialEdges)
  const instance = useReactFlow()
  const { subscribe, unsubscribe, removeDataSource } = useDataFlowContext()

  function appendNode(type: NodeType) {
    const { x, y } = instance.getViewport()
    const node: Node = {
      type,
      id: newNodeId(),
      position: { x, y },
      data: {},
    }
    setNodes(
      produce((draft) => {
        draft.push(node)
      }),
    )
  }

  const createDataSourceLink = useCallback(
    (edge: Edge | Connection) => {
      const { source, target, targetHandle } = edge
      subscribe(source as string, target as string, (data) => {
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === target) {
              return { ...node, data: { ...node.data, [targetHandle as string]: data } }
            }
            return node
          }),
        )
      })
    },
    [subscribe],
  )

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      changes.forEach((change) => {
        if (change.type === "remove") {
          removeDataSource(change.id)
        }
      })
      setNodes((nds) => applyNodeChanges(changes, nds))
    },
    [removeDataSource],
  )

  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), [])

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      createDataSourceLink(params)
      setEdges((eds) => addEdge(params, eds))
    },
    [createDataSourceLink],
  )

  const onEdgesDelete = useCallback(
    (eds: Edge[]) => {
      eds.forEach((edge) => {
        unsubscribe(edge.source, edge.target)
      })
    },
    [unsubscribe],
  )

  function onAddNode(key: React.Key) {
    appendNode(key as NodeType)
  }

  useEffect(() => {
    initialEdges.forEach(createDataSourceLink)
  }, [createDataSourceLink, initialEdges])

  return { nodes, edges, onNodesChange, onEdgesChange, onConnect, onEdgesDelete, onAddNode }
}
