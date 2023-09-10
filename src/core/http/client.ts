import { AxiosInstance, AxiosRequestConfig } from "axios"

export default class HttpClient {
  constructor(private readonly client: AxiosInstance) {}

  async get<T = any>(url: string, config?: AxiosRequestConfig<any>) {
    return this.client.get<T>(url, config).then((res) => res.data)
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>) {
    return this.client.post<T>(url, data, config).then((res) => res.data)
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>) {
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
