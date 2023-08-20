export interface HttpResponse<T = any> {
  code: number
  msg: string | null
  data?: T
}
