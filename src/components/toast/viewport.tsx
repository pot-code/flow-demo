export interface ViewportProps {
  children: React.ReactNode
}

export default function Viewport({ children }: ViewportProps) {
  return <div className="fixed right-0 bottom-0 flex flex-col gap-unit-sm w-[372px] p-unit-md z-1">{children}</div>
}
