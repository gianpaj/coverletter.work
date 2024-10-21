import 'server-only';

import {
  createAI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue,
} from 'ai/rsc';
import { openai } from '@ai-sdk/openai';

import { BotMessage } from '@/components/cover-letter-message';
import { spinner } from '@/components/ui/spinner';

import { nanoid } from '@/lib/utils';
import { SYSTEM_MESSAGE } from '@/app/utils/prompts';
// import { saveChat } from "@/app/actions";
// import { SpinnerMessage } from "@/components/ui/spinner";

export function SpinnerMessage() {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="bg-primary text-primary-foreground flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border shadow-sm">
        {/* <IconOpenAI /> */}
      </div>
      <div className="ml-4 flex h-[24px] flex-1 flex-row items-center space-y-2 overflow-hidden px-1">
        {spinner}
      </div>
    </div>
  );
}

async function submitUserMessage(content: string) {
  'use server';

  const aiState = getMutableAIState<typeof AI>();

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content,
      },
    ],
  });

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;

  const result = await streamUI({
    model: openai('gpt-4-turbo'),
    initial: <SpinnerMessage />,
    system: SYSTEM_MESSAGE,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name,
      })),
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue('');
        textNode = <BotMessage content={textStream.value} />;
      }

      if (done) {
        textStream.done();
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content,
            },
          ],
        });
      } else {
        textStream.update(delta);
      }

      return textNode;
    },
    // tools: {},
  });

  return {
    id: nanoid(),
    display: result.value,
    text: result.rawResponse,
  };
}

export type AIState = {
  coverLetterId: string;
  messages: Message[];
};

export type UIState = {
  id: string;
  display?: React.ReactNode;
  text?: string;
}[];

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: { coverLetterId: nanoid(), messages: [] },
  onGetUIState: async () => {
    'use server';

    // const session = await auth();

    // if (session && session.user) {
    const aiState = getAIState();

    if (aiState) {
      const uiState = getUIStateFromAIState(aiState as CoverLetter);
      return uiState;
    }
    // } else {
    //   return;
    // }
  },
  // TODO: save to db
  // onSetAIState: async ({ state }) => {
  //   "use server";

  //   // const session = await auth();

  //   // if (session && session.user) {
  //   const { chatId, messages } = state;

  //   const createdAt = new Date();
  //   const userId = session.user.id as string;
  //   const path = `/chat/${chatId}`;

  //   const firstMessageContent = messages[0].content as string;
  //   const title = firstMessageContent.substring(0, 100);

  //   // const chat: Chat = {
  //   //   id: chatId,
  //   //   title,
  //   //   userId,
  //   //   createdAt,
  //   //   messages,
  //   //   path,
  //   // };

  //   // await saveCoverLetter(chat);
  //   // } else {
  //   //   return;
  //   // }
  // },
});

export const getUIStateFromAIState = (aiState: CoverLetter) => {
  return aiState.messages
    .filter(message => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
    }));
};
