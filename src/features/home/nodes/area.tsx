import { Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react"
import { useForm } from "react-hook-form"
import { Connection, Handle, NodeProps, Position, useReactFlow } from "reactflow"

export default memo<NodeProps>(({ isConnectable }) => {
  const instance = useReactFlow()
  const { register, getValues } = useForm({
    defaultValues: {
      width: 0,
      length: 0,
    },
  })

  const onConnect = useCallback(
    (c: Connection) => {
      console.log("🚀 ~ file: area.tsx:16 ~ params:", c)
      const [width, length] = getValues(["width", "length"])
      const result = width * length
      instance.setNodes((nds) => {
        return nds.map((node) => {
          if (node.id === c.target) {
            return { ...node, data: { ...node.data, [c.targetHandle as string]: result } }
          }
          return node
        })
      })
    },
    [getValues, instance],
  )

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
