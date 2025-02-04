import * as React from 'react';
import type { SVGProps } from 'react';
const SvgCancel = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx={12} cy={12} r={11} fill="#8F8F8F" opacity={0.2} />
    <path
      fill="#8F8F8F"
      fillRule="evenodd"
      d="M16.707 15.293a1 1 0 0 1-1.414 1.414L12 13.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L10.586 12 7.293 8.707a1 1 0 0 1 1.414-1.414L12 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414L13.414 12z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCancel;
