import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  Tab,
  Tabs,
  User,
} from "@nextui-org/react"
import { GridFour, List, MagnifyingGlass, Plus } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import LoadingModal from "@/components/loading-modal"
import FlowList from "@/features/dashboard/flow-list"
import useDashboard from "@/features/dashboard/use-dashboard"
import useWidthResize from "@/features/dashboard/use-width-resize"

const defaultSidebarWidth = 302

export default function Dashboard() {
  const { dragX, target } = useWidthResize<HTMLDivElement>(defaultSidebarWidth)
  const { isCreatingFlow, isLoggingOut, createFlow, onLogout } = useDashboard()

  return (
    <div className="flex flex-col h-screen">
      <Navbar isBordered>
        <NavbarBrand>流程设计器</NavbarBrand>
        <NavbarContent justify="end">
          <Dropdown>
            <DropdownTrigger>
              <User
                className="cursor-pointer"
                name="pot code"
                description="Frontend Dev"
                avatarProps={{
                  src: "https://avatars.githubusercontent.com/u/17687881?v=4",
                }}
              />
            </DropdownTrigger>
            <DropdownMenu variant="flat">
              <DropdownItem key="settings">设置</DropdownItem>
              <DropdownItem key="logout" className="text-danger" color="danger" onClick={onLogout}>
                注销
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
      <main className="flex h-full relative">
        <div ref={target} className="h-full border-r-1 border-divider" style={{ width: defaultSidebarWidth }} />
        <motion.div
          style={{ left: defaultSidebarWidth - 2, x: dragX }}
          className={`
          absolute h-full p-[2px] box-content transition-colors duration-0
          hover:bg-primary-200 hover:cursor-col-resize hover:delay-300
          active:bg-primary-400 active:delay-0
          `}
          drag="x"
          dragElastic={0}
          dragMomentum={false}
          onDragStart={() => {
            document.body.style.cursor = "col-resize"
          }}
          onDragEnd={() => {
            document.body.style.cursor = ""
          }}
          dragConstraints={{ left: 0, right: 100 }}
        />
        <div className="flex-1 p-unit-lg">
          <section className="flex mb-unit-lg justify-between">
            <Button color="primary" startContent={<Plus />} onClick={createFlow}>
              新建流程
            </Button>
            <div className="flex gap-unit-sm">
              <Input variant="bordered" startContent={<MagnifyingGlass />} />
              <Tabs color="default" variant="light">
                <Tab defaultChecked key="grid" title={<GridFour />} />
                <Tab key="list" title={<List />} />
              </Tabs>
            </div>
          </section>
          <FlowList />
        </div>
      </main>
      <LoadingModal title="创建中" loading={isCreatingFlow} />
      <LoadingModal title="注销中" loading={isLoggingOut} />
    </div>
  )
}
