import axios, { type AxiosResponse } from "axios"
import { HttpError } from "./error"
import { HttpErrorStream } from "./event"
import type { HttpResponse } from "./types"

export function captureBusinessError(res: AxiosResponse) {
  const { code, msg } = res.data
  if (code && code !== 200) {
    const err = new HttpError(msg || "", code)
    HttpErrorStream.next(err)
    return Promise.reject(err)
  }
  return res
}

export function handleRejection(error: any) {
  if (axios.isCancel(error)) {
    return Promise.resolve()
  }

  let httpError
  if (error.response) {
    const response = error.response as AxiosResponse
    if (response.data) {
      const { msg, code } = response.data as HttpResponse<null>
      httpError = new HttpError(msg || "", code)
    } else {
      httpError = new HttpError(response.statusText, response.status)
    }
  } else if (error.request) {
    httpError = new HttpError("连接远程服务器失败" || "", -1)
  } else if (error instanceof Error) {
    httpError = HttpError.fromError(error)
  } else {
    httpError = new HttpError("未知错误" || "", -1)
  }
  HttpErrorStream.next(httpError)
  return Promise.reject(httpError)
}
