export interface HttpResponse<T> {
  code: number
  msg: string | null
  data?: T
}
