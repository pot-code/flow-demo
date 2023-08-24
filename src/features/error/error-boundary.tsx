import React from "react"
import { HttpErrorStream } from "@/core/http/event"
import useAuthStore from "../auth/use-auth-store"

export interface ErrorBoundaryProps {
  children: React.ReactElement
}

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)

  useEffect(() => {
    const sub = HttpErrorStream.subscribe((err) => {
      if (err.code === 401) {
        setIsAuthenticated(false)
      }
    })
    return () => {
      sub.unsubscribe()
    }
  }, [setIsAuthenticated])

  return children
}
