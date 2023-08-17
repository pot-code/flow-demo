import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { ArrowLeft, Plus } from "@phosphor-icons/react"
import ReactFlow, { Background, BackgroundVariant, Controls, Edge, MarkerType, MiniMap, Node, Panel } from "reactflow"
import { getNodeTypes } from "../nodes"
import useFlowGraph from "./use-flow-graph"

const nodeTypes = getNodeTypes()

export interface FlowGraphRef {
  getNodes(): Node[]
  getEdges(): Edge[]
}

interface FlowGraphProps {
  initialNodes?: Node[]
  initialEdges?: Edge[]
}

export default forwardRef<FlowGraphRef, FlowGraphProps>(({ initialNodes = [], initialEdges = [] }, ref) => {
  const { graphRef, nodes, edges, setEdges, setNodes, onNodesChange, onEdgesChange, onConnect, onAddNode, onAddEdge } =
    useFlowGraph()

  useImperativeHandle(ref, () => ({
    getNodes() {
      return nodes
    },
    getEdges() {
      return edges
    },
  }))

  useEffect(() => {
    setNodes(initialNodes)
  }, [initialNodes, setNodes])

  useEffect(() => {
    setEdges(initialEdges)
    initialEdges.forEach(onAddEdge)
  }, [initialEdges, onAddEdge, setEdges])

  return (
    <ReactFlow
      fitView
      className="bg-gray-50"
      ref={graphRef}
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      defaultEdgeOptions={{
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      }}
      fitViewOptions={{
        minZoom: 1,
        maxZoom: 1,
      }}
    >
      <Panel position="top-left">
        <div className="flex flex-col gap-unit-sm">
          <Button isIconOnly variant="faded">
            <ArrowLeft />
          </Button>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly color="primary" variant="shadow">
                <Plus />
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="flat" onAction={onAddNode}>
              <DropdownItem key="number">Number</DropdownItem>
              <DropdownItem key="add">Addition</DropdownItem>
              <DropdownItem key="multiple">Multiply</DropdownItem>
              <DropdownItem key="result">Result</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Panel>
      <MiniMap />
      <Controls />
      <Background variant={BackgroundVariant.Dots} />
    </ReactFlow>
  )
})
