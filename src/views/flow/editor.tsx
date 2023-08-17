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
import { ReactFlowProvider } from "reactflow"
import DataFlowProvider from "@/features/flow/editor/context"
import FlowGraph from "@/features/flow/editor/flow-graph"
import useEditor from "@/features/flow/editor/use-editor"
import useSidebarStore from "@/features/flow/editor/use-sidebar-store"

export default function Editor() {
  const { isSaving, isLoadingData, nodes, edges, graphRef, saveGraph } = useEditor()

  const { isOpen, toggleOff } = useSidebarStore()

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar isBordered>
        <NavbarBrand>
          <p className="font-bold">流程设计</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem className="space-x-unit-sm">
            <Button color="warning" variant="ghost" startContent={<Crown />}>
              升级
            </Button>
            <Button color="primary" startContent={<FloppyDisk />} onClick={saveGraph}>
              保存
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="flex-grow flex">
        <DataFlowProvider>
          <ReactFlowProvider>
            <FlowGraph ref={graphRef} initialNodes={nodes} initialEdges={edges} />
          </ReactFlowProvider>
        </DataFlowProvider>
        <motion.div className="h-full overflow-x-hidden" animate={{ width: isOpen ? "480px" : "0px" }}>
          <div className="p-unit-sm">
            <Button isIconOnly color="default" variant="light" onClick={toggleOff}>
              <X weight="bold" />
            </Button>
          </div>
        </motion.div>
      </div>
      <Modal isOpen={isSaving} hideCloseButton size="xs">
        <ModalContent>
          <ModalHeader>保存中</ModalHeader>
          <ModalBody>
            <Spinner />
          </ModalBody>
          <ModalFooter className="justify-center text-sm text-gray-500">请稍等...</ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isLoadingData} hideCloseButton size="xs">
        <ModalContent>
          <ModalHeader>载入中</ModalHeader>
          <ModalBody>
            <Spinner />
          </ModalBody>
          <ModalFooter className="justify-center text-sm text-gray-500">请稍等...</ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
