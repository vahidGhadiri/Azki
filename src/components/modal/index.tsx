import type { FC, RefObject } from "react"

import type { AbstractedHeaderSizeProps } from "../_Abstractions"
import { AbstractedHeader } from "../_Abstractions"
import { Portal } from "../_Portal"

import { composeClassNames } from "../../utils"
import type { IconProps } from "../Icon"
import { Icon } from "../Icon"
import { useModal } from "./hooks/use-modal"

export interface ModalHeaderProps {
  size?: AbstractedHeaderSizeProps
  className?: string
  icon?: IconProps
  title: string
}

export interface ModalProps {
  headerProps?: ModalHeaderProps | JSX.Element
  initialFocusRef?: RefObject<HTMLElement>
  onAfterClose?: VoidFunction
  isBackDropClosable?: boolean
  animationDuration?: number
  isFullScreen?: boolean
  onClose?: VoidFunction
  nodeSelector?: string
  children: JSX.Element
  footer?: JSX.Element
  className?: string
  isOpen: boolean
}


export const Modal: FC<ModalProps> = ({
  isBackDropClosable = true,
  animationDuration = 300,
  isFullScreen = true,
  nodeSelector,
  onAfterClose,
  headerProps,
  className,
  children,
  onClose,
  footer,
  isOpen,
}) => {
  const { modalState, ref } = useModal({
    isOpen,
    onAfterClose,
    animationDuration,
  })


  const mainClassNames = composeClassNames([
    "dimmer flex items-center justify-center w-full h-full select-none px-16",
    `duration-${animationDuration}`,
    "transition-opacity  ease-in-out",
    modalState === "ENTER" ? "opacity-100" : "opacity-0",
    modalState === "EXIT" ? "pointer-events-none" : "",
  ])

  const innerClassNames = composeClassNames([
    isFullScreen ? "h-full" : "rounded-xs m-4 pt-6 px-12 max-h-[calc(100vh-44px)]",
    "bg-neutral-white p-4 w-full relative overflow-hidden",
    " duration-300 ease-in-out",
    className,
  ])

  const isModalHeaderProps = (props: ModalHeaderProps | JSX.Element): props is ModalHeaderProps => {
    return (props as ModalHeaderProps).title !== undefined
  }

  const renderHeader = () => {
    if (!headerProps) return null

    if (isModalHeaderProps(headerProps)) {
      const { icon, title, size } = headerProps
      return (
        <AbstractedHeader
          endElement={<Icon name="ExitCancel" color="greyLight" mode="filled" size={22} onClick={onClose} />}
          title={{ content: title }}
          startIcon={icon}
          size={size}
        />
      )
    }
    return headerProps
  }

  return (
    <Portal elementType="elfo-modal" nodeSelector={nodeSelector}>
      <div
        onClick={isBackDropClosable ? onClose : undefined}
        className={mainClassNames}
        aria-modal="true"
        role="dialog"
        ref={ref}
      >
        <div onClick={(e) => e.stopPropagation()} className={innerClassNames}>
          {renderHeader()}
          <div className="overflow-y-auto max-h-[calc(100vh-120px)] p-4">
            {children}
          </div>
          <div className="m-4">{footer}</div>
        </div>
      </div>
    </Portal>
  )
}


