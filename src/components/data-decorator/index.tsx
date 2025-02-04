import type { MouseEventHandler, ReactElement, ReactNode } from "react"
import type { QueryStatus } from "@tanstack/react-query"
import SpinnerLoading from "../spinner-loading"

export interface ErrorProps {
  onClick: MouseEventHandler<HTMLButtonElement>
  image?: ReactElement
  isFullPage?: boolean
  className?: string
  title?: string
}

interface DataDecoratorProps<BlockerDataType> {
  status: QueryStatus | QueryStatus[]
  renderLoader?: () => JSX.Element
  renderError?: () => JSX.Element
  blocker?: BlockerDataType
  children?: ReactNode
}

const DataDecorator = <BlockerDataType,>({
  renderLoader = () => <SpinnerLoading />,
  renderError = () => <div>Error...</div>,
  children,
  status
}: DataDecoratorProps<BlockerDataType>) => {
  const isSuccess = Array.isArray(status) ? status.every((item) => item === "success") : status === "success"
  const isLoading = Array.isArray(status) ? status.some((item) => item === "loading") : status === "loading"
  const isError = Array.isArray(status) ? status.some((item) => item === "error") : status === "error"


  return (
    <>
      {!isError && isLoading && renderLoader()}
      {isError && !isLoading && renderError()}
      {isSuccess && children}
    </>
  )
}

export default DataDecorator
