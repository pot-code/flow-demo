import { useMutation } from "@tanstack/react-query"
import { FlowGraphRef } from "./flow-graph"
import { editorApi } from "@/api/flow"

export default function useEditor() {
  const [isLoading, setIsLoading] = useState(false)
  const graphRef = useRef<FlowGraphRef>(null)
  const save = useMutation(editorApi.save)

  function saveGraph() {
    const nodes = graphRef.current?.getNodes()
    const edges = graphRef.current?.getEdges()
    if (nodes && edges) {
      save.mutate({ nodes, edges })
    }
  }

  useEffect(() => {
    setIsLoading(save.isLoading)
  }, [save.isLoading])

  useEffect(() => {
    if (save.isSuccess) {
      setIsLoading(false)
    }
  }, [save.isSuccess])

  return { isLoading, graphRef, saveGraph }
}
