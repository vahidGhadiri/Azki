import React from "react"

import { translator } from "@utils"

import type { AbstractedInputProps } from "../_abstractions/abstracted-input"
import { AbstractedInput } from "../_abstractions/abstracted-input"
import { useInput } from "./hooks/use-input"
import { Button } from "../button"


export interface InputProps extends AbstractedInputProps {
  hasCounter: boolean
}

export const Input: React.FC<InputProps> = ({
  endElement,
  hasCounter,
  maxLength,
  value,
  ...props
}) => {
  const { inputValue, setInputValue, ref, onClear } = useInput(value, maxLength)

  const clearIcon = inputValue.length ? (
    <Button onClick={onClear} icon={{ name: "Cancel", mode: "filled", color: "greyLight", size: 20 }} isIconOnly mode="tertiary" className="mx-0" />
  ) : (
    endElement
  )

  return (
    <>
      <AbstractedInput
        startIcon={{ name: "Verify", mode: "stroked", size: 20, color: "primary" }}
        onChange={(e) => setInputValue(e.target.value)}
        endElement={clearIcon}
        maxLength={maxLength}
        value={inputValue}
        ref={ref}
        {...props}
      >
        {hasCounter && maxLength && (
          <>
            <span className="text-neutral-700 text-caption-1">{translator(maxLength)} /</span>
            <span className="text-neutral-600 text-caption-1">{translator(inputValue.length)}</span>
          </>
        )}
      </AbstractedInput>
    </>
  )
}