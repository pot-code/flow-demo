import React from "react"
import { Subject, Unsubscribable } from "rxjs"

interface SubscriptionContextProps {
  getDataSource: (id: string) => DataSource | null
  removeDataSource: (id: string) => void
}

const SubscriptionContext = React.createContext<SubscriptionContextProps | null>(null)

class DataSource {
  private sub = new Subject()

  private subscriptions: Unsubscribable[] = []

  subscribe(fn: (data: any) => void) {
    this.subscriptions.push(this.sub.subscribe(fn))
  }

  dispose() {
    this.subscriptions.forEach((sub) => sub.unsubscribe())
  }
}

export default function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const dataSourceMap = useMemo(() => new Map<string, DataSource>(), [])

  const getDataSource = useCallback(
    (id: string) => {
      let dataSource = dataSourceMap.get(id)
      if (!dataSource) {
        dataSource = new DataSource()
        dataSourceMap.set(id, dataSource)
      }
      return dataSource
    },
    [dataSourceMap],
  )
  const removeDataSource = useCallback(
    (id: string) => {
      if (dataSourceMap.has(id)) {
        dataSourceMap.get(id)?.dispose()
      }
    },
    [dataSourceMap],
  )

  const value = useMemo(() => ({ getDataSource, removeDataSource }), [getDataSource, removeDataSource])
  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (!context) {
    throw new Error("useSubscription must be used within a SubscriptionProvider")
  }
  return context
}
