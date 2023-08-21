import axios, { type AxiosResponse } from "axios"
import { HttpError } from "./error"
import { HttpErrorStream } from "./event"
import type { HttpResponse } from "./types"

export function captureBusinessError(res: AxiosResponse) {
  const { code } = res.data
  if (code && code !== 200) {
    const { msg } = res.data
    HttpErrorStream.next(new HttpError(msg || "", code))
    return Promise.reject(res)
  }
  return res
}

export function handleRejection(error: any) {
  if (axios.isCancel(error)) {
    return Promise.resolve()
  }

  let httpError
  if (error.response) {
    const { msg, code } = error.response.data as HttpResponse<null>
    httpError = new HttpError(msg || "", code)
  } else if (error.request) {
    httpError = new HttpError("请求超时" || "", -1)
  } else if (error instanceof Error) {
    httpError = HttpError.fromError(error)
  } else {
    httpError = new HttpError("未知错误" || "", -1)
  }
  HttpErrorStream.next(httpError)
  return Promise.reject(httpError)
}
