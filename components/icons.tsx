import * as React from 'react';

type IconProps = { size?: number };

function Icon({ size = 20, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function Sprout({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M7 20h10" />
      <path d="M12 20v-9" />
      <path d="M12 11c0-3.3-2.7-6-6-6 0 3.3 2.7 6 6 6Z" />
      <path d="M12 11c0-2.8 2.2-5 5-5 0 2.8-2.2 5-5 5Z" />
    </Icon>
  );
}

export function Mic({ size }: IconProps) {
  return (
    <Icon size={size}>
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 10v1a7 7 0 0 0 14 0v-1" />
      <path d="M12 18v4" />
      <path d="M8 22h8" />
    </Icon>
  );
}

export function Wind({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M3 8h9a2.5 2.5 0 1 0-2.5-2.5" />
      <path d="M3 16h13a2.5 2.5 0 1 1-2.5 2.5" />
      <path d="M3 12h16a2.5 2.5 0 1 0-2.5-2.5" />
    </Icon>
  );
}

export function LifeBuoy({ size }: IconProps) {
  return (
    <Icon size={size}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="m4.9 4.9 4.6 4.6" />
      <path d="m14.5 14.5 4.6 4.6" />
      <path d="m19.1 4.9-4.6 4.6" />
      <path d="m9.5 14.5-4.6 4.6" />
    </Icon>
  );
}

export function ArrowLeft({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </Icon>
  );
}

export function Sparkle({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M12 3c.6 4.5 1.5 5.4 6 6-4.5.6-5.4 1.5-6 6-.6-4.5-1.5-5.4-6-6 4.5-.6 5.4-1.5 6-6Z" />
    </Icon>
  );
}

export function Sun({ size }: IconProps) {
  return (
    <Icon size={size}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.9 4.9 1.4 1.4" />
      <path d="m17.7 17.7 1.4 1.4" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.3 17.7-1.4 1.4" />
      <path d="m19.1 4.9-1.4 1.4" />
    </Icon>
  );
}

export function Moon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8Z" />
    </Icon>
  );
}

export function Check({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M20 6 9 17l-5-5" />
    </Icon>
  );
}

export function Send({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
    </Icon>
  );
}
