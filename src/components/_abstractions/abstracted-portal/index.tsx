import { useLayoutEffect, useRef } from "react"
import type { FC, ReactNode } from "react"
import { createPortal } from "react-dom"

interface PortalProps {
  nodeSelector?: string
  elementType?: string
  children: ReactNode
}

export const Portal: FC<PortalProps> = ({ children, nodeSelector, elementType = "elfo-kit" }) => {
  const portalNode = useRef<null | HTMLElement>(document.createElement(elementType))

  useLayoutEffect(() => {
    const containerNode = nodeSelector
      ? document.querySelector(nodeSelector)
      : document.body

    if (!containerNode) {
      new Error(`The node with selector "${nodeSelector}" was not found.`)
    }
    containerNode.appendChild(portalNode.current)
    return () => {
      if (containerNode.contains(portalNode!.current)) {
        containerNode.removeChild(portalNode!.current)
      }
    }
  }, [nodeSelector])

  return portalNode.current ? createPortal(children, portalNode.current) : null
}
