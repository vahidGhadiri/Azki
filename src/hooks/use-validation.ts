import { useRef, useState, useCallback } from 'react'
import type { MessageDescriptor } from 'react-intl'

import { useContent } from '@hooks'

export type ValidationObject = {
  invalidErrorMessage?: MessageDescriptor
  blankErrorMessage?: MessageDescriptor
  value?: string
  regex: RegExp
  type: string
}

const initialState = { status: undefined as boolean | undefined, errorMsg: '' }

export type UseValidationType = readonly [
  { status: boolean | undefined, errorMsg: string },
  (value: string) => boolean,
  VoidFunction
]

const useValidation = (...validationObjects: ValidationObject[]): UseValidationType => {
  const [validationState, setValidationState] = useState(initialState)
  const { content } = useContent()

  const ref = useRef<ValidationObject[]>(validationObjects)

  const validate = useCallback(
    (value: string): boolean => {
      let validationStatus = true
      let validationError = ''

      for (const validationObject of ref.current) {
        if (!value && validationObject.blankErrorMessage) {
          validationStatus = false
          validationError = content(validationObject.blankErrorMessage)
          break
        }

        if (value && !validationObject.regex.test(value)) {
          validationStatus = false
          validationError = validationObject.invalidErrorMessage
            ? content(validationObject.invalidErrorMessage)
            : 'Invalid value'
          break
        }
      }

      setValidationState({ status: validationStatus, errorMsg: validationError })
      return validationStatus
    },
    [content],
  )

  const reset = useCallback(() => setValidationState(initialState), [])

  return [
    validationState,
    validate,
    reset
  ] as const
}

export default useValidation
