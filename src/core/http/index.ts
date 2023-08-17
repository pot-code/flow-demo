import axios from "axios"
import { captureBusinessError, handleRejection } from "./interceptors"

const http = axios.create({
  baseURL: import.meta.env.VITE_API_PREFIX,
})

http.interceptors.request.use((config) => {
  config.headers.setAuthorization(`Bearer ${import.meta.env.VITE_API_TOKEN}`)
  return config
})
http.interceptors.response.use(captureBusinessError, handleRejection)

export default http
