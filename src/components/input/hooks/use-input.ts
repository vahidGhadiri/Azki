import { useState, useEffect, useRef } from "react"

export const useInput = (initialValue: unknown, maxLength?: number) => {
  const [inputValue, setInputValue] = useState<string>(initialValue?.toString() || "")
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const newValue = initialValue?.toString() || ""
    if (newValue !== inputValue) {
      setInputValue(newValue)
    }
  }, [initialValue, inputValue])

  const onClear = () => {
    setInputValue("")
    if (ref.current) {
      ref.current.value = ""
      ref.current.focus()
    }
  }

  return {
    inputValue,
    setInputValue,
    ref,
    onClear,
    maxLength,
  }
}
