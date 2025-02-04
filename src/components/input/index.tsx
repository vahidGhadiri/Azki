import type { ChangeEventHandler, ClipboardEventHandler, FocusEventHandler, KeyboardEventHandler, ReactElement, ReactNode, FocusEvent } from "react";
import { forwardRef, useState } from "react";

import { composeClassNames } from "@utils";
import type { IconProps } from "@components";
import { Icon } from "@components";

export type InputMode = "numeric" | "none" | "text" | "tel" | "email" | "url" | "decimal" | "search";
export type InputAutoComplete = "off" | "username" | "one-time-code" | "current-password";
export type InputType = "text" | "password" | "number" | "tel";
export type InputDirection = "rtl" | "ltr";

export interface InputProps {
  autoComplete?: InputAutoComplete;
  inputMode?: InputMode;
  dir?: InputDirection;
  startIcon?: IconProps;
  type?: InputType;
  containerClassName?: string;
  endElement?: ReactElement;
  value?: string | number;
  children?: ReactNode;
  placeholder?: string;
  description?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  autoFocus?: boolean;
  isSuccess?: boolean;
  hasError?: boolean;
  maxLength?: number;
  className?: string;
  label?: string;
  name?: string;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onPaste?: ClipboardEventHandler<HTMLInputElement>;
  onKeyUp?: KeyboardEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onClick?: VoidFunction;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  containerClassName,
  isReadOnly = false,
  inputMode = "text",
  autoFocus = false,
  autoComplete = "off",
  type = "text",
  placeholder,
  description,
  endElement,
  isDisabled,
  className,
  hasError,
  isSuccess,
  maxLength,
  startIcon,
  children,
  value,
  label,
  name,
  dir,
  onKeyDown,
  onChange,
  onPaste,
  onFocus,
  onKeyUp,
  onClick,
  onBlur,
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const labelClassNames = composeClassNames([
    isFocused || placeholder ? "right-8 bg-neutral-white" : "right-32",
    "absolute bg-white w-fit transition-all duration-200 transform  z-10 flex px-6 mr-4 select-none ",
    (isFocused || value || placeholder) ? "-top-6 text-xs text-neutral-700" : "top-[18px] text-sm text-neutral-black",
  ]);

  const descriptionClassNames = composeClassNames([
    !hasError && !isSuccess && "text-neutral-700",
    isSuccess && "text-semantic-success-dark",
    hasError && "text-semantic-error-medium",
    "text-caption-2 mx-4 select-none",
  ]);

  const placeholderClassNames = composeClassNames([
    isDisabled ? "placeholder:text-neutral-500" : "placeholder:text-neutral-600",
    "placeholder:text-neutral-600"
  ]);

  const wrapperClassNames = composeClassNames([
    "box-border rounded-m pr-16 py-12 flex w-full border max-h-full items-center h-56 bg-neutral-white default-transition select-none",
    hasError ? "semantic-error-medium" : !isDisabled && !isReadOnly && "focus-within:border-neutral-black",
    isReadOnly && "border border-neutral-400",
    !hasError && "border-neutral-500",
    isDisabled && "text-neutral-600",

  ]);

  const inputClassNames = composeClassNames([
    "text-body-4 bg-neutral-white w-full mr-4 outline-none select-none",
    isDisabled ? "text-neutral-600" : "text-neutral-black",
  ]);

  const innerClassNames = composeClassNames([
    placeholderClassNames,
    inputClassNames,
    className,
  ]);

  return (
    <div className={containerClassName}>
      <label className="relative">
        {label && <span className={labelClassNames}>{label}</span>}
        <div className={wrapperClassNames}>
          {startIcon && "name" in startIcon && <span className="flex-shrink-0">
            <Icon {...startIcon} color={isDisabled ? "greyLighter" : startIcon.color} />
          </span>}
          <input
            autoComplete={autoComplete}
            className={innerClassNames}
            placeholder={placeholder}
            inputMode={inputMode}
            readOnly={isReadOnly}
            autoFocus={autoFocus}
            disabled={isDisabled}
            maxLength={maxLength}
            value={value}
            name={name}
            type={type}
            dir={dir}
            ref={ref}
            onClick={() => !isDisabled && onClick?.()}
            onKeyDown={onKeyDown}
            onFocus={handleFocus}
            onChange={onChange}
            onBlur={handleBlur}
            onKeyUp={onKeyUp}
            onPaste={onPaste}
          />
          {endElement && <span className="flex-shrink-0">{endElement}</span>}
        </div>
      </label>
      {description && !isDisabled && (
        <span className="mt-4 mx-16 flex justify-between items-center select-none">
          <span >
            {hasError && !isSuccess && <Icon name="AlertCircle" size={20} mode="filled" color="error" />}
            {isSuccess && !hasError && <Icon name="Check" size={20} mode="filled" color="success" />}
            <span className={descriptionClassNames}>
              {description}
            </span>
          </span>
          <span>{children}</span>
        </span>
      )}
    </div>
  );
});


export default Input