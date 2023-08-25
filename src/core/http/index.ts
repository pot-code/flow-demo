import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import { captureBusinessError, handleRejection } from "./interceptors"

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_PREFIX,
})

instance.interceptors.request.use((config) => {
  config.headers.setAuthorization(`Bearer ${import.meta.env.VITE_API_TOKEN}`)
  return config
})
instance.interceptors.response.use(captureBusinessError, handleRejection)

class HttpClient {
  constructor(private readonly client: AxiosInstance) {}

  async get<T>(url: string, config?: AxiosRequestConfig<any>) {
    return this.client.get<T>(url, config).then((res) => res.data)
  }

  async post<T>(url: string, data: any, config?: AxiosRequestConfig<any>) {
    return this.client.post<T>(url, data, config).then((res) => res.data)
  }

  async put<T>(url: string, data: any, config?: AxiosRequestConfig<any>) {
    return this.client.put<T>(url, data, config).then((res) => res.data)
  }

  async delete<T>(url: string, config?: AxiosRequestConfig<any>) {
    return this.client.delete<T>(url, config).then((res) => res.data)
  }

  async request(method: string, url: string, config?: AxiosRequestConfig<any>) {
    return this.client
      .request({
        method,
        url,
        ...config,
      })
      .then((res) => res.data)
  }
}

export default new HttpClient(instance)

export type { HttpResponse } from "./types"
export { HttpError } from "./error"
export { HttpErrorStream } from "./event"
