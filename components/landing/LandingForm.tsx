'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useChat } from 'ai/react';
import { useActions, useAIState, useUIState } from 'ai/rsc';
import Textarea from 'react-textarea-autosize';
import { toast } from 'sonner';
// import Link from "next/link"

// import { useTranslations } from "next-intl"
// import { FaGithub } from "react-icons/fa6"
// import TypewriterComponent from "typewriter-effect"
// import { useCurrentUser } from "@/lib/auth/hooks/use-current-user"
import { Button } from '@/components/ui/button';
// import { UserMessage } from '../cover-letter-message'
import { AI } from '@/lib/chat/actions';
import { generateUUID } from '@/lib/utils';
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

// setTimeout(() => {
//   toast("Cover Letter copied to clipboard", {
//     icon: "✂️",
//   });
// }, 100);
export function LandingForm() {
  // const user = useCurrentUser()
  // const t = useTranslations("Components.LandingHero")
  //
  const generatedCLRef = useRef<null | HTMLDivElement>(null);
  // const { formRef, onKeyDown } = useEnterSubmit();
  // const inputRef = useRef<HTMLTextAreaElement>(null);
  const { submitUserMessage } = useActions();
  const [messages, setMessages] = useUIState<typeof AI>();
  const [aiState] = useAIState<typeof AI>();
  // const {
  //   error,
  //   // input,
  //   isLoading,
  //   // handleInputChange,
  //   // handleSubmit,
  //   messages,
  //   reload,
  //   stop
  // } = useChat({
  //   keepLastMessageOnError: true,
  //   onFinish(message, { usage, finishReason }) {
  //     console.log('Usage', usage)
  //     console.log('FinishReason', finishReason)
  //   }
  // })
  const [jdInput, setJDInput] = useState(INITIAL_JOB_DESCRIPTION);
  const [clInput, setCLInput] = useState('');

  const scrollToGeneratedCL = () => {
    generatedCLRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: disable button while it's already generating

    // Blur focus on mobile
    if (window.innerWidth < 600) {
      // @ts-ignore
      e.target['message']?.blur();
    }

    const jd = jdInput.trim();
    const coverLetter = clInput.trim() ? clInput.trim() : INITIAL_COVER_LETTER;
    // setCoverLetterInput('')
    if (!jd) return;

    // Optimistically add user message UI
    setMessages(([currentMessage]) => [
      currentMessage,
      {
        id: generateUUID(),
        display: 'x',
      },
    ]);

    // Submit and get response message
    const responseMessage = await submitUserMessage(
      generateUserMessage(jd, coverLetter)
    );
    setMessages(([currentMessage]: any) => [currentMessage, responseMessage]);
    scrollToGeneratedCL();
  };
  const generatedCLNode = messages?.length
    ? messages?.[messages.length - 1].display
    : null;
  const generatedCLMsg = aiState.messages?.length
    ? aiState.messages[aiState.messages.length - 1].content
    : '';
  return (
    <div className="z-50 my-1 sm:my-5">
      <div className="mx-auto grid gap-4 text-center text-4xl font-extrabold sm:text-5xl md:text-6xl lg:w-[800px]">
        <h1>Get a tailored cover letter in seconds</h1>
        <div className="bg-gradient-to-r from-rose-400 to-pink-600 bg-clip-text text-transparent">
          Do your thing.
          <br />
          Get your cover letter done.
          <br />
          Apply to jobs faster.
        </div>
        <h3 className="mt-4 text-lg font-medium text-zinc-600 md:text-xl dark:text-zinc-200">
          Apply to jobs faster with a custom cover letter
        </h3>
      </div>

      <form
        className="mx-auto flex w-full flex-col gap-4 px-4 text-center first-of-type:pt-20 md:w-[700px] md:px-0"
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
          className=" min-h-[60px] w-full resize-none rounded-md border-0 bg-gray-50 px-4 py-[1.3rem] text-lg shadow-sm ring-1 ring-pink-200 placeholder:text-gray-400 focus-within:outline-1 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6 dark:bg-gray-700"
          // autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="job-description"
          required
          rows={4}
          value={jdInput}
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
          className="min-h-[60px] w-full resize-none rounded-md border-0 bg-gray-50 px-4 py-[1.3rem] text-lg shadow-sm ring-1 ring-pink-200 placeholder:text-gray-400 focus-within:outline-1 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6 dark:bg-gray-700"
          // autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="cover-letter"
          rows={5}
          value={clInput}
          onChange={e => setCLInput(e.target.value)}
        />
        <Button
          type="submit"
          variant="default"
          size="lg"
          disabled={jdInput.trim() === ''}
          // loading={isLoading}
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
                className="bg-background cursor-copy rounded-xl border p-4 shadow-md transition hover:bg-gray-100 hover:dark:bg-gray-600"
                onClick={() => {
                  if (generatedCLMsg) {
                    navigator.clipboard.writeText(generatedCLMsg);
                    toast('Cover Letter copied to clipboard', {
                      icon: '✂️',
                    });
                  }
                }}
              >
                {generatedCLNode}
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
