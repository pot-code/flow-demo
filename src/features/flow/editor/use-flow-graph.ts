import { produce } from "immer"
import {
  Connection,
  Edge,
  EdgeChange,
  EdgeRemoveChange,
  Node,
  NodeChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
} from "reactflow"
import { newNodeId } from "../nodes"
import { useDataFlowContext } from "./context"
import useViewportCoordinate from "./use-viewport-coordinate"

export default function useFlowGraph(initialNodes: Node[], initialEdges: Edge[]) {
  const [nodes, setNodes] = useState<any[]>(initialNodes)
  const [edges, setEdges] = useState<any[]>(initialEdges)

  const instance = useReactFlow()
  const { graphRef, offsetToOrigin, getViewportWidth, getViewportHeight } = useViewportCoordinate()
  const { subscribe, unsubscribe, removeDataSource } = useDataFlowContext()

  function appendNode(type: string) {
    const [x, y] = offsetToOrigin(getViewportWidth() / 4, getViewportHeight() / 4)
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

  const onAddEdge = useCallback(
    (edge: Edge | Connection) => {
      const { source, target, targetHandle } = edge
      subscribe(source as string, target as string, targetHandle as string, (data) => {
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

  const onDeleteEdge = useCallback(
    (edge: Edge) => {
      unsubscribe(edge.source, edge.target, edge.targetHandle as string)
    },
    [unsubscribe],
  )

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      changes
        .filter((change) => change.type === "remove")
        .forEach((change) => {
          const edge = instance.getEdge((change as EdgeRemoveChange).id)
          if (edge) onDeleteEdge(edge)
        })

      setEdges((eds) => applyEdgeChanges(changes, eds))
    },
    [instance, onDeleteEdge],
  )

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      onAddEdge(params)
      setEdges((eds) => addEdge(params, eds))
    },
    [onAddEdge],
  )

  function onAddNode(key: React.Key) {
    appendNode(key.toString())
  }

  useEffect(() => {
    initialEdges.forEach(onAddEdge)
  }, [onAddEdge, initialEdges])

  return { graphRef, nodes, edges, onNodesChange, onEdgesChange, onConnect, onAddNode }
}
