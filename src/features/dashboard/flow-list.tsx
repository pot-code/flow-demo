import { Card, CardFooter, CardHeader, Skeleton } from "@nextui-org/react"
import { isEmpty } from "lodash-es"
import LoadingModal from "@/components/loading-modal"
import FlowCard from "./flow-card"
import useFlowList from "./use-flow-list"

function GridLayout({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-4 monitor-2k:grid-cols-6 monitor-4k:grid-cols-8 gap-unit-md">{children}</div>
}

function LoadingState({ count = 3 }: { count?: number }) {
  return (
    <GridLayout>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-6 my-1 w-full rounded-lg" />
            </CardHeader>
            <CardFooter>
              <Skeleton className="h-5 w-[128px] rounded-lg" />
            </CardFooter>
          </Card>
        ))}
    </GridLayout>
  )
}

function EmptyData() {
  return <p className="text-center text-foreground-500">No Data</p>
}

export default function FlowList() {
  const { isLoading, isRefreshing, data, deleteFlowMutation, onDeleteFlow, onEditFlow } = useFlowList()

  if (isLoading) {
    return <LoadingState />
  }

  if (isEmpty(data)) {
    return <EmptyData />
  }

  return (
    <>
      <GridLayout>
        {data!.map((item) => (
          <FlowCard
            key={item.id}
            id={item.id}
            name={item.name}
            createdAt={item.created_at}
            onDelete={onDeleteFlow}
            onEdit={onEditFlow}
          />
        ))}
      </GridLayout>
      <LoadingModal title="删除中" loading={deleteFlowMutation.isLoading} />
      <LoadingModal title="加载中" loading={isRefreshing} />
    </>
  )
}
