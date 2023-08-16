import { Button } from "@nextui-org/react"
import { Plus } from "@phosphor-icons/react"
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  MarkerType,
  MiniMap,
  NodeChange,
  Panel,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow"
import { useDataFlowContext } from "./context"
import { getNodeTypes } from "./nodes"

const nodeTypes = getNodeTypes()

const initialNodes = [
  { id: "1", type: "number", position: { x: 0, y: 0 } },
  { id: "2", type: "number", position: { x: 0, y: 150 } },
  { id: "3", type: "multiple", position: { x: 300, y: 0 }, data: { length: 0, width: 0, result: 0 } },
  { id: "4", type: "add", position: { x: 300, y: 200 }, data: { length: 0, width: 0, result: 0 } },
  { id: "5", type: "result", position: { x: 600, y: 100 }, data: { input: undefined } },
]

export default function FlowGraph() {
  const { subscribe, unsubscribe, removeDataSource } = useDataFlowContext()
  const [nodes, setNodes] = useState<any[]>(initialNodes)
  const [edges, setEdges] = useState<any[]>([])

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
      const { source, target, targetHandle } = params
      subscribe(source as string, target as string, (data) => {
        setNodes((nds) => {
          return nds.map((node) => {
            if (node.id === target) {
              return { ...node, data: { ...node.data, [targetHandle as string]: data } }
            }
            return node
          })
        })
      })
      setEdges((eds) => addEdge(params, eds))
    },
    [subscribe],
  )
  const onEdgesDelete = useCallback(
    (eds: Edge[]) => {
      eds.forEach((edge) => {
        unsubscribe(edge.source, edge.target)
      })
    },
    [unsubscribe],
  )

  return (
    <ReactFlow
      fitView
      className="bg-gray-50"
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onEdgesDelete={onEdgesDelete}
      defaultEdgeOptions={{
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      }}
    >
      <Panel position="top-left">
        <div className="flex flex-col gap-3">
          <Button isIconOnly color="primary" variant="shadow">
            <Plus />
          </Button>
        </div>
      </Panel>
      <MiniMap />
      <Controls />
      <Background variant={BackgroundVariant.Dots} />
    </ReactFlow>
  )
}
