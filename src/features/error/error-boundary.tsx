import React from "react"
import { HttpErrorStream } from "@/core/http/event"

export interface ErrorBoundaryProps {
  children: React.ReactElement
}

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
  useEffect(() => {
    const sub = HttpErrorStream.subscribe((err) => {})
    return () => {
      sub.unsubscribe()
    }
  }, [])

  return children
}
