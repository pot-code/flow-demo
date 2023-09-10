import axios from "axios"
import HttpClient from "./client"
import { captureBusinessError, handleRejection } from "./interceptors"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PREFIX,
})

axiosInstance.interceptors.response.use(captureBusinessError, handleRejection)

export default new HttpClient(axiosInstance)
export { HttpError } from "./error"
export { HttpErrorStream } from "./event"
export type { HttpResponse } from "./types"
