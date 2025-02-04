import * as React from 'react';
import type { SVGProps } from 'react';
const SvgAlertCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#C3394D"
      fillRule="evenodd"
      d="M11.995 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m0 4a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V8a1 1 0 0 1 1-1m-1 9a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgAlertCircle;
