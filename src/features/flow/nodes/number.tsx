import { Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react"
import { useForm } from "react-hook-form"
import { Handle, NodeProps, Position } from "reactflow"
import { useDataFlowContext } from "../editor/context"
import useNode from "../use-node"

export default memo<NodeProps>(({ id, isConnectable, data }) => {
  const { getDataSource } = useDataFlowContext()
  const dataSource = useMemo(() => getDataSource(id), [getDataSource, id])
  const { setNodeData } = useNode(id)
  const { register, watch } = useForm({
    defaultValues: {
      value: data.value,
    },
  })
  const value = watch("value")

  const onConnect = useCallback(() => {
    dataSource.publish(data.value)
  }, [data.value, dataSource])

  useEffect(() => {
    dataSource.publish(data.value)
  }, [data.value, dataSource])

  useEffect(() => {
    setNodeData({ value })
  }, [setNodeData, value])

  return (
    <>
      <Card>
        <CardHeader>Number</CardHeader>
        <Divider />
        <CardBody>
          <Input
            className="nodrag"
            size="sm"
            type="number"
            variant="bordered"
            placeholder="请输入数字"
            defaultValue={data.value}
            {...register("value")}
          />
        </CardBody>
      </Card>
      <Handle id="value" type="source" position={Position.Right} isConnectable={isConnectable} onConnect={onConnect} />
    </>
  )
})
