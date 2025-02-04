import * as React from 'react';
import type { SVGProps } from 'react';
const SvgCancel = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#8F8F8F"
      fillRule="evenodd"
      d="M18.707 17.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 1.414-1.414L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCancel;
