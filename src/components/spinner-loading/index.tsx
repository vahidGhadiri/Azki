import { memo } from "react";
import { composeClassNames } from "../../utils";
import type { FC } from "react";

type Size = "large" | "medium" | "small";
type Speed = "slow" | "normal" | "fast";
type Mode = "overlay" | "inline";
type Color = "brand" | "neutral";

export interface SpinnerLoadingProps {
  isTransparent?: boolean;
  className?: string;
  color?: Color;
  speed?: Speed;
  size?: Size;
  mode?: Mode;
}

const colorClassNames: { [key in Color]: string } = {
  neutral: "text-neutral-600",
  brand: "text-brand-500",
};

const speedClassNames: { [key in Speed]: string } = {
  slow: "animate-spin-slow",
  fast: "animate-spin-fast",
  normal: "animate-spin",
};

const modeClassNames: { [key in Mode]: string } = {
  overlay: "fixed top-0 left-0 w-full h-full flex items-center justify-center z-50",
  inline: "relative z-50",
};

const sizeClassNames: { [key in Size]: number } = {
  medium: 21,
  large: 28,
  small: 14
}

const SpinnerLoading: FC<SpinnerLoadingProps> = memo(({
  isTransparent = true,
  speed = "normal",
  color = "brand",
  size = "medium",
  mode = "inline",
  className,
}) => {
  const mainClassNames = composeClassNames([
    colorClassNames[color],
    speedClassNames[speed],
    modeClassNames[mode],
    className,
  ]);

  return (
    <div className={mainClassNames} aria-label="loading">
      <svg
        className="text-current absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 50 50"
        height={sizeClassNames[size]}
        width={sizeClassNames[size]}
      >
        <circle
          stroke="currentColor"
          strokeWidth="4"
          opacity="0"
          cx="25"
          cy="25"
          r="20"
        />
        {isTransparent ? (
          <circle
            strokeDasharray="40 60"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="6"
            fill="none"
            cx="25"
            cy="25"
            r="20"
          />
        ) : (
          <>
            <circle
              strokeDasharray="50 50"
              strokeLinecap="round"
              strokeWidth="6"
              fill="none"
              cx="25"
              cy="25"
              r="20"
            />
            <circle
              transform="rotate(180 25 25)"
              strokeDasharray="50 50"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="6"
              fill="none"
              cx="25"
              cy="25"
              r="20"
            />
          </>
        )}
      </svg>
    </div>
  );
});

export default SpinnerLoading