'use client';

import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/landing/form';

import styles from './Landing.module.css';

export default function Landing() {
  const formRef = useRef<HTMLFormElement>(null);

  const scollToForm = () => {
    formRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  };

  return (
    <div className="px-2 sm:px-0">
      <div className="z-50 mb-20 grid gap-4 sm:mb-40">
        <div className="grid-4 grid h-[calc(100vh-3.75rem)] place-items-center">
          <div
            className={`${styles.hero} mx-auto grid place-items-center gap-16 text-center text-4xl font-extrabold sm:text-5xl md:text-6xl lg:w-[800px]`}
          >
            <h1>Get a tailored cover letter in seconds</h1>
            <div className={`${styles['home-hero-title']} overflow-hidden`}>
              <span className="ml-4 inline-block text-rose-400 first:ml-0">
                Do your thing.
              </span>
              <span className="ml-4 inline-block text-rose-500">
                Get your cover letter done.
              </span>
              <span className="ml-4 inline-block pb-[0.1rem] text-pink-600">
                Apply to jobs faster.
              </span>
            </div>
            <h3 className="-my-4 text-lg font-medium text-zinc-600 md:text-xl dark:text-zinc-200">
              Apply to jobs faster with a custom cover letter
            </h3>
            {/* <Button onClick={scollToForm} variant="default" size="lg">
              Start ⬇️
            </Button> */}
            <button onClick={scollToForm} className={styles['scroll-button']}>
              <span className={styles['scroll-down']} />
            </button>
          </div>
        </div>
        <Form ref={formRef} />
      </div>
    </div>
  );
}
