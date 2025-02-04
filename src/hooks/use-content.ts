import { useIntl, MessageDescriptor } from "react-intl";
import { useCallback } from "react";

const useContent = () => {
  const intl = useIntl();

  const content = useCallback(
    (descriptor: MessageDescriptor, values?: Record<string, string>): string =>
      intl.formatMessage(descriptor, values),
    [intl]
  );

  return {
    content,
  };
};


export default useContent;
