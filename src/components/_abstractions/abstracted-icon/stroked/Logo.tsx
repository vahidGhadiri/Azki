import * as React from "react";
import type { SVGProps } from "react";
const SvgLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" {...props}>
    <g fill="none" fillRule="evenodd" stroke="#25B79B" strokeWidth={2}>
      <rect width={15} height={15} x={1} y={1} rx={2} />
      <path strokeLinecap="round" d="M5 6v4.415" />
    </g>
  </svg>
);
export default SvgLogo;
