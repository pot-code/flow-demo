import axios, { type AxiosResponse } from "axios"
import { UnauthorizedError } from "./error"
import { HttpErrorStream } from "./event"
import type { HttpResponse } from "./types"

export function captureBusinessError(res: AxiosResponse) {
  const { code } = res.data
  if (code === 200) {
    return res
  }

  if (code === 401) {
    HttpErrorStream.next(new UnauthorizedError())
  }
  return Promise.reject(res)
}

export function handleRejection(err: any) {
  if (axios.isCancel(err)) {
    return
  }

  if (err.data) {
    const { data } = err as AxiosResponse<HttpResponse<null>>
    const { msg, code } = data
    HttpErrorStream.next(new Error(msg || code.toString()))
  } else if (err.response) {
    const { msg, code } = err.response.data as HttpResponse<null>
    HttpErrorStream.next(new Error(msg || code.toString()))
  } else if (err.request) {
    HttpErrorStream.next(new Error("服务器未响应"))
  } else if (err instanceof Error) {
    HttpErrorStream.next(err)
  } else {
    HttpErrorStream.next(new Error("未知错误"))
  }
  Promise.reject(err)
}
