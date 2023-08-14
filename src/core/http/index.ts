import axios from "axios"
import { captureBusinessError, handleRejection } from "./interceptors"

const http = axios.create({
  baseURL: import.meta.env.VITE_API_PREFIX,
})

http.interceptors.response.use(captureBusinessError, handleRejection)

export default http
