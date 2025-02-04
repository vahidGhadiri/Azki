import { ReactNode } from "react"
import AbstractedHeader, { AbstractedHeaderProps } from "../_abstractions/abstracted-header"
import { composeClassNames } from "@utils"


interface LayoutProps {
  headerProps?: AbstractedHeaderProps
  illustration?: boolean
  children: ReactNode
  className?: string
}

const AppLayout = ({ children, className, headerProps }: LayoutProps) => {
  return (
    <div className={composeClassNames(["flex justify-end items-center w-screen h-screen flex-col", className])}>
      {headerProps && <AbstractedHeader {...headerProps} />}
      {children}
    </div>
  )
}


export default AppLayout