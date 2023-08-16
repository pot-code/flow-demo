import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { Plus } from "@phosphor-icons/react"
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
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onEdgesDelete, onAddNode } = useFlowGraph(
    initialNodes,
    initialEdges,
  )
  // const { x, y } = useViewport()

  useImperativeHandle(ref, () => ({
    getNodes() {
      return nodes
    },
    getEdges() {
      return edges
    },
  }))

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
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly color="primary" variant="shadow">
              <Plus />
            </Button>
          </DropdownTrigger>
          <DropdownMenu onAction={onAddNode}>
            <DropdownItem key="number">Number</DropdownItem>
            <DropdownItem key="add">Addition</DropdownItem>
            <DropdownItem key="multiple">Multiply</DropdownItem>
            <DropdownItem key="result">Result</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Panel>
      <MiniMap />
      <Controls />
      <Background variant={BackgroundVariant.Dots} />
      {/* <div className="absolute rounded-full bg-red-500 w-2 h-2" style={{ left: `${x - 10}px`, top: `${y - 10}px` }} /> */}
    </ReactFlow>
  )
})
