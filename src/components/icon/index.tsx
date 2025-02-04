import type { MouseEventHandler } from "react"
import { forwardRef } from "react"

import * as stroked from "../_abstractions/abstracted-icon/stroked"
import * as filled from "../_abstractions/abstracted-icon/filled"

import { composeClassNames } from "../../utils"
import styles from "./styles.module.scss"

export type IconNames = keyof typeof filled & keyof typeof stroked
const DEFAULT_SIZE = 24

export type IconColor =
  | "greyLighter"
  | "greyMedium"
  | "greyLight"
  | "greyDark"
  | "primary"
  | "success"
  | "error"
  | "alert"
  | "white"
  | "star"
  | "none"

export interface IconProps {
  onClick?: MouseEventHandler<SVGSVGElement>
  mode?: "filled" | "stroked"
  className?: string
  color?: IconColor
  name: IconNames
  size?: number
}

const Icon = forwardRef<SVGSVGElement, IconProps>(({
  size = DEFAULT_SIZE,
  mode = "stroked",
  color = "none",
  className,
  onClick,
  name,
}, ref) => {

  const colorClassNames: { [key in IconColor]: string } = {
    success: "text-semantic-success-dark",
    error: "text-semantic-error-medium",
    alert: "text-semantic-alert-darker",
    greyLighter: "text-neutral-500",
    star: "text-semantic-star-main",
    greyMedium: "text-neutral-700",
    greyLight: "text-neutral-600",
    greyDark: "text-neutral-800",
    white: "text-neutral-white",
    primary: "text-brand-500",
    none: ""
  }
  const SelectedIcon = mode === "stroked" ? stroked[name] : filled[name]
  return (
    <SelectedIcon
      className={composeClassNames([styles.colored, colorClassNames[color], className])}
      onClick={onClick}
      height={size}
      width={size}
      ref={ref}
    />
  )
})


export default Icon