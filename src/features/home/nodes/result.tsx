import { Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react"
import { Handle, NodeProps, Position } from "reactflow"

export default memo<NodeProps>(({ data, isConnectable }) => (
  <>
    <Card>
      <CardHeader>Result</CardHeader>
      <Divider />
      <CardBody>
        <Input isReadOnly className="nodrag" size="sm" type="number" value={data.input} />
      </CardBody>
    </Card>
    <Handle id="input" type="target" position={Position.Left} isConnectable={isConnectable} />
  </>
))
