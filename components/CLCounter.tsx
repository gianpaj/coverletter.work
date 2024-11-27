'use client';
import { useEffect, useState } from 'react';

export default function CLCounter() {
  const [counter, setCounter] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/counter')
      .then(res => res.json())
      .then(res => {
        setCounter(res.data);
      });
  });

  if (!counter) {
    return null;
  }
  return (
    <p className="mb-5 rounded-2xl border px-4 py-1 text-sm text-slate-500 transition duration-300 ease-in-out hover:scale-105">
      {counter} Cover Letters generated so far
    </p>
  );
}
