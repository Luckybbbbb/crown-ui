import type { CSSProperties, ImgHTMLAttributes } from "react";
import { illustrations, type IllustrationName } from "./art";
export { illustrations, type IllustrationName } from "./art";
export interface GameIllustrationProps
  extends Omit<
    ImgHTMLAttributes<HTMLImageElement>,
    "src" | "width" | "height"
  > {
  name: IllustrationName;
  size?: number;
}
export function GameIllustration({
  name,
  size = 80,
  alt = "",
  className = "",
  style,
  ...props
}: GameIllustrationProps) {
  const source = illustrations[name];
  if (!source) return null;
  return (
    <img
      src={source}
      alt={alt}
      draggable={false}
      decoding="async"
      className={`cr-illustration ${className}`}
      style={{ "--cr-art-size": `${size}px`, ...style } as CSSProperties}
      {...props}
    />
  );
}
