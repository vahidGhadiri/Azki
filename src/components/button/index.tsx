import { AbstractedButton, AbstractedButtonProps, AbstractedButtonSize } from "../_abstractions/abstracted-button"
import { ForwardedRef, forwardRef } from "react"

import type { IconProps } from "@components"
import { composeClassNames } from "@utils"
import { Icon } from "@components"

type IconButton = Omit<IconProps, "onClick">

interface ButtonPropsBase extends AbstractedButtonProps {
  className?: string
  label?: string
}

export type IconOnlyProps = {
  isFullWidth?: never
  startIcon?: never
  isIconOnly: true
  icon: IconButton
  endIcon?: never
}

export type NonIconOnlyProps = {
  startIcon?: IconButton
  isFullWidth?: boolean
  endIcon?: IconButton
  isIconOnly?: false
  icon?: never
}

export type ButtonProps = ButtonPropsBase & (IconOnlyProps | NonIconOnlyProps)

export const Button = forwardRef(({
  isFullWidth = false,
  mode = "primary",
  size = "big",
  isIconOnly,
  className,
  startIcon,
  endIcon,
  label,
  icon,
  onClick,
  ...rest
}: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {

  const buttonSizeClassNames: { [key in AbstractedButtonSize]: string } = {
    small: composeClassNames([(isFullWidth && "w-full px-12") || (isIconOnly && "w-40") || "px-16", "text-caption-1 h-40"]),
    medium: composeClassNames([(isFullWidth && "w-full px-16") || (isIconOnly && "w-48") || "px-24", "text-body-3 h-48"]),
    big: composeClassNames([(isFullWidth && "w-full px-16") || (isIconOnly && "w-56") || "px-20", "text-heading-6 h-56"]),
  }

  const labelClassNames: { [key in AbstractedButtonSize]: string } = {
    medium: "px-6",
    small: "px-4",
    big: "px-8"
  }

  const onlyIconSize: { [key in AbstractedButtonSize]: number } = {
    medium: (isFullWidth || !isIconOnly) ? 18 : 24,
    small: (isFullWidth || !isIconOnly) ? 16 : 24,
    big: (isFullWidth || !isIconOnly) ? 22 : 28,
  }

  const sideIconSizes: { [key in AbstractedButtonSize]: number } = {
    medium: 18,
    small: 16,
    big: 22
  }

  const buttonClassNames = composeClassNames([
    buttonSizeClassNames[size],
    "rounded-s",
    className
  ])

  return (
    <AbstractedButton onClick={onClick} mode={mode} ref={ref} className={buttonClassNames} {...rest}>
      {
        isIconOnly ? <Icon size={onlyIconSize[size]} {...icon} /> :
          <div className="flex justify-between items-center">
            <span>{startIcon && "name" in startIcon && <Icon size={sideIconSizes[size]} {...startIcon} />}</span>
            <span className={labelClassNames[size]}>{label}</span>
            <span>{endIcon && "name" in endIcon && <Icon size={sideIconSizes[size]} {...endIcon} />}</span>
          </div>
      }
    </AbstractedButton>
  )
})


export default Button