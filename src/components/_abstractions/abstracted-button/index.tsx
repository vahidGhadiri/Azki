import { forwardRef, useEffect, useRef, useState } from "react"
import type { ForwardedRef, MouseEventHandler } from "react"

import { SpinnerLoading } from "@components"
import { composeClassNames } from "@utils"
import { useIsTouchable } from "@hooks"

import styles from "./styles.module.scss"

export type AbstractedButtonColor = "brand" | "black" | "white" | "gray"
export type AbstractedButtonMode = "primary" | "secondary" | "tertiary"
export type AbstractedButtonSize = "big" | "medium" | "small"


export interface AbstractedButtonProps {
  type?: "submit" | "reset" | "button" | undefined
  onClick?: MouseEventHandler<HTMLButtonElement>
  color?: AbstractedButtonColor
  size?: AbstractedButtonSize
  mode?: AbstractedButtonMode
  isSubmitLoading?: boolean
  children?: JSX.Element
  isDisabled?: boolean
  className?: string
}

export const AbstractedButton = forwardRef(({
  isSubmitLoading,
  mode = "primary",
  color = "brand",
  isDisabled,
  className,
  children,
  onClick,
}: AbstractedButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const isTouchable = useIsTouchable()
  const [labelWidth, setLabelWidth] = useState<number | null>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (labelRef.current) {
      const { width } = labelRef.current.getBoundingClientRect()
      setLabelWidth(width)
    }
  }, [children])

  const buttonModeClassNames: { [key in AbstractedButtonMode]: string } = {
    primary: composeClassNames(["bg-primitive-green-200  text-neutral-950", !isTouchable && "hover:bg-primitive-teal-200"]),
    secondary: composeClassNames(["bg-transparent border border-primitive-teal-500  text-primitive-teal-500 active:border-primitive-teal-500", !isTouchable && "hover:bg-primitive-teal-800"]),
    tertiary: "bg-transparent text-primitive-teal-200 hover:text-primitive-teal-200 active:text-primitive-teal-200",
  };

  const buttonDisabledClassNames: { [key in AbstractedButtonMode]: string } = {
    secondary: "border border-neutral-500 text-neutral-500",
    primary: "bg-silver-dark text-neutral-600",
    tertiary: "text-neutral-500",
  }

  const buttonLoadingClassNames: { [key in Exclude<AbstractedButtonMode, "tertiary">]: string } = {
    primary: "bg-primitive-green-200 text-neutral-600",
    secondary: "border border-neutral-700",
  };

  const buttonClassName = composeClassNames([
    (isSubmitLoading && buttonLoadingClassNames[mode]) ||
    (isDisabled && buttonDisabledClassNames[mode]) ||
    buttonModeClassNames[mode],
    styles.touchEvent,
    "select-none",
    className,
  ]);

  const onButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!isDisabled && !isSubmitLoading) {
      onClick(event)
    }
  }

  return (
    <button className={buttonClassName} onClick={onButtonClick} disabled={isDisabled} ref={ref} onContextMenu={(event) => event.preventDefault()}>
      {
        isSubmitLoading ?
          <div className="flex items-center  justify-center" style={{ padding: `0 ${labelWidth / 2}px` }}>
            <SpinnerLoading
              isTransparent={mode === "primary" ? false : true}
              color={color === "brand" ? "brand" : "neutral"}
              size="medium"
            />
          </div>
          : <span ref={labelRef}>{children}</span>
      }
    </button >
  )
})
