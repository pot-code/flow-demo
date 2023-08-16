import { Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react"
import { Handle, NodeProps, Position } from "reactflow"
import useHandle from "../use-handle"

export default memo<NodeProps>(({ id, data }) => {
  const { limitConnection, isConnected } = useHandle(id)
  return (
    <>
      <Card>
        <CardHeader>Result</CardHeader>
        <Divider />
        <CardBody>
          <Input
            isReadOnly
            className="nodrag"
            color={isConnected("target", "value") ? "success" : "default"}
            size="sm"
            type="number"
            value={data.value}
          />
        </CardBody>
      </Card>
      <Handle id="value" type="target" position={Position.Left} isConnectable={limitConnection("target", "value", 1)} />
    </>
  )
})
