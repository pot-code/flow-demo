import React from "react"
import { Subject, Unsubscribable } from "rxjs"

interface DataFlowContextProps {
  getDataSource: (id: string) => DataSource
  removeDataSource: (id: string) => void
  subscribe: (sourceId: string, targetId: string, fn: (data: any) => void) => void
  unsubscribe: (sourceId: string, targetId: string) => void
}

const DataFlowContext = React.createContext<DataFlowContextProps | null>(null)

class DataSource {
  private sub = new Subject()

  private subscriptions: { id: string; stub: Unsubscribable }[] = []

  publish(data: any) {
    this.sub.next(data)
  }

  subscribe(id: string, fn: (data: any) => void) {
    if (this.subscriptions.some((sub) => sub.id === id)) return
    this.subscriptions.push({ id, stub: this.sub.subscribe(fn) })
  }

  unsubscribe(id: string) {
    const index = this.subscriptions.findIndex((sub) => sub.id === id)
    if (index > -1) this.subscriptions.splice(index, 1)[0].stub.unsubscribe()
  }

  dispose() {
    this.subscriptions.forEach((sub) => sub.stub.unsubscribe())
  }
}

export default function DataFlowProvider({ children }: { children: React.ReactNode }) {
  const dataSourceMap = useMemo(() => new Map<string, DataSource>(), [])

  const removeDataSource = useCallback(
    (id: string) => {
      if (dataSourceMap.has(id)) {
        dataSourceMap.get(id)?.dispose()
        dataSourceMap.delete(id)
      }
    },
    [dataSourceMap],
  )

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

  const subscribe = useCallback(
    (sourceId: string, targetId: string, fn: (data: any) => void) => {
      const dataSource = getDataSource(sourceId)
      dataSource.subscribe(targetId, fn)
    },
    [getDataSource],
  )

  const unsubscribe = useCallback(
    (sourceId: string, targetId: string) => {
      const dataSource = dataSourceMap.get(sourceId)
      if (dataSource) {
        dataSource.unsubscribe(targetId)
      }
    },
    [dataSourceMap],
  )

  const value = useMemo(
    () => ({ getDataSource, removeDataSource, subscribe, unsubscribe }),
    [getDataSource, removeDataSource, subscribe, unsubscribe],
  )
  return <DataFlowContext.Provider value={value}>{children}</DataFlowContext.Provider>
}

export function useDataFlowContext() {
  const context = useContext(DataFlowContext)
  if (!context) {
    throw new Error("useSubscription must be used within a SubscriptionProvider")
  }
  return context
}
