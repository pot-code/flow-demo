import React from "react"
import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "react-query"
import { NextUIProvider } from "@nextui-org/react"

import App from "./app"
import "./i18n"
import { setup } from "./setup"

import "./styles/main.css"
import "reactflow/dist/style.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const root = createRoot(document.getElementById("root")!)

setup().then(() =>
  root.render(
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </React.StrictMode>
    </QueryClientProvider>,
  ),
)
