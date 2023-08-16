import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import { Crown, FloppyDisk, X } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { Edge, Node, ReactFlowProvider } from "reactflow"
import useSidebarStore from "@/features/home/use-sidebar-store"
import FlowGraph from "@/features/home/flow-graph"
import DataFlowProvider from "@/features/home/context"

const initialNodes: Node[] = [
  { id: "1", type: "number", position: { x: 0, y: 0 }, data: {} },
  { id: "2", type: "number", position: { x: 0, y: 150 }, data: {} },
  { id: "3", type: "multiple", position: { x: 300, y: 0 }, data: {} },
  { id: "4", type: "result", position: { x: 600, y: 100 }, data: {} },
]

const initialEdges: Edge[] = [
  {
    id: "e1-3",
    source: "1",
    target: "3",
    sourceHandle: "value",
    targetHandle: "op1",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    sourceHandle: "value",
    targetHandle: "op2",
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    sourceHandle: "value",
    targetHandle: "value",
  },
]

export default function HomeView() {
  const { isOpen, toggleOff } = useSidebarStore()

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar isBordered>
        <NavbarBrand>
          <p className="font-bold">流程设计</p>
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
        <DataFlowProvider>
          <ReactFlowProvider>
            <FlowGraph initialNodes={initialNodes} initialEdges={initialEdges} />
          </ReactFlowProvider>
        </DataFlowProvider>
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
