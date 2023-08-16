import { Edge, Node } from "reactflow"
import http from "@/core/http"

export const graphApi = {
  save(data: SaveFlowGraphData) {
    return http.post("/flow/graph", data)
  },
}

export interface SaveFlowGraphData {
  nodes: Node[]
  edges: Edge[]
}
