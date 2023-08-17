import { useMeasure } from "@react-hookz/web"
import { useReactFlow } from "reactflow"

export default function useGraphCoordinate() {
  const instance = useReactFlow()
  const [measurement, graphRef] = useMeasure<HTMLDivElement>()

  const getViewportCenter = useCallback(() => {
    if (!measurement) return [0, 0]

    const { x, y, zoom } = instance.getViewport()
    const [halfWidth, halfHeight] = [measurement.width / 2, measurement.height / 2]
    return [(halfWidth - x) / zoom, (halfHeight - y) / zoom]
  }, [instance, measurement])

  return { graphRef, getViewportCenter }
}
