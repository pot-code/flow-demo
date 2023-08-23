import { Button, Input, Navbar, NavbarBrand, NavbarContent, Tab, Tabs, User } from "@nextui-org/react"
import { GridFour, List, MagnifyingGlass, Plus } from "@phosphor-icons/react"
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion"
import LoadingModal from "@/components/loading-modal"
import FlowList from "@/features/dashboard/flow-list"
import useDashboard from "@/features/dashboard/use-dashboard"

export default function Dashboard() {
  const dragX = useMotionValue(0)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const { isCreatingFlow, createFlow } = useDashboard()

  useMotionValueEvent(dragX, "change", (x) => {
    if (sidebarRef.current) sidebarRef.current.style.width = `${x + 320}px`
  })

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
      <main className="flex h-full relative">
        <div ref={sidebarRef} className="h-full w-[320px]" />
        <motion.div
          drag="x"
          dragElastic={0}
          dragMomentum={false}
          dragConstraints={{ left: -100, right: 100 }}
          transition={{ type: "just" }}
          style={{ left: 320, x: dragX }}
          className={`
          absolute h-full w-[1px] bg-divider right-0
          hover:w-[4px] hover:bg-primary-200 hover:cursor-col-resize
          active:w-[4px] active:bg-primary-400 active:cursor-col-resize
          transition-colors duration-300`}
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
    </div>
  )
}
