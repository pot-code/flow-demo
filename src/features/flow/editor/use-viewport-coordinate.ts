import { useMeasure } from "@react-hookz/web"
import { useReactFlow } from "reactflow"

export default function useViewportCoordinate() {
  const instance = useReactFlow()
  const [measure, graphRef] = useMeasure<HTMLDivElement>()

  const offsetToOrigin = useCallback(
    (offsetX: number, offsetY: number) => {
      const { x, y, zoom } = instance.getViewport()
      return [(offsetX - x) / zoom, (offsetY - y) / zoom]
    },
    [instance],
  )

  const getViewportCenter = useCallback(() => {
    if (!measure) return [0, 0]

    const [halfWidth, halfHeight] = [measure.width / 2, measure.height / 2]
    return offsetToOrigin(halfWidth, halfHeight)
  }, [measure, offsetToOrigin])

  const getViewportHeight = useCallback(() => {
    if (!measure) return 0
    return measure.height
  }, [measure])

  const getViewportWidth = useCallback(() => {
    if (!measure) return 0
    return measure.width
  }, [measure])

  return { graphRef, getViewportCenter, offsetToOrigin, getViewportHeight, getViewportWidth }
}
