import { Card, CardBody, CardHeader, Chip, Divider } from "@nextui-org/react"
import { Handle, NodeProps, Position } from "reactflow"
import { isNil } from "lodash-es"
import { useDataFlowContext } from "../editor/context"
import useNode from "../use-node"

export default memo<NodeProps>(({ id, isConnectable, data }) => {
  const { getDataSource } = useDataFlowContext()
  const { limitConnection, isConnected } = useNode(id)
  const dataSource = useMemo(() => getDataSource(id), [getDataSource, id])

  const effect = useCallback((d: typeof data) => {
    if (isNil(d.op1) || isNil(d.op2)) return undefined
    return Number(d.op1) + Number(d.op2)
  }, [])

  const onConnect = useCallback(() => {
    dataSource.publish(effect(data))
  }, [data, dataSource, effect])

  useEffect(() => {
    dataSource.publish(effect(data))
  }, [data, dataSource, effect])

  return (
    <>
      <Card>
        <CardHeader>Add</CardHeader>
        <Divider />
        <CardBody className="gap-unit-sm">
          <Chip color={isConnected("target", "op1") ? "success" : "default"} variant="flat">
            Input: {data.op1 ?? "NaN"}
          </Chip>
          <Chip color={isConnected("target", "op2") ? "success" : "default"} variant="flat">
            Input: {data.op2 ?? "NaN"}
          </Chip>
        </CardBody>
      </Card>
      <Handle
        id="op1"
        type="target"
        position={Position.Left}
        style={{ top: "auto", bottom: 65 }}
        isConnectable={limitConnection("target", "op1", 1)}
      />
      <Handle
        id="op2"
        type="target"
        position={Position.Left}
        style={{ top: "auto", bottom: 25 }}
        isConnectable={limitConnection("target", "op2", 1)}
      />
      <Handle id="value" type="source" position={Position.Right} isConnectable={isConnectable} onConnect={onConnect} />
    </>
  )
})
