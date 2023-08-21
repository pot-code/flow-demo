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
import { Clock, DotsThree } from "@phosphor-icons/react"

export interface FlowCardProps {
  name: string
  updatedAt: string
}

export default function FlowCard({ name, updatedAt }: FlowCardProps) {
  return (
    <Card isHoverable className="max-w-[296px]" shadow="sm">
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
      <CardFooter className="flex text-sm text-foreground-500 justify-between">
        <p>Updated:</p>
        <p className="flex items-center">
          <i className="mr-unit-xs">
            <Clock weight="duotone" />
          </i>
          <span>{updatedAt}</span>
        </p>
      </CardFooter>
    </Card>
  )
}
