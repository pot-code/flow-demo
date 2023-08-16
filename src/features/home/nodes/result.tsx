import { Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react"
import { Handle, NodeProps, Position } from "reactflow"
import useHandle from "../use-handle"

export default memo<NodeProps>(({ id, data }) => {
  const { limitConnectable } = useHandle(id)
  return (
    <>
      <Card>
        <CardHeader>Result</CardHeader>
        <Divider />
        <CardBody>
          <Input isReadOnly className="nodrag" size="sm" type="number" value={data.input} />
        </CardBody>
      </Card>
      <Handle id="input" type="target" position={Position.Left} isConnectable={limitConnectable("input", 1)} />
    </>
  )
})
