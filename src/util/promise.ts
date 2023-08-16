export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function delayedPromise<T extends any[], R>(ms: number, fn: (...args: T) => Promise<R>) {
  return async (...args: T) => {
    const [v] = await Promise.all([fn(...args), sleep(ms)])
    return v
  }
}
