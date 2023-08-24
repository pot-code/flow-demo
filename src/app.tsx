import { RouterProvider } from "react-router-dom"
import router from "./router"
import { ToastProvider } from "./components/toast"
import ErrorBoundary from "./features/error/error-boundary"

export default function App() {
  return (
    <ToastProvider>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ToastProvider>
  )
}
