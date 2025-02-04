import { FC } from 'react'
import { FormattedMessage, MessageDescriptor } from 'react-intl'

type ContentProps = {
  variant?: React.ElementType
  className?: string
  values?: Record<string, string>
} & MessageDescriptor

const Content: FC<ContentProps> = ({ variant: Component = 'p', className, values, ...props }) => {
  return (
    <Component className={className}>
      <FormattedMessage values={values} {...props} />
    </Component>
  )
}

export default Content
