import { clsx, type ClassValue } from 'clsx';
// import { customAlphabet } from 'nanoid';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function fetcher<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error('An unexpected error occurred');
    }
  }

  return res.json();
}

// export function formatDate(input: string | number | Date): string {
//   const date = new Date(input)
//   return date.toLocaleDateString('en-US', {
//     month: 'long',
//     day: 'numeric',
//     year: 'numeric'
//   })
// }

// export const formatNumber = (value: number) =>
//   new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD'
//   }).format(value)

export const runAsyncFnWithoutBlocking = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (...args: any) => Promise<unknown>
) => {
  fn();
};

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const getStringFromBuffer = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

export enum ResultCode {
  InvalidCredentials = 'INVALID_CREDENTIALS',
  InvalidSubmission = 'INVALID_SUBMISSION',
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  UnknownError = 'UNKNOWN_ERROR',
  UserCreated = 'USER_CREATED',
  UserLoggedIn = 'USER_LOGGED_IN',
}

export const getMessageFromCode = (resultCode: string) => {
  switch (resultCode) {
    case ResultCode.InvalidCredentials:
      return 'Invalid credentials!';
    case ResultCode.InvalidSubmission:
      return 'Invalid submission, please try again!';
    case ResultCode.UserAlreadyExists:
      return 'User already exists, please log in!';
    case ResultCode.UserCreated:
      return 'User created, welcome!';
    case ResultCode.UnknownError:
      return 'Something went wrong, please try again!';
    case ResultCode.UserLoggedIn:
      return 'Logged in!';
  }
};
