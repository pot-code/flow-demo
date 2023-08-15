import { Button } from "@nextui-org/react"
import { Plus } from "@phosphor-icons/react"
import ReactFlow, {
  MarkerType,
  Panel,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  EdgeChange,
  NodeChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow"
import { getNodeTypes } from "./nodes"
import { useSubscription } from "./context"

const nodeTypes = getNodeTypes()

const initialNodes = [
  { id: "1", type: "area", position: { x: 0, y: 0 }, data: { length: 0, width: 0, result: 0 } },
  { id: "2", type: "result", position: { x: 300, y: 200 }, data: { input: 0 } },
]

export default function FlowGraph() {
  const { getDataSource, removeDataSource } = useSubscription()
  const [nodes, setNodes] = useState<any[]>(initialNodes)
  const [edges, setEdges] = useState<any[]>([])

  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), [])
  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), [])
  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

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
      <Background variant={BackgroundVariant.Cross} />
    </ReactFlow>
  )
}
