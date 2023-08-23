import {
  Card,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  Spinner,
} from "@nextui-org/react"
import { FlowListData } from "@/api/flow"
import FlowCard from "./flow-card"
import useFlowList from "./use-flow-list"

function LoadingState({ count = 3 }: { count?: number }) {
  return (
    <section className="grid grid-cols-3 laptop:grid-cols-4 monitor-2k:grid-cols-6 monitor-4k:grid-cols-8 gap-unit-md">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-6 my-1 w-[96px] rounded-lg" />
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
  return <p className="text-center text-foreground-500">No Data</p>
}

export interface FlowListProps {
  data?: FlowListData[]
  isLoading?: boolean
}

export default function FlowList({ isLoading, data }: FlowListProps) {
  const { deleteFlowMutation, onDeleteFlow, onEditFlow } = useFlowList()

  if (isLoading) {
    return <LoadingState />
  }

  if (!data) {
    return <EmptyData />
  }

  return (
    <section className="grid grid-cols-3 laptop:grid-cols-4 monitor-2k:grid-cols-6 monitor-4k:grid-cols-8 gap-unit-md">
      {data.map((item) => (
        <FlowCard
          key={item.id}
          id={item.id}
          name={item.name}
          createdAt={item.created_at}
          onDelete={onDeleteFlow}
          onEdit={onEditFlow}
        />
      ))}
      <Modal hideCloseButton size="xs" isOpen={deleteFlowMutation.isLoading}>
        <ModalContent>
          <ModalHeader>删除中</ModalHeader>
          <ModalBody>
            <Spinner />
          </ModalBody>
          <ModalFooter className="justify-center text-sm text-gray-500">请稍等...</ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  )
}
