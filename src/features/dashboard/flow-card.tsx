import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"
import dayjs from "dayjs"
import { DotsThree, Trash } from "@phosphor-icons/react"

export interface FlowCardProps {
  id: string
  name: string
  createdAt: string
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export default memo(({ id, name, createdAt, onEdit, onDelete }: FlowCardProps) => {
  return (
    <Card isHoverable isPressable as="div" shadow="sm" onPress={() => onEdit?.(id)}>
      <CardHeader className="justify-between">
        <p className="flex-1 text-ellipsis overflow-hidden whitespace-nowrap">{name}</p>
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light">
              <DotsThree />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              startContent={<Trash weight="duotone" />}
              onClick={() => onDelete?.(id)}
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <CardFooter>
        <p className="text-sm text-foreground-500">{dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss")}</p>
      </CardFooter>
    </Card>
  )
})
