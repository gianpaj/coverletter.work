import { kv } from '@vercel/kv';

export default async function CLCounter() {
  const counter = (await kv.get<number>('counter-cover-letters')) || 0;
  if (!counter) {
    return null;
  }
  return (
    <p className="mb-5 rounded-2xl border px-4 py-1 text-sm text-slate-500 transition duration-300 ease-in-out hover:scale-105">
      {counter} Cover Letters generated so far
    </p>
  );
}
