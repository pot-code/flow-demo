import { Button } from "@nextui-org/react"
import { ArrowLeft } from "@phosphor-icons/react"
import { ReactFlowProvider } from "reactflow"
import LoadingModal from "@/components/loading-modal"
import DataFlowProvider from "@/features/flow/editor/context"
import FlowGraph from "@/features/flow/editor/graph"
import NameInput from "@/features/flow/editor/name-input"
import useEditor from "@/features/flow/editor/use-editor"

export default function FlowEditor() {
  const navigate = useNavigate()
  const { isSaving, isLoadingFlow, isRefreshing, graphName, nodes, edges, graphRef, saveGraph, onChangeGraphName } =
    useEditor()

  return (
    <div className="h-screen w-screen flex flex-col">
      <nav className="flex justify-between items-center px-unit-xl h-12 border-b-1 bg-background border-divider">
        <Button isIconOnly size="sm" variant="light" onClick={() => navigate(-1)}>
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
            <FlowGraph ref={graphRef} isRefreshing={isRefreshing} initialNodes={nodes} initialEdges={edges} />
          </ReactFlowProvider>
        </DataFlowProvider>
      </div>
      <LoadingModal title="保存中" loading={isSaving} />
      <LoadingModal title="载入中" loading={isLoadingFlow} />
    </div>
  )
}
