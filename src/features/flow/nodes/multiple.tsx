import { Card, CardBody, CardHeader, Chip, Divider } from "@nextui-org/react"
import { Handle, NodeProps, Position } from "reactflow"
import { isNil } from "lodash-es"
import { useDataFlowContext } from "../editor/context"
import useHandle from "../use-handle"

export default memo<NodeProps>(({ id, isConnectable, data }) => {
  const { getDataSource } = useDataFlowContext()
  const { limitConnection, isConnected } = useHandle(id)
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
          <Chip color={isConnected("op1", "target") ? "success" : "default"} variant="flat">
            Input: {data.op1}
          </Chip>
          <Chip color={isConnected("op2", "target") ? "success" : "default"} variant="flat">
            Input: {data.op2}
          </Chip>
        </CardBody>
      </Card>
      <Handle
        id="op1"
        type="target"
        position={Position.Left}
        style={{ top: "auto", bottom: 65 }}
        isConnectable={limitConnection("op1", 1)}
      />
      <Handle
        id="op2"
        type="target"
        position={Position.Left}
        style={{ top: "auto", bottom: 25 }}
        isConnectable={limitConnection("op2", 1)}
      />
      <Handle id="value" type="source" position={Position.Right} isConnectable={isConnectable} onConnect={onConnect} />
    </>
  )
})
