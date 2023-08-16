import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Spinner,
} from "@nextui-org/react"
import { Crown, FloppyDisk, X } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { Edge, Node, ReactFlowProvider } from "reactflow"
import useSidebarStore from "@/features/flow/editor/use-sidebar-store"
import FlowGraph from "@/features/flow/editor/flow-graph"
import DataFlowProvider from "@/features/flow/editor/context"
import useEditor from "@/features/flow/editor/use-editor"

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

export default function Editor() {
  const { isLoading, graphRef, saveGraph } = useEditor()

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
            <Button color="primary" variant="flat" startContent={<FloppyDisk />} onClick={saveGraph}>
              保存
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="flex-grow flex">
        <DataFlowProvider>
          <ReactFlowProvider>
            <FlowGraph ref={graphRef} initialNodes={initialNodes} initialEdges={initialEdges} />
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
      <Modal isOpen={isLoading} hideCloseButton size="xs">
        <ModalContent>
          <ModalHeader>保存中</ModalHeader>
          <ModalBody>
            <Spinner />
          </ModalBody>
          <ModalFooter className="justify-center text-sm text-gray-500">请耐心等待</ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
