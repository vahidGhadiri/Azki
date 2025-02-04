import { ReactNode } from "react"
import AbstractedHeader, { AbstractedHeaderProps } from "../_abstractions/abstracted-header"
import { composeClassNames } from "@utils"
import landingImage from "../../assets/images/car-green.svg"

interface LayoutProps {
  headerProps?: AbstractedHeaderProps
  illustration?: boolean
  children: ReactNode
  className?: string
}

const AppLayout = ({ children, className, headerProps }: LayoutProps) => {
  return (
    <div>
      {headerProps && <AbstractedHeader {...headerProps} />}
      <div className={composeClassNames(["w-screen h-screen flex flex-col md:flex-row justify-center items-center", className])}>
        <div className="w-full md:w-1/2 flex justify-center items-center relative z-20 p-16 mt-64">
          {children}
        </div>
        <div className="w-full md:w-2/3 h-full relative flex justify-center items-center">
          <div className="absolute bottom-0 md:bottom-0 md:left-0 bg-primitive-green-200 h-2/5 md:h-full md:w-[55%]"></div>
          <img
            src={landingImage}
            alt="landing-image"
            className="object-contain z-10 w-full md:w-auto"
          />
        </div>
      </div>
    </div>
  )
}


export default AppLayout
