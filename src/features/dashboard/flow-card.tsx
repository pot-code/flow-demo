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
import { DotsThree } from "@phosphor-icons/react"

export interface FlowCardProps {
  id: string
  name: string
  createdAt: string
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export default memo(({ id, name, createdAt, onEdit, onDelete }: FlowCardProps) => {
  return (
    <Card isHoverable shadow="sm">
      <CardHeader className="justify-between">
        <p>{name}</p>
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light">
              <DotsThree />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem key="edit" onClick={() => onEdit?.(id)}>
              Edit
            </DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger" onClick={() => onDelete?.(id)}>
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
