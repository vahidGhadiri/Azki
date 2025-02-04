import * as React from "react";
import type { SVGProps } from "react";
const SvgArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 444.5 444.5"
    {...props}
  >
    <path
      d="M213.1 222.4 351.9 83.7c7-7 10.6-15.7 10.6-25.8 0-10.2-3.5-18.8-10.6-25.8l-21.4-21.4c-7-7-15.7-10.6-25.8-10.6s-18.8 3.5-25.8 10.6L92.6 196.4c-7 7-10.6 15.7-10.6 25.8S85.5 241 92.6 248l186.2 186c7 7 15.7 10.6 25.8 10.6s18.8-3.5 25.8-10.6l21.4-21.4c7-7 10.6-15.6 10.6-25.7s-3.5-18.7-10.6-26z"
      style={{
        fill: "#25b79b",
      }}
    />
  </svg>
);
export default SvgArrow;
