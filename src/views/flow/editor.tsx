import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react"
import { ArrowLeft } from "@phosphor-icons/react"
import { ReactFlowProvider } from "reactflow"
import DataFlowProvider from "@/features/flow/editor/context"
import FlowGraph from "@/features/flow/editor/graph"
import NameInput from "@/features/flow/editor/name-input"
import useEditor from "@/features/flow/editor/use-editor"

export default function Editor() {
  const { isSaving, isLoadingData, graphName, nodes, edges, graphRef, saveGraph, onChangeGraphName } = useEditor()

  return (
    <div className="h-screen w-screen flex flex-col">
      <nav className="flex justify-between items-center px-unit-xl h-12 border-b-1 bg-background border-divider">
        <Button isIconOnly size="sm" variant="light">
          <ArrowLeft />
        </Button>
        <NameInput value={graphName} onChange={onChangeGraphName} />
        <div>
          <Button size="sm" color="primary" variant="flat" onClick={saveGraph}>
            保存
          </Button>
        </div>
      </nav>
      <div className="flex-grow flex">
        <DataFlowProvider>
          <ReactFlowProvider>
            <FlowGraph ref={graphRef} initialNodes={nodes} initialEdges={edges} />
          </ReactFlowProvider>
        </DataFlowProvider>
      </div>
      <Modal hideCloseButton size="xs" isOpen={isSaving}>
        <ModalContent>
          <ModalHeader>保存中</ModalHeader>
          <ModalBody>
            <Spinner />
          </ModalBody>
          <ModalFooter className="justify-center text-sm text-gray-500">请稍等...</ModalFooter>
        </ModalContent>
      </Modal>
      <Modal hideCloseButton size="xs" isOpen={isLoadingData}>
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
