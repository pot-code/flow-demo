import { useMutation } from "@tanstack/react-query"
import { graphApi } from "@/api/flow"
import { Time } from "@/util/duration"
import { delayedPromise } from "@/util/promise"
import { FlowGraphRef } from "./flow-graph"

export default function useEditor() {
  const [isLoading, setIsLoading] = useState(false)
  const graphRef = useRef<FlowGraphRef>(null)
  const save = useMutation(delayedPromise(1 * Time.Second, graphApi.save))

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

  return { isLoading, graphRef, saveGraph }
}
