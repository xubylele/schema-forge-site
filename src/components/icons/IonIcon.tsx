import type { ImgHTMLAttributes } from "react";

type IonIconProps = {
  /** Icon data URL from `ionicons/icons` (e.g. `arrowDown`, `arrowForward`) */
  src: string;
  size?: number;
  className?: string;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;

/**
 * Renders an ionicon (from the `ionicons` package) as an image.
 * Import icons from `ionicons/icons` and pass the data URL as `src`.
 */
export function IonIcon({
  src,
  size = 24,
  className = "",
  style,
  ...rest
}: IonIconProps) {
  return (
    <img
      src={src}
      alt=""
      role="presentation"
      width={size}
      height={size}
      className={className}
      style={{ ...style, width: size, height: size }}
      {...rest}
    />
  );
}
