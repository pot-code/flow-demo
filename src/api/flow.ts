import http from "@/core/http"
import { HttpResponse } from "@/core/http/types"

export const flowApi = {
  list: () => http.get<HttpResponse<FlowListData[]>>("/flow"),
  create: (data: CreateFlowData) => http.post<HttpResponse<UpdateFlowData>>("/flow", data),
  delete: (id: string) => http.delete(`/flow/${id}`),
  update: (data: UpdateFlowData) => http.put(`/flow/${data.id}`, data),
  getByID: (flowId: string) => http.get<HttpResponse<FlowGraphData>>(`/flow/${flowId}`),
}

export interface CreateFlowData {
  name: string
  nodes?: string
  edges?: string
}

export interface UpdateFlowData {
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
