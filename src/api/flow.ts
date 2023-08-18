import http from "@/core/http"
import { HttpResponse } from "@/core/http/types"

export const graphApi = {
  save(data: SaveFlowGraphData) {
    data.name = "test"
    return http.post("/flow", data)
  },
  update(data: UpdateFlowGraphData) {
    data.name = "test"
    return http.put(`/flow/${data.id}`, data)
  },
  get(flowId: string) {
    return http.get<HttpResponse<FlowGraphData>>(`/flow/${flowId}`)
  },
}

export interface SaveFlowGraphData {
  name?: string
  nodes: string
  edges: string
}

export interface UpdateFlowGraphData {
  id: string
  name?: string
  nodes: string
  edges: string
}

export interface FlowGraphData {
  id: string
  nodes: string
  edges: string
}
