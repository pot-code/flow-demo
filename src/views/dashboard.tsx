import { Button, Input, Navbar, NavbarBrand, NavbarContent, Tab, Tabs, User } from "@nextui-org/react"
import { GridFour, List, MagnifyingGlass, Plus } from "@phosphor-icons/react"
import FlowCard from "@/features/dashboard/flow-card"

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
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
      <main className="flex h-full">
        <div className="h-full w-[320px] border-r-1" />
        <div className="flex-1 p-unit-lg">
          <section className="flex mb-unit-lg justify-between">
            <Button color="primary" startContent={<Plus />}>
              New Graph
            </Button>
            <div className="flex gap-unit-sm">
              <Input variant="bordered" startContent={<MagnifyingGlass />} />
              <Tabs color="default" variant="light">
                <Tab key="list" title={<List />} />
                <Tab key="grid" title={<GridFour />} />
              </Tabs>
            </div>
          </section>
          <section className="grid grid-cols-3 laptop:grid-cols-4 monitor-2k:grid-cols-6 monitor-4k:grid-cols-8 gap-unit-md">
            <FlowCard name="demo" updatedAt="2022-01-01 11:01:00" />
            <FlowCard name="demo" updatedAt="2022-02-01 12:11:00" />
            <FlowCard name="demo" updatedAt="2022-03-01 17:23:00" />
            <FlowCard name="demo" updatedAt="2022-04-01 13:08:00" />
            <FlowCard name="demo" updatedAt="2022-05-01 18:09:00" />
            <FlowCard name="demo" updatedAt="2022-06-01 14:10:00" />
            <FlowCard name="demo" updatedAt="2022-07-01 10:40:00" />
            <FlowCard name="demo" updatedAt="2022-08-01 11:37:00" />
          </section>
        </div>
      </main>
    </div>
  )
}
