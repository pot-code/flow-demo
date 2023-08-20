export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function delayedPromise<T extends any[], R>(ms: number, fn: (...args: T) => Promise<R>) {
  return async (...args: T) => {
    let error
    const [v] = await Promise.all([
      fn(...args).catch((e) => {
        error = e
      }),
      sleep(ms),
    ])
    if (error) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw error
    }
    return v
  }
}
