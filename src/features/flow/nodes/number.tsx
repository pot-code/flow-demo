import { Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react"
import { Handle, NodeProps, Position } from "reactflow"
import { useDataFlowContext } from "../editor/context"
import useNode from "../use-node"

export default memo<NodeProps>(({ id, isConnectable, data }) => {
  const [value, setValue] = useState(data.value)
  const { getDataSource } = useDataFlowContext()
  const dataSource = useMemo(() => getDataSource(id), [getDataSource, id])
  const { setNodeData } = useNode(id)

  const onConnect = useCallback(() => {
    dataSource.publish(data.value)
  }, [data.value, dataSource])

  const onBlur = useCallback(() => {
    setNodeData({ value })
  }, [setNodeData, value])

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value || 0)
  }, [])

  useEffect(() => {
    dataSource.publish(data.value)
  }, [data.value, dataSource])

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
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
        </CardBody>
      </Card>
      <Handle id="value" type="source" position={Position.Right} isConnectable={isConnectable} onConnect={onConnect} />
    </>
  )
})
