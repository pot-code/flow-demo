import React from "react"
import { createRoot } from "react-dom/client"
import { NextUIProvider } from "@nextui-org/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { HttpError } from "./core/http/error"

import App from "./app"
import "./i18n"
import { setup } from "./setup"

import "./styles/main.css"
import "reactflow/dist/style.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry(failureCount, error) {
        if (error instanceof HttpError && (error.code === 401 || error.code === 403)) {
          return false
        }
        return failureCount < 3
      },
    },
  },
})

const root = createRoot(document.getElementById("root")!)

setup().then(() =>
  root.render(
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <NextUIProvider>
          <main>
            <App />
          </main>
        </NextUIProvider>
      </React.StrictMode>
    </QueryClientProvider>,
  ),
)
