import React from "react"

async function installMockService() {
  if (import.meta.env.VITE_MOCK_ENABLED === "true") {
    await import("../mock/browser").then(({ createWorker }) => createWorker()).then((worker) => worker.start())
  }
}

async function installWdyr() {
  if (import.meta.env.VITE_WDYR_ENABLED === "true") {
    const { default: wdyr } = await import("@welldone-software/why-did-you-render")
    wdyr(React, {
      exclude: [/^BrowserRouter/, /^Link/, /^Route/],
      trackHooks: true,
      trackAllPureComponents: true,
    })
  }
}

export async function setup() {
  await installWdyr()
  await installMockService()
}
