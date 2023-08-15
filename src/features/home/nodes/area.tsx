import { Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react"
import { useForm } from "react-hook-form"
import { Handle, NodeProps, Position } from "reactflow"
import { useDataFlowContext } from "../context"

export default memo<NodeProps>(({ id, isConnectable }) => {
  const { getDataSource } = useDataFlowContext()
  const dataSource = useMemo(() => getDataSource(id), [getDataSource, id])
  const { register, getValues, watch } = useForm({
    defaultValues: {
      width: 0,
      length: 0,
    },
  })
  const [length, width] = watch(["length", "width"])

  const onConnect = useCallback(() => {
    const [w, l] = getValues(["width", "length"])
    dataSource?.publish(w * l)
  }, [dataSource, getValues])

  useEffect(() => {
    dataSource?.publish(length * width)
  }, [dataSource, length, width])

  return (
    <>
      <Card>
        <CardHeader>Area</CardHeader>
        <Divider />
        <CardBody>
          <div className="space-y-3">
            <Input
              className="nodrag"
              size="sm"
              label="长"
              type="number"
              placeholder="length"
              min={0}
              defaultValue="0"
              {...register("length")}
            />
            <Input
              className="nodrag"
              size="sm"
              label="宽"
              type="number"
              placeholder="width"
              min={0}
              defaultValue="0"
              {...register("width")}
            />
          </div>
        </CardBody>
      </Card>
      {/* <Handle id="width" type="target" position={Position.Left} isConnectable={isConnectable} />
      <Handle
        id="length"
        type="target"
        position={Position.Left}
        style={{ top: "auto", bottom: 36 }}
        isConnectable={isConnectable}
      /> */}
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} onConnect={onConnect} />
    </>
  )
})
