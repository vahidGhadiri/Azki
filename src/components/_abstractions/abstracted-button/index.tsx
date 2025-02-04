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

  const buttonModeClassNames: {
    [key in AbstractedButtonMode]: Partial<{ [key in AbstractedButtonColor]: string }>
  } = {
    primary: {
      black: composeClassNames(["bg-gradient-to-t from-neutral-grd-dark-start to-neutral-grd-dark-end text-neutral-white active:from-neutral-black active:to-neutral-black", !isTouchable && "hover:from-neutral-800 hover:to-neutral-800"]),
      brand: composeClassNames(["bg-gradient-to-t from-brand-grd-main-start to-brand-grd-main-end active:from-brand-600 active:to-brand-600 text-neutral-white", !isTouchable && "hover:from-brand-500 hover:to-brand-500"]),
      gray: composeClassNames(["bg-silver-medium text-neutral-black active:bg-silver-darker", !isTouchable && "hover:bg-silver-dark"])
    },
    secondary: {
      white: composeClassNames(["bg-transparent border border-neutral-white text-neutral-white active:bg-alpha-white-20", !isTouchable && "hover:bg-alpha-white-10"]),
      black: composeClassNames(["bg-transparent border border-neutral-black text-neutral-black active:bg-neutral-400", !isTouchable && "hover:bg-silver-light"]),
      gray: composeClassNames(["bg-transparent border border-neutral-500 text-neutral-700 active:bg-silver-medium", !isTouchable && "hover:bg-silver-light"]),
      brand: composeClassNames(["bg-transparent border border-brand-500 text-brand-500 active:bg-brand-light", !isTouchable && "hover:bg-brand-100"])
    },
    tertiary: {
      brand: "bg-transparent text-brand-500 hover:text-brand-500 active:text-brand-600",
      gray: "bg-transparent text-neutral-700 active:text-neutral-800",
      black: "bg-transparent text-neutral-black text-neutral-800",
      white: "text-neutral-white"
    }
  };

  const buttonDisabledClassNames: { [key in AbstractedButtonMode]: string } = {
    secondary: "border border-neutral-400 text-neutral-500",
    primary: "bg-silver-dark text-neutral-600",
    tertiary: "text-neutral-500",
  }

  const buttonLoadingClassNames: { [key in Exclude<AbstractedButtonMode, "tertiary">]: string } = {
    primary: "bg-silver-dark text-neutral-600",
    secondary: "border border-neutral-700",
  };

  const buttonClassName = composeClassNames([
    (isSubmitLoading && buttonLoadingClassNames[mode]) ||
    (isDisabled && buttonDisabledClassNames[mode]) ||
    buttonModeClassNames[mode][color],
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
          <div className="flex items-center justify-center" style={{ padding: `0 ${labelWidth / 2}px` }}>
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
