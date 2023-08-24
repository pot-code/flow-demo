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
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion"
import LoadingModal from "@/components/loading-modal"
import FlowList from "@/features/dashboard/flow-list"
import useDashboard from "@/features/dashboard/use-dashboard"

const sidebarWidth = 304

export default function Dashboard() {
  const dragX = useMotionValue(0)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const { isCreatingFlow, isLoggingOut, createFlow, onLogout } = useDashboard()

  useMotionValueEvent(dragX, "change", (x) => {
    if (sidebarRef.current) sidebarRef.current.style.width = `${x + sidebarWidth}px`
  })

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
        <div ref={sidebarRef} className="h-full border-r-1" style={{ width: sidebarWidth }} />
        <motion.div
          style={{ left: sidebarWidth - 2, x: dragX }}
          className={`
          absolute h-full p-[2px] box-content transition-colors duration-0
          hover:bg-primary-200 hover:cursor-col-resize hover:delay-300
          active:bg-primary-400 active:cursor-col-resize active:delay-0
          `}
          drag="x"
          dragElastic={0}
          dragMomentum={false}
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
                <Tab key="list" title={<List />} />
                <Tab key="grid" title={<GridFour />} />
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
