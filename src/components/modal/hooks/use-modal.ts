import { useState, useEffect, useRef } from "react"
import { useIntersectionObserver } from "../../../hooks"

type ModalState = "BEFORE_ENTER" | "ENTER" | "EXIT"

export const useModal = ({ isOpen, onAfterClose, animationDuration }: {
  onAfterClose?: VoidFunction
  animationDuration: number
  isOpen: boolean
}) => {
  const [modalState, setModalState] = useState<ModalState>("BEFORE_ENTER")
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const { ref, isIntersecting } = useIntersectionObserver({
    onChange: () => {
      if (isIntersecting && modalState === "BEFORE_ENTER") {
        setModalState("ENTER")
      }
    },
  })

  useEffect(() => {
    if (isOpen) {
      setModalState("ENTER")
    } else if (modalState === "ENTER") {
      setModalState("EXIT")
      timeoutRef.current = setTimeout(() => {
        if (onAfterClose) onAfterClose()
        setModalState("BEFORE_ENTER")
      }, animationDuration)
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [isOpen, modalState, onAfterClose, animationDuration])

  return { modalState, ref }
}
