export class HttpError extends Error {
  code: number

  constructor(message: string, code: number) {
    super(message)
    this.code = code
  }

  static fromError(err: Error) {
    return new HttpError(err.message, -1)
  }
}
