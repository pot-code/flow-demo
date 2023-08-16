import { Edge, Node } from "reactflow"
import http from "@/core/http"

export const editorApi = {
  save(data: SaveFlowGraphData) {
    return http.post("/flow", data)
  },
}

export interface SaveFlowGraphData {
  nodes: Node[]
  edges: Edge[]
}
