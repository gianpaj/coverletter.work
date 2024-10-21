'use client';

import { StreamableValue } from 'ai/rsc';
import { cn } from '@/lib/utils';

import { useStreamableText } from '@/lib/hooks/use-streamable-text';
import { IconUser } from '@/components/ui/icons';
import { MemoizedReactMarkdown } from './markdown';

// export function UserMessage({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="group relative flex items-start">
//       <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm">
//         <IconUser />
//       </div>
//       <div className="ml-4 flex-1 space-y-2 overflow-hidden pl-2">
//         {children}
//       </div>
//     </div>
//   )
// }

export function BotMessage({
  content,
  className,
}: {
  content: string | StreamableValue<string>;
  className?: string;
}) {
  const text = useStreamableText(content);

  return (
    <div className={cn('group relative flex items-start', className)}>
      {/* <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
        {/* <IconOpenAI /> * /}
        icon goes here
      </div> */}
      <div className="flex-1 overflow-hidden px-1 sm:ml-4">
        <MemoizedReactMarkdown
          className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words"
          // remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
          }}
        >
          {text}
        </MemoizedReactMarkdown>
      </div>
    </div>
  );
}
