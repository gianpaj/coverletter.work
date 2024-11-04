'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export function IconLogo({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 590 590"
      fill="currentColor"
      className={cn('size-4', className)}
      {...props}
    >
      <path
        fill="none"
        stroke="curentColor"
        strokeWidth=".3"
        d="M263.5 466.5c-10.7-3.6-31.6 3.7-15.8 13.8a55 55 0 0 0 30.8 10.2c9.4 4.6 30-3.5 15.2-13.2-9.1-6-20.1-8.5-30.2-10.8Z"
      />
      <path
        fill="curentColor"
        d="M401.5 71.5c-3 1.6-9.1 1.7-12 0-31-5.6-59.3-21.2-92-21-33.3-1-65 5.6-94.3 18.7C121.5 106.3 77.8 197 78.5 283.5v16a254 254 0 0 0 33.7 126.3c53.6 101.4 198 131.2 289.6 67 10.2-6.4 20.8-22.1 34-13.6 13 7 14 22 19.4 33.6 19.3 10.6 13.5-22 14.3-33.3v-106h-19c-3.8 46.8-36.2 89-76.8 112.2-42.2 24-106 30.5-140.9-10.5-62.9-86.7-59.6-210.4-33.2-310.6 13.2-43.1 45.4-91.6 95.9-92.1 2.6-1.6 8.5-1.7 11 0 33.9.6 64.5 21.8 84 49 19.3-14.3 38.7-29 61-38v-50h-19c4.5 19.4-12 38-31 38Z"
      />
      <path fill="curentColor" d="M295.5 72.5h11c-2.5-1.7-8.4-1.6-11 0Z" />
      <path fill="curentColor" d="M401.5 71.5h-12c2.9 1.7 9 1.6 12 0Z" />
      <path
        fill="curentColor"
        d="M303.5 312.5v22c-.5 2.2.7 4 1 6 44.1-84.9 91.7-191 191.3-223.7 18 0 13.5-22.5 15.7-35.3-65.8 6.2-122.1 51-161.7 103.3-14.8 14.8 1.4 38.6-9.3 54.7-5-9.3-3.4-22.3-6-33-22.5 30.3-30.4 68.1-31 106Z"
      />
      <path
        fill="curentColor"
        d="M418.5 229.5c-.8 1.1-2.5 2-4 2 .6-1.8 2.6-2.1 4-3 13.7-9 29.7-13.4 44.7-18.3 15.9-27 32.3-54.4 40.3-84.7-101 27-148 134.3-188 220 24.5-4.5 49.7-19 75.3-8.3 8.2-4.9 11.3-19.5 15.7-28.7-17.6-3-35.7-.2-52 5a82 82 0 0 1 59-15c3.4-9.9 9.7-18.7 14-28-21.4-.7-41 6.3-60 14a111.2 111.2 0 0 1 66-23c5.8-13.7 15.7-25.6 22-39-13-.5-24.9 4-37 7Z"
      />
      <path
        fill="curentColor"
        d="M418.5 229.5s-.2-.9 0-1c-1.4.9-3.4 1.2-4 3 1.5 0 3.2-.9 4-2Z"
      />
      <path fill="curentColor" d="M78.5 299.5v-16a26.4 26.4 0 0 0 0 16Z" />
      <path fill="curentColor" d="M303.5 334.5v-22a49 49 0 0 0 0 22Z" />
      <path
        fill="curentColor"
        d="M297.5 339.5c-11.5 15-20.1 32.7-36 45 4.3 21.3 3.2 44.4 5 66 3.3-10.7 8.1-20.8 11.7-31.3 4.5-10.5 9.3-20 6.6-31.4 10.4-14.6 21 11.6 4.7 10.7-5.6 19.8-15 38.3-21 58 9.3-8.3 16-19 25.8-27.3 6.4-11.3 25.3-13.8 24.2-27.7-.4-16.2 3.3-31.3 5-47-10.8 1.3-24-3.5-26-15Z"
      />
      <path
        fill="curentColor"
        d="M263.5 466.5c-10.7-3.6-31.6 3.7-15.8 13.8a55 55 0 0 0 30.8 10.2c9.4 4.6 30-3.5 15.2-13.2-9.1-6-20.1-8.5-30.2-10.8Z"
      />
      <path
        fill="curentColor"
        d="M464.5 531.5c-13.8-1.2-17 23.1-4 27 14.4.4 15-21.3 4-27Z"
      />
    </svg>
  );
}

export function IconSeparator({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg
      fill="none"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn('size-4', className)}
      {...props}
    >
      <path d="M16.88 3.549L7.12 20.451"></path>
    </svg>
  );
}

export function IconSpinner({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn('size-4 animate-spin', className)}
      {...props}
    >
      <path d="M232 128a104 104 0 0 1-208 0c0-41 23.81-78.36 60.66-95.27a8 8 0 0 1 6.68 14.54C60.15 61.59 40 93.27 40 128a88 88 0 0 0 176 0c0-34.73-20.15-66.41-51.34-80.73a8 8 0 0 1 6.68-14.54C208.19 49.64 232 87 232 128Z" />
    </svg>
  );
}

export function IconUser({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn('size-4', className)}
      {...props}
    >
      <path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56 56.06 56.06 0 0 1-56-56Z" />
    </svg>
  );
}

export function IconX({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      className={cn('size-4', className)}
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M389.2 48h70.6L305.6 224.2L487 464H345L233.7 318.6L106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z"
      ></path>
    </svg>
  );
}
