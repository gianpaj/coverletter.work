"use client";

import React, { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";
import { useActions, useAIState, useUIState } from "ai/rsc";
import Textarea from "react-textarea-autosize";
import { toast } from "sonner";
// import Link from "next/link"

// import { useTranslations } from "next-intl"
// import { FaGithub } from "react-icons/fa6"
// import TypewriterComponent from "typewriter-effect"
// import { useCurrentUser } from "@/lib/auth/hooks/use-current-user"
import { Button } from "@/components/ui/button";
// import { UserMessage } from '../cover-letter-message'
import { AI } from "@/lib/chat/actions";
import { nanoid } from "@/lib/utils";
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
  const [jobDescriptionInput, setJobDescriptionInput] = useState(
    INITIAL_JOB_DESCRIPTION
  );
  const [coverLetterInput, setCoverLetterInput] = useState("");
  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, []);

  const scrollToGeneratedCL = () => {
    // if (generatedCLRef.current !== null) {
    generatedCLRef.current?.scrollIntoView({ behavior: "smooth" });
    // }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: disable button while it's already generating

    // Blur focus on mobile
    if (window.innerWidth < 600) {
      // @ts-ignore
      e.target["message"]?.blur();
    }

    const jobDescription = jobDescriptionInput.trim();
    const coverLetter = coverLetterInput.trim()
      ? coverLetterInput.trim()
      : INITIAL_COVER_LETTER;
    // setCoverLetterInput('')
    if (!jobDescription) return;

    // Optimistically add user message UI
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: nanoid(),
        display: "x",
      },
    ]);

    // Submit and get response message
    const responseMessage = await submitUserMessage(
      generateUserMessage(jobDescription, coverLetter)
    );
    setMessages((currentMessages: any) => [
      ...currentMessages,
      responseMessage,
    ]);
    scrollToGeneratedCL();
  };
  const generatedCoverLetterNode = messages?.length
    ? messages?.[messages.length - 1].display
    : null;
  const generatedCoverLetterMsg = aiState.messages?.length
    ? aiState.messages[aiState.messages.length - 1].content
    : "";
  return (
    <form
      // ref={formRef}
      onSubmit={onSubmit}
    >
      <div className="lg:text-7-xl z-50 space-y-1 text-3xl font-extrabold sm:space-y-5 sm:text-5xl md:text-6xl">
        <h1>Get a tailored cover letter in seconds</h1>
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
          Do your thing.
          <br />
          Get your cover letter done.
          <br />
          Apply to jobs faster.
        </div>
        <div className="text-sm font-medium text-zinc-600 md:text-xl  ">
          Apply to jobs faster with a custom cover letter
        </div>
        <div className="flex h-full w-dvw flex-col items-center gap-4 overflow-y-scroll">
          <div className="flex w-full flex-col gap-4 px-4 first-of-type:pt-20 md:w-[700px] md:px-0">
            <label
              htmlFor="job-description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Add the Job Description
            </label>
            <Textarea
              id="job-description"
              // ref={inputRef}
              tabIndex={0}
              // onKeyDown={onKeyDown}
              placeholder={"Enter your Job Description here"}
              className="block min-h-[60px] w-full resize-none rounded-md border-0 bg-gray-100 px-4 py-[1.3rem] shadow-sm ring-1 ring-pink-200 placeholder:text-gray-400 focus-within:outline-1 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6"
              // autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              name="job-description"
              required
              rows={4}
              value={jobDescriptionInput}
              onChange={e => setJobDescriptionInput(e.target.value)}
            />
            <label
              htmlFor="cover-letter"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Add the Cover Letter (optional)
            </label>
            <Textarea
              id="cover-letter"
              // ref={inputRef}
              tabIndex={0}
              // onKeyDown={onKeyDown}
              placeholder={"Enter your initial Cover Letter here"}
              className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
              // autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              name="cover-letter"
              rows={5}
              value={coverLetterInput}
              onChange={e => setCoverLetterInput(e.target.value)}
            />
            <Button
              type="submit"
              className="-ml-2"
              variant="default"
              disabled={jobDescriptionInput.trim() === ""}
            >
              Generate ✨
            </Button>

            {messages.length > 1 && (
              <>
                <div>
                  <h2
                    className="mx-auto text-3xl font-bold text-slate-900 sm:text-4xl"
                    ref={generatedCLRef}
                  >
                    Your generated Cover letter
                  </h2>
                </div>
                <div className="mx-auto flex flex-col items-center justify-center  space-y-2">
                  <div
                    className="cursor-copy rounded-xl border bg-white p-4 shadow-md transition hover:bg-gray-100"
                    onClick={() => {
                      if (generatedCoverLetterMsg) {
                        navigator.clipboard.writeText(generatedCoverLetterMsg);
                        toast("Cover Letter copied to clipboard", {
                          icon: "✂️",
                        });
                      }
                    }}
                  >
                    {generatedCoverLetterNode}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
