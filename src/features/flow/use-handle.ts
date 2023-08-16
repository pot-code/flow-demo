import { getConnectedEdges, useStore } from "reactflow"

export default function useHandle(id: string) {
  const nodeInternals = useStore((state) => state.nodeInternals)
  const edges = useStore((state) => state.edges)

  const limitConnection = useCallback(
    (handleType: "source" | "target", handleId: string, count: number) => {
      const node = nodeInternals.get(id)
      if (node) {
        const connectedEdges = getConnectedEdges([node], edges)
        const connections = connectedEdges.filter(
          (e) => e[handleType] === id && e[`${handleType}Handle`] === handleId,
        ).length
        if (connections >= count) {
          return false
        }
      }
      return true
    },
    [edges, id, nodeInternals],
  )

  const isConnected = useCallback(
    (handleType: "source" | "target", handleId: string) => {
      const node = nodeInternals.get(id)
      if (node) {
        const connectedEdges = getConnectedEdges([node], edges)
        return connectedEdges.some((e) => e[handleType] === id && e[`${handleType}Handle`] === handleId)
      }
      return false
    },
    [edges, id, nodeInternals],
  )

  return {
    isConnected,
    limitConnection,
  }
}
