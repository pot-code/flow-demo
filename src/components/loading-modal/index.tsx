import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react"

export interface LoadingModalProps {
  loading?: boolean
  title?: string
}

export default function LoadingModal({ title = "loading", loading }: LoadingModalProps) {
  return (
    <Modal hideCloseButton size="xs" isOpen={loading}>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Spinner />
        </ModalBody>
        <ModalFooter className="justify-center text-sm text-gray-500">请稍等...</ModalFooter>
      </ModalContent>
    </Modal>
  )
}
