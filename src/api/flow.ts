import { Edge, Node } from "reactflow"
import http from "@/core/http"
import { HttpResponse } from "@/core/http/types"

export const graphApi = {
  save(data: SaveFlowGraphData) {
    return http.post("/flow/graph", data)
  },
  get(flowId: string) {
    return http.get<HttpResponse<FlowGraphData>>(`/flow/graph/${flowId}`)
  },
}

export interface SaveFlowGraphData {
  nodes: Node[]
  edges: Edge[]
}

export interface FlowGraphData {
  flow_id: string
  nodes: Node[]
  edges: Edge[]
}
