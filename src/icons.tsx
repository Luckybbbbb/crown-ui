import type { SVGProps } from "react";

const paths = {
  crown: (
    <>
      <path d="m3 7 5 4 4-7 4 7 5-4-2 12H5Z" />
      <path d="M6 16h12" />
    </>
  ),
  sword: (
    <>
      <path d="m14 3 7 0 0 7-12 10-5-5Z" />
      <path d="m3 13 8 8M4 20l3-3M13 11l5-5" />
    </>
  ),
  shield: (
    <>
      <path d="m12 3 9 4-2 10-7 5-7-5L3 7Z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  gem: (
    <>
      <path d="m6 4-4 7 10 11 10-11-4-7Z" />
      <path d="m6 4 6 18 6-18M2 11h20M6 4l6 7 6-7" />
    </>
  ),
  coin: (
    <>
      <ellipse cx="12" cy="12" rx="9" ry="10" />
      <path d="M15 8c-5-3-8 2-3 4s2 7-3 4M12 5v14" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 3h10v7a5 5 0 0 1-10 0ZM8 21h8M12 15v6M7 5H3v3a4 4 0 0 0 4 4M17 5h4v3a4 4 0 0 1-4 4" />
    </>
  ),
  chest: (
    <>
      <path d="M3 10V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v14H3ZM3 10h18M7 3v18M17 3v18" />
      <path d="M10 9h4v6h-4Z" />
    </>
  ),
  star: <path d="m12 2 3 6 7 1-5 5 1 8-6-4-6 4 1-8-5-5 7-1Z" />,
  heart: <path d="M20 5c-4-4-8 2-8 2S8 1 4 5c-6 6 8 16 8 16S26 11 20 5Z" />,
  flame: (
    <path d="M12 2c2 6 8 8 8 14a8 8 0 0 1-16 0c0-4 2-5 4-7 0 4 3 4 3 4S15 10 12 2Z" />
  ),
  bolt: <path d="m14 2-10 12h7l-1 8 10-13h-7Z" />,
  play: <path d="m8 4 13 8-13 8Z" />,
  arrow: <path d="M3 12h18m-7-7 7 7-7 7" />,
  back: <path d="M21 12H3m7-7-7 7 7 7" />,
  chevron: <path d="m9 5 7 7-7 7" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  plus: <path d="M12 4v16M4 12h16" />,
  check: <path d="m4 12 5 5L20 6" />,
  lock: (
    <>
      <rect x="5" y="10" width="14" height="12" rx="3" />
      <path d="M8 10V6a4 4 0 0 1 8 0v4M12 14v4" />
    </>
  ),
  settings: (
    <>
      <path d="m9 3-1 3-4 1 1 4-2 3 3 3v4h5l3 2 3-3 4-1-1-4 2-3-3-3V4h-5Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V5l12-2v13M9 9l12-2" />
      <ellipse cx="5.5" cy="18" rx="3.5" ry="3" />
      <ellipse cx="17.5" cy="16" rx="3.5" ry="3" />
    </>
  ),
  volume: (
    <>
      <path d="M3 9h4l5-5v16l-5-5H3ZM16 8a6 6 0 0 1 0 8M19 4a11 11 0 0 1 0 16" />
    </>
  ),
  spark: (
    <>
      <path d="m12 3 2 7 7 2-7 2-2 7-2-7-7-2 7-2Z" />
      <path d="M20 2v4M18 4h4" />
    </>
  ),
  book: (
    <>
      <path d="M12 5C9 2 3 3 3 3v17s6-1 9 2c3-3 9-2 9-2V3s-6-1-9 2ZM12 5v17" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </>
  ),
  code: <path d="m7 6-6 6 6 6m10-12 6 6-6 6M14 3l-4 18" />,
  copy: (
    <>
      <rect x="8" y="8" width="13" height="14" rx="2" />
      <path d="M16 8V2H2v14h6" />
    </>
  ),
  search: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="m15 15 7 7" />
    </>
  ),
  menu: <path d="M3 5h18M3 12h18M3 19h18" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  flag: (
    <>
      <path d="M5 22V3c6-5 8 5 15 0v11c-7 5-9-5-15 0" />
    </>
  ),
  leaf: (
    <>
      <path d="M21 3C1 0-2 23 10 21S21 3 21 3ZM5 20 16 9" />
    </>
  ),
  home: (
    <>
      <path d="m2 11 10-9 10 9M5 9v13h14V9M10 22v-8h4v8" />
    </>
  ),
  map: (
    <>
      <path d="m2 5 7-3 6 3 7-3v17l-7 3-6-3-7 3ZM9 2v17M15 5v17" />
    </>
  ),
  skull: (
    <>
      <path d="M5 17a10 10 0 1 1 14 0v5H5Z" />
      <circle cx="8" cy="11" r="2" />
      <circle cx="16" cy="11" r="2" />
      <path d="m10 17 2-3 2 3M10 22v-3M14 22v-3" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="7" r="4" />
      <path d="M4 22v-3a8 8 0 0 1 16 0v3" />
    </>
  ),
  refresh: (
    <>
      <path d="M21 3v6h-6M3 21v-6h6M3 9a9 9 0 0 1 16-5M21 15a9 9 0 0 1-16 5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 1v3M12 20v3M1 12h3M20 12h3M4 4l2 2M18 18l2 2M4 20l2-2M18 6l2-2" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 10v7M12 6v1" />
    </>
  ),
} as const;
export type IconName = keyof typeof paths;
export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}
export function Icon({ name, size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
