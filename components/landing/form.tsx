'use client';

import React, { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { useChat } from 'ai/react';
import Textarea from 'react-textarea-autosize';
import { toast } from 'sonner';
// import Link from "next/link"

// import { useTranslations } from "next-intl"
// import TypewriterComponent from "typewriter-effect"
// import { useCurrentUser } from "@/lib/auth/hooks/use-current-user"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  createCoverLetter,
  INITIAL_JOB_DESCRIPTION,
  INITIAL_COVER_LETTER,
} from '@/app/utils/prompts';
// import { UserMessage } from '../cover-letter-message'
// import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";

const MAX_INPUTS_LENGTH = 5000;

const suggestedActions = [
  {
    title: 'What is the weather',
    label: 'in San Francisco?',
    action: 'What is the weather in San Francisco?',
  },
  {
    title: "Answer like I'm 5,",
    label: 'why is the sky blue?',
    action: "Answer like I'm 5, why is the sky blue?",
  },
];

export const Form = forwardRef(function Form(
  props,
  ref: ForwardedRef<HTMLFormElement>
) {
  // const user = useCurrentUser()
  // const t = useTranslations("Components.LandingHero")
  //
  const generatedCLRef = useRef<null | HTMLDivElement>(null);
  const [finishedCL, setFinishedCL] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isScraping, setIsScraping] = useState(false);

  const { error, setData, append, setInput, messages, isLoading, stop } =
    useChat({
      onError(error) {
        console.log('Error', error);
      },
      keepLastMessageOnError: true,
      onFinish(message, { usage }) {
        console.log('Usage', usage);
        setFinishedCL(message.content);
      },
    });
  const [jdInput, setJDInput] = useState('');
  const [clInput, setCLInput] = useState('');
  const [url, setUrl] = useState(
    'https://www.google.com/about/careers/applications/jobs/results/93855920110346950-senior-software-engineer-aiml-genai-google-cloud-ai'
  );

  const scrollToGeneratedCL = () => {
    generatedCLRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  };

  const onScrape = async () => {
    try {
      setJDInput('');
      setIsScraping(true);
      // TODO show toast that scraping is in progress
      const res = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (res.status !== 200) {
        throw new Error(
          data.error || 'An error occurred while fetching the website URL'
        );
      }
      toast.success('Fetching Job Description successful');
      setJDInput(data.page.text);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An error occurred while fetching the website URL');
      }
      console.log(error);
    } finally {
      setIsScraping(false);
    }
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

    setTimeout(() => {
      scrollToGeneratedCL();
    }, 100);
    // clear existing data
    setData(undefined);
    await append({ role: 'user', content: createCoverLetter(jd, coverLetter) });
  };

  const lastMessage = messages?.filter(m => m.role === 'assistant')[
    messages.filter(m => m.role === 'assistant').length - 1
  ];

  return (
    <form
      ref={ref}
      className="md:pt:20 mx-auto flex w-full flex-col gap-4 px-2 pt-10 text-center md:w-[700px] md:px-0"
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
        placeholder={'Enter your Job Description here or fetch from a URL'}
        className="min-h-[60px] w-full resize-none rounded-md border-0 bg-gray-50 px-4 py-[1.3rem] text-lg shadow-sm ring-1 ring-pink-200 placeholder:text-gray-400  focus-within:outline-1 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:placeholder:text-gray-300"
        // autoFocus
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        name="job-description"
        required
        rows={4}
        maxRows={15}
        value={jdInput}
        maxLength={MAX_INPUTS_LENGTH}
        onChange={e => setJDInput(e.target.value)}
      />

      <Input
        value={url}
        onChange={e => setUrl(e.target.value)}
        type="url"
        placeholder="Enter a URL"
        className="mt-4"
      />
      <Button onClick={onScrape} loading={isScraping} disabled={!url}>
        Extract Job Description
      </Button>
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
        loading={isLoading}
        disabled={jdInput.trim() === ''}
      >
        Generate ✨
      </Button>

      <div ref={generatedCLRef}>
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
                className={`bg-secondary ${isCopied ? '' : finishedCL && 'cursor-copy'} rounded-xl border p-4 shadow-md transition hover:bg-gray-100 hover:dark:bg-gray-600`}
                onClick={() => {
                  if (finishedCL) {
                    navigator.clipboard.writeText(finishedCL);
                    toast('Cover Letter copied to clipboard', {
                      icon: '✂️',
                    });
                    setIsCopied(true);
                  }
                }}
              >
                {lastMessage && (
                  <div className="group flex items-start overflow-hidden px-1 sm:ml-4">
                    <span className="prose-p:leading-relaxed whitespace-pre-wrap break-words text-lg">
                      <p className="mb-2 text-left last:mb-0">
                        {lastMessage.content}
                      </p>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </form>
  );
});
