'use client';

import React, { useRef, useState } from 'react';
import { useChat } from 'ai/react';
import Textarea from 'react-textarea-autosize';
import { toast } from 'sonner';
// import Link from "next/link"

import styles from './LandingForm.module.css';

// import { useTranslations } from "next-intl"
// import TypewriterComponent from "typewriter-effect"
// import { useCurrentUser } from "@/lib/auth/hooks/use-current-user"
import { Button } from '@/components/ui/button';
// import { UserMessage } from '../cover-letter-message'
// import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";

const INITIAL_JOB_DESCRIPTION = `What excites you about potentially joining GOOGLE?

Feel free to describe the type of things you hope to work on or accomplish here if an opportunity arises"

GOOGLE: "Build software collaboratively from anywhere in the world, on any device, without spending a second on setup."`;
const INITIAL_COVER_LETTER = `Dear [Hiring Manager],

I am excited about the possibility of joining Replit because of the seamless developer experience you offer. The idea of building software collaboratively, from anywhere, without the hassle of setup, perfectly aligns with my belief in streamlining workflows for developers. I am particularly drawn to Replit’s commitment to innovation and the significant investment in AI, which I see as a game changer in boosting productivity and enhancing creativity in coding.

If given the opportunity, I would love to contribute to expanding Replit’s collaborative tools and AI-powered features, making development even more intuitive and accessible for developers at all skill levels.

Thank you for considering my application.`;

const generateUserMessage = (jobDescription: string, coverLetter: string) => {
  return `Write a short cover letter that works for this job description:
  <job-description>
  ${jobDescription}
  </job-description>

  <cover-leetter>
  ${coverLetter}
  </cover-letter>

  Only return the cover letter, do not return anything else.
  `;
};

const MAX_INPUTS_LENGTH = 5000;

export function LandingForm() {
  // const user = useCurrentUser()
  // const t = useTranslations("Components.LandingHero")

  const formRef = useRef<HTMLFormElement>(null);
  const generatedCLRef = useRef<null | HTMLDivElement>(null);
  const [finishedCL, setFinishedCL] = useState('');
  const {
    error,
    setData,
    handleSubmit,
    setInput,
    messages,
    isLoading,
    reload,
    stop,
  } = useChat({
    onError(error) {
      console.log('Error', error);
    },
    keepLastMessageOnError: true,
    onFinish(message, { usage }) {
      console.log('Usage', usage);
      setFinishedCL(message.content);
    },
  });
  const [jdInput, setJDInput] = useState(INITIAL_JOB_DESCRIPTION);
  const [clInput, setCLInput] = useState('');

  const scrollToGeneratedCL = () => {
    generatedCLRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  };

  const scollToForm = () => {
    formRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: disable button while it's already generating

    // Blur focus on mobile
    if (window.innerWidth < 600) {
      // @ts-ignore
      e.target['message']?.blur(); //fixme
    }
    const jd = jdInput.trim().substring(0, MAX_INPUTS_LENGTH);
    const coverLetter = clInput.trim() ? clInput.trim() : INITIAL_COVER_LETTER;
    if (!jd) return;

    // clear existing data
    setData(undefined);
    setInput(generateUserMessage(jd, coverLetter));
    // FIXME: handleSubmit needs to be called twice??
    handleSubmit();

    scrollToGeneratedCL();
  };
  return (
    <div className="z-50 mb-20 grid gap-4 sm:mb-40">
      <div className="grid-4 grid h-screen place-items-center">
        <div className="mx-auto grid place-items-center gap-16 text-center text-4xl font-extrabold sm:text-5xl md:text-6xl lg:w-[800px]">
          <h1>Get a tailored cover letter in seconds</h1>
          <div className={`${styles['home-hero-title']} overflow-hidden`}>
            <span className=" ml-4 inline-block text-rose-400 first:ml-0">
              Do your thing.
            </span>
            <span className=" ml-4 inline-block text-rose-500 first:ml-0">
              Get your cover letter done.
            </span>
            <span className=" ml-4 inline-block  text-pink-600 first:ml-0">
              Apply to jobs faster.
            </span>
          </div>
          <h3 className="mt-4 text-lg font-medium text-zinc-600 md:text-xl dark:text-zinc-200">
            Apply to jobs faster with a custom cover letter
          </h3>
        </div>

        <div className="mx-auto flex w-full justify-center place-self-start text-center lg:w-[800px]">
          <Button onClick={scollToForm} variant="secondary" size="lg">
            Start ⬇️
          </Button>
        </div>
      </div>

      <form
        ref={formRef}
        className="md:pt:20 mx-auto flex w-full flex-col gap-4 px-4 pt-10 text-center md:w-[700px] md:px-0"
        onSubmit={onSubmit}
      >
        <label
          htmlFor="job-description"
          className="block text-xl font-medium leading-6 text-gray-900 dark:text-gray-100"
        >
          Add the Job Description
        </label>
        <Textarea
          id="job-description"
          // ref={inputRef}
          tabIndex={0}
          // onKeyDown={onKeyDown}
          placeholder={'Enter your Job Description here'}
          className="min-h-[60px] w-full resize-none rounded-md border-0 bg-gray-50 px-4 py-[1.3rem] text-lg shadow-sm ring-1 ring-pink-200 placeholder:text-gray-400  focus-within:outline-1 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:placeholder:text-gray-300"
          // autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="job-description"
          required
          rows={4}
          value={jdInput}
          maxLength={MAX_INPUTS_LENGTH}
          onChange={e => setJDInput(e.target.value)}
        />
        <br />
        <label
          htmlFor="cover-letter"
          className="block text-xl font-medium leading-6 text-gray-900 dark:text-gray-100"
        >
          Add the Cover Letter (optional)
        </label>
        <Textarea
          id="cover-letter"
          // ref={inputRef}
          tabIndex={0}
          // onKeyDown={onKeyDown}
          placeholder={'Enter a previous Cover Letter here'}
          className="min-h-[60px] w-full resize-none rounded-md border-0 bg-gray-50 px-4 py-[1.3rem] text-lg shadow-sm ring-1 ring-pink-200 placeholder:text-gray-400  focus-within:outline-1 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:placeholder:text-gray-300"
          // autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="cover-letter"
          rows={5}
          value={clInput}
          maxLength={MAX_INPUTS_LENGTH}
          onChange={e => setCLInput(e.target.value)}
        />
        <Button
          type="submit"
          variant="default"
          size="lg"
          className="mt-8"
          disabled={jdInput.trim() === '' || isLoading}
          loading={isLoading}
        >
          Generate ✨
        </Button>

        {messages.length > 1 && (
          <>
            <div className="my-7">
              <h2
                className="mx-auto text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100"
                ref={generatedCLRef}
              >
                Your generated Cover letter
              </h2>
            </div>
            <div className="mx-auto flex flex-col items-center justify-center">
              <div
                className="bg-secondary cursor-copy rounded-xl border p-4 shadow-md transition hover:bg-gray-100 hover:dark:bg-gray-600"
                onClick={() => {
                  if (finishedCL) {
                    navigator.clipboard.writeText(finishedCL);
                    toast('Cover Letter copied to clipboard', {
                      icon: '✂️',
                    });
                  }
                }}
              >
                {messages
                  ?.filter(m => m.role === 'assistant')
                  .map(message => (
                    <div
                      key={message.id}
                      className="group relative flex items-start"
                    >
                      <div className="flex-1 overflow-hidden px-1 sm:ml-4">
                        <span className="prose-p:leading-relaxed whitespace-pre-wrap break-words text-lg">
                          <p className="mb-2 last:mb-0">{message.content}</p>
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
