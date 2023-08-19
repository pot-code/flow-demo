import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { CheckCircle, Info, WarningCircle, XCircle } from "@phosphor-icons/react"
import * as RadixToast from "@radix-ui/react-toast"
import { MessageType } from "./types"

import classes from "./toast.module.css"

export interface ToastProps {
  title: string
  description?: string
  type?: MessageType
  duration?: number
  onClose: () => void
}

const animationDuration = 200

export default memo<ToastProps>(({ title, description, type = "info", duration = 3000, onClose }) => {
  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) setTimeout(onClose, animationDuration)
    },
    [onClose],
  )

  return (
    <RadixToast.Root
      className={classes.toast}
      style={{
        animationDuration: `${animationDuration}ms`,
      }}
      duration={duration}
      onOpenChange={onOpenChange}
    >
      <Card>
        <CardHeader className="gap-unit-sm">
          {(() => {
            switch (type) {
              case "success":
                return <CheckCircle className="text-success-400" weight="fill" />
              case "error":
                return <XCircle className="text-danger-400" weight="fill" />
              case "warning":
                return <WarningCircle className="text-warning-400" weight="fill" />
              default:
                return <Info className="text-primary-400" weight="fill" />
            }
          })()}
          <RadixToast.Title className="text-foreground-600">{title}</RadixToast.Title>
        </CardHeader>
        {description && <CardBody className="text-foreground-500 p-unit-sm text-sm">{description}</CardBody>}
      </Card>
    </RadixToast.Root>
  )
})
