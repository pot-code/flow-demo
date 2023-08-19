import * as RadixToast from "@radix-ui/react-toast"
import { produce } from "immer"
import { createContext, useContext, useMemo } from "react"
import Toast from "./toast"
import { MessageType } from "./types"

interface MessageConfig {
  description?: string
  duration?: number
}

interface Message extends MessageConfig {
  id: string
  title: string
  type?: MessageType
}

interface ToastContextState {
  info: (title: string, config?: MessageConfig) => void
  success: (title: string, config?: MessageConfig) => void
  warning: (title: string, config?: MessageConfig) => void
  error: (title: string, config?: MessageConfig) => void
}

const Context = createContext<ToastContextState | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([])

  const onMessageClose = useCallback((id: string) => {
    setMessages(produce((draft) => draft.filter((message) => message.id !== id)))
  }, [])

  const appendMessage = useCallback((type: MessageType, title: string, config?: MessageConfig) => {
    setMessages(
      produce((draft) => {
        draft.push({
          ...config,
          type,
          title,
          id: Date.now().toString(),
        })
      }),
    )
  }, [])

  const value = useMemo(
    () => ({
      info: (title: string, config?: MessageConfig) => {
        appendMessage("info", title, config)
      },
      success: (title: string, config?: MessageConfig) => {
        appendMessage("success", title, config)
      },
      warning: (title: string, config?: MessageConfig) => {
        appendMessage("warning", title, config)
      },
      error: (title: string, config?: MessageConfig) => {
        appendMessage("error", title, config)
      },
    }),
    [appendMessage],
  )

  return (
    <Context.Provider value={value}>
      <RadixToast.Provider>
        {children}
        {messages.map((message) => (
          <Toast
            key={message.id}
            title={message.title}
            description={message.description}
            type={message.type}
            duration={message.duration}
            onClose={() => onMessageClose(message.id)}
          />
        ))}
        <RadixToast.Viewport className="fixed right-0 bottom-0 flex flex-col gap-unit-sm w-[372px] p-unit-md" />
      </RadixToast.Provider>
    </Context.Provider>
  )
}

export function useToast() {
  const context = useContext(Context)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
