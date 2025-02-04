import type { FC, MouseEventHandler, ReactElement } from "react"

import type { IconProps } from "@components"
import { composeClassNames } from "@utils"
import { Icon } from "@components"

export type AbstractedHeaderSizeProps = "large" | "small"

interface AbstractedHeaderTitleProps {
  content: string | JSX.Element
  className?: string
}

export interface AbstractedHeaderProps {
  onClick?: MouseEventHandler<HTMLDivElement>
  endElement?: ReactElement | ReactElement[]
  size?: AbstractedHeaderSizeProps | number
  startIcon?: Omit<IconProps, "size">
  title?: AbstractedHeaderTitleProps
  className?: string
}

const AbstractedHeader: FC<AbstractedHeaderProps> = ({ startIcon, endElement, size = "small", className, title, onClick }) => {

  const titleSizeClassNames: { [key in AbstractedHeaderSizeProps]: string } = {
    large: "text-heading-5",
    small: "text-heading-6 "
  }

  const startIconSize = {
    large: 18,
    small: 15
  }

  const titleClassNames = composeClassNames(["text-neutral-black ", title.className, titleSizeClassNames[size]])

  return (
    <div className={composeClassNames(["flex justify-between items-center fixed left-0 right-0 ", className])}>
      {startIcon && <Icon size={startIconSize[size]} {...startIcon} />}
      {title && <span className={titleClassNames} onClick={onClick}>{title.content}</span>}
      {endElement}
    </div>
  )
}


export default AbstractedHeader