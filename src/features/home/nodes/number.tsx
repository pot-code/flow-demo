import { Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react"
import { useForm } from "react-hook-form"
import { Handle, NodeProps, Position } from "reactflow"
import { useDataFlowContext } from "../context"

export default memo<NodeProps>(({ id, isConnectable }) => {
  const { getDataSource } = useDataFlowContext()
  const dataSource = useMemo(() => getDataSource(id), [getDataSource, id])
  const { register, watch, getValues } = useForm({
    defaultValues: {
      value: 0,
    },
  })
  const value = watch("value")

  const onConnect = useCallback(() => {
    const v = getValues("value")
    dataSource.publish(v)
  }, [dataSource, getValues])

  useEffect(() => {
    dataSource.publish(value)
  }, [dataSource, value])

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
            {...register("value")}
          />
        </CardBody>
      </Card>
      <Handle id="value" type="source" position={Position.Right} isConnectable={isConnectable} onConnect={onConnect} />
    </>
  )
})
