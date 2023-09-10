import { useMotionValue, useMotionValueEvent } from "framer-motion"

export default function useWidthResize<T extends HTMLElement>(defaultWidth: number) {
  const dragX = useMotionValue(0)
  const target = useRef<T | null>(null)

  useMotionValueEvent(dragX, "change", (x) => {
    if (target.current) target.current.style.width = `${x + defaultWidth}px`
  })

  return { target, dragX }
}
