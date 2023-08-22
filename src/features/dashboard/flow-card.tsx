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
import { DotsThree } from "@phosphor-icons/react"

export interface FlowCardProps {
  name: string
  createdAt: string
}

export default function FlowCard({ name, createdAt }: FlowCardProps) {
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
            <DropdownItem key="edit">Edit</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <CardFooter>
        <p className="text-sm text-foreground-500">{createdAt}</p>
      </CardFooter>
    </Card>
  )
}
