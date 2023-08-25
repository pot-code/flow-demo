import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import { captureBusinessError, handleRejection } from "./interceptors"

class HttpClient {
  constructor(private readonly client: AxiosInstance) {}

  async get<T = any>(url: string, config?: AxiosRequestConfig<any>) {
    return this.client.get<T>(url, config).then((res) => res.data)
  }

  async post<T = any>(url: string, data: any, config?: AxiosRequestConfig<any>) {
    return this.client.post<T>(url, data, config).then((res) => res.data)
  }

  async put<T = any>(url: string, data: any, config?: AxiosRequestConfig<any>) {
    return this.client.put<T>(url, data, config).then((res) => res.data)
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig<any>) {
    return this.client.delete<T>(url, config).then((res) => res.data)
  }

  async request<T>(method: string, url: string, config?: AxiosRequestConfig<any>) {
    return this.client
      .request<T>({
        method,
        url,
        ...config,
      })
      .then((res) => res.data)
  }
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PREFIX,
})

axiosInstance.interceptors.response.use(captureBusinessError, handleRejection)

export default new HttpClient(axiosInstance)
export type { HttpResponse } from "./types"
export { HttpError } from "./error"
export { HttpErrorStream } from "./event"
