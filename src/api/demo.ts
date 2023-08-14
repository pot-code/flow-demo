import http from "@/core/http"
import { HttpResponse } from "@/core/http/types"

export const demoApi = {
  hello: (signal?: AbortSignal) => http.get<HttpResponse<string>>("/hello", { signal }),
}
