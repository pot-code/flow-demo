import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import { Crown, FloppyDisk, X } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import useSidebarStore from "@/features/home/use-sidebar-store"
import FlowGraph from "@/features/home/flow-graph"
import DataFlowProvider from "@/features/home/context"

export default function HomeView() {
  const { isOpen, toggleOff } = useSidebarStore()

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar isBordered>
        <NavbarBrand>
          <p className="font-bold">流程设计</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem className="space-x-3">
            <Button color="warning" variant="ghost" startContent={<Crown />}>
              升级
            </Button>
            <Button color="primary" variant="flat" startContent={<FloppyDisk />}>
              保存
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="flex-grow flex">
        <DataFlowProvider>
          <FlowGraph />
        </DataFlowProvider>
        <motion.div className="h-full overflow-x-hidden" animate={{ width: isOpen ? "480px" : "0px" }}>
          <div className="p-3">
            <Button isIconOnly color="default" variant="light" onClick={toggleOff}>
              <X weight="bold" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
