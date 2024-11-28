'use client';

import { useRef } from 'react';
import Image from 'next/image';

import { LandigForm } from '@/components/landing/form';

import styles from './Landing.module.css';
import openai from '../../app/assets/openai.svg';

interface Props {
  counter: JSX.Element;
}

export default function Landing({ counter }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const scollToForm = () => {
    formRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  };

  return (
    <div className="z-50 mb-20 grid gap-4 sm:mb-40">
      <div className="grid h-screen place-items-center sm:h-[calc(100vh-3.75rem)]">
        <div
          className={`${styles.hero} mx-auto grid place-items-center gap-16 text-center text-4xl font-extrabold sm:text-5xl md:text-6xl lg:w-[800px]`}
        >
          <h1 className="px-1 sm:px-4">
            Generate a tailored cover letter in seconds
          </h1>
          <div className={`${styles['home-hero-title']} overflow-hidden`}>
            <span className="ml-4 inline-block text-rose-400 first:ml-0">
              Get noticed.
            </span>
            <span className="ml-4 inline-block text-rose-500">Get hired.</span>
            <span className="ml-4 inline-block pb-[0.3rem] text-pink-600">
              Get ahead.
            </span>
          </div>
          <h3 className="-my-4 text-lg font-medium text-zinc-600 md:text-xl dark:text-zinc-200">
            Apply to jobs faster with a custom cover letter
          </h3>
          <div className="flex flex-col items-center">
            {counter ? counter : null}
            <p className="mt-4 flex flex-row items-center gap-1 text-sm font-medium text-zinc-600 md:text-xl dark:text-zinc-200">
              Powered by{' '}
              <a href="https://openai.com" target="_blank" rel="noreferrer">
                <Image alt="OpenAI ChatGPT-4" src={openai} height={20} />
              </a>
            </p>
          </div>
          <button onClick={scollToForm} className="m-8 -mb-12">
            <span className={styles['scroll-down']} />
          </button>
        </div>
      </div>
      <LandigForm ref={formRef} />
    </div>
  );
}
