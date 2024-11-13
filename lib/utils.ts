import { clsx, type ClassValue } from 'clsx';
// import { customAlphabet } from 'nanoid';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type UUID = ReturnType<typeof crypto.randomUUID>;

export function generateUUID(): UUID {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function randomUUID(): UUID {
  // Only on old safari / ios
  if (!('randomUUID' in crypto)) {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
      (
        Number(c) ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))
      ).toString(16)
    ) as UUID;
  }
  return crypto.randomUUID();
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

export const timeout = <T>(prom: Promise<T>, time: number): Promise<T> => {
  let timer: NodeJS.Timeout;
  return Promise.race([
    prom,
    new Promise<T>((_, reject) => {
      timer = setTimeout(
        () => reject(new Error(`Timeout after ${time / 1000} seconds`)),
        time
      );
    }),
  ]).finally(() => clearTimeout(timer));
};

export const isValidHttpUrl = (url: string) => {
  try {
    new URL(url);
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return false;
  }
};
