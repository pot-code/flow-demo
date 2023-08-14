import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import { Crown, FloppyDisk, Plus, X } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import {
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
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow"
import useSidebarStore from "@/features/home/use-sidebar-store"

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "提交送审" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "财务初审" } },
]
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }]

export default function HomeView() {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  const { isOpen, toggleOff, toggleOn } = useSidebarStore()

  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), [])
  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), [])
  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar isBordered>
        <NavbarBrand>
          <p className="font-bold">流程设计器</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem className="space-x-3">
            <Button color="warning" variant="ghost" startContent={<Crown />}>
              升级
            </Button>
            <Button color="primary" variant="flat" startContent={<FloppyDisk />}>
              保存
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="flex-grow flex">
        <ReactFlow
          fitView
          snapToGrid
          className="bg-gray-50"
          nodes={nodes}
          edges={edges}
          onNodeClick={toggleOn}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          defaultEdgeOptions={{
            animated: true,
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
        <motion.div className="h-full overflow-x-hidden" animate={{ width: isOpen ? "480px" : "0px" }}>
          <div className="p-3">
            <Button isIconOnly color="default" variant="light" onClick={toggleOff}>
              <X weight="bold" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
