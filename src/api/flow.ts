import http from "@/core/http"
import { HttpResponse } from "@/core/http/types"

export const flowApi = {
  list: () => http.get<HttpResponse<FlowListData[]>>("/flow"),
  create: (data: CreateFlowGraphData) => http.post<HttpResponse<UpdateFlowGraphData>>("/flow", data),
  update: (data: UpdateFlowGraphData) => http.put(`/flow/${data.id}`, data),
  getByID: (flowId: string) => http.get<HttpResponse<FlowGraphData>>(`/flow/${flowId}`),
}

export interface CreateFlowGraphData {
  name: string
  nodes?: string
  edges?: string
}

export interface UpdateFlowGraphData {
  id: string
  name: string
  nodes?: string
  edges?: string
}

export interface FlowGraphData {
  id: string
  name: string
  nodes?: string
  edges?: string
}

export interface FlowListData {
  id: string
  name: string
  owner_id: string
  created_at: string
}
