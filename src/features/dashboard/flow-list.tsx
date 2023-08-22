import { Card, CardFooter, CardHeader, Skeleton } from "@nextui-org/react"
import { FlowListData } from "@/api/flow"
import FlowCard from "./flow-card"

function LoadingState({ count = 3 }: { count?: number }) {
  return (
    <section className="grid grid-cols-3 laptop:grid-cols-4 monitor-2k:grid-cols-6 monitor-4k:grid-cols-8 gap-unit-md">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-6 w-[96px] rounded-lg" />
            </CardHeader>
            <CardFooter>
              <Skeleton className="h-5 w-full rounded-lg" />
            </CardFooter>
          </Card>
        ))}
    </section>
  )
}

function EmptyData() {
  return (
    <Card shadow="none">
      <CardHeader className="text-foreground-500">No Data</CardHeader>
    </Card>
  )
}

export interface FlowListProps {
  data?: FlowListData[]
  isLoading?: boolean
}

export default function FlowList({ isLoading, data }: FlowListProps) {
  if (isLoading) {
    return <LoadingState />
  }

  if (!data) {
    return <EmptyData />
  }

  return (
    <section className="grid grid-cols-3 laptop:grid-cols-4 monitor-2k:grid-cols-6 monitor-4k:grid-cols-8 gap-unit-md">
      {data.map((item) => (
        <FlowCard key={item.id} name={item.name} createdAt={item.created_at} />
      ))}
    </section>
  )
}
