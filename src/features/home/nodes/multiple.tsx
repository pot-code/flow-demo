import { Card, CardBody, CardHeader, Chip, Divider } from "@nextui-org/react"
import { Handle, NodeProps, Position } from "reactflow"
import { isNil } from "lodash-es"
import { useDataFlowContext } from "../context"
import useHandle from "../use-handle"

export default memo<NodeProps>(({ id, isConnectable, data }) => {
  const { getDataSource } = useDataFlowContext()
  const { limitConnectable } = useHandle(id)
  const dataSource = useMemo(() => getDataSource(id), [getDataSource, id])

  const effect = useCallback((d: typeof data) => {
    if (isNil(d.op1) || isNil(d.op2)) return 0
    return Number(d.op1) * Number(d.op2)
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
        <CardHeader>Multiple</CardHeader>
        <Divider />
        <CardBody className="gap-3">
          <Chip variant="flat">operand: {data.op1}</Chip>
          <Chip variant="flat">operand: {data.op2}</Chip>
        </CardBody>
      </Card>
      <Handle
        id="op1"
        type="target"
        position={Position.Left}
        style={{ top: "auto", bottom: 65 }}
        isConnectable={limitConnectable("op1", 1)}
      />
      <Handle
        id="op2"
        type="target"
        position={Position.Left}
        style={{ top: "auto", bottom: 25 }}
        isConnectable={limitConnectable("op2", 1)}
      />
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} onConnect={onConnect} />
    </>
  )
})
