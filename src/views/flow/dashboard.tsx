import { Navbar, NavbarBrand, NavbarContent, User } from "@nextui-org/react"

export interface DashboardProps {}

export default function Dashboard({}: DashboardProps) {
  return (
    <Navbar isBordered>
      <NavbarBrand>流程设计器</NavbarBrand>
      <NavbarContent justify="end">
        <User
          name="Jane Doe"
          description="Product Designer"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
        />
      </NavbarContent>
    </Navbar>
  )
}
