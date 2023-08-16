import axios, { type AxiosResponse } from "axios"
import { HttpError } from "./error"
import { HttpErrorStream } from "./event"
import type { HttpResponse } from "./types"

export function captureBusinessError(res: AxiosResponse) {
  const { code } = res.data
  if (code === 200) {
    return res
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
    HttpErrorStream.next(new HttpError(msg || "", code))
  } else if (err.response) {
    const { msg, code } = err.response.data as HttpResponse<null>
    HttpErrorStream.next(new HttpError(msg || "", code))
  } else if (err.request) {
    HttpErrorStream.next(new HttpError("请求超时" || "", -1))
  } else if (err instanceof Error) {
    HttpErrorStream.next(HttpError.fromError(err))
  } else {
    HttpErrorStream.next(new HttpError("未知错误" || "", -1))
  }
  Promise.reject(err)
}
