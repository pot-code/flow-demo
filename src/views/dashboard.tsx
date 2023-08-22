import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarContent,
  Spinner,
  Tab,
  Tabs,
  User,
} from "@nextui-org/react"
import { GridFour, List, MagnifyingGlass, Plus } from "@phosphor-icons/react"
import FlowList from "@/features/dashboard/flow-list"
import useFlowList from "@/features/dashboard/use-flow-list"

export default function Dashboard() {
  const { isLoadingGraph, isCreatingGraph, graphList, createGraph } = useFlowList()

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
            <Button color="primary" startContent={<Plus />} onClick={createGraph}>
              New Flow
            </Button>
            <div className="flex gap-unit-sm">
              <Input variant="bordered" startContent={<MagnifyingGlass />} />
              <Tabs color="default" variant="light">
                <Tab key="list" title={<List />} />
                <Tab key="grid" title={<GridFour />} />
              </Tabs>
            </div>
          </section>
          <FlowList isLoading={isLoadingGraph} data={graphList} />
        </div>
      </main>
      <Modal hideCloseButton size="xs" isOpen={isCreatingGraph}>
        <ModalContent>
          <ModalHeader>创建中</ModalHeader>
          <ModalBody>
            <Spinner />
          </ModalBody>
          <ModalFooter className="justify-center text-sm text-gray-500">请稍等...</ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
