import * as React from 'react';
// import Link from 'next/link'

import { cn } from '@/lib/utils';
// import { auth } from '@/auth'
import { Button, buttonVariants } from '@/components/ui/button';
import {
  // IconNextChat,
  IconSeparator,
  IconX,
} from '@/components/ui/icons';
// import { UserMenu } from '@/components/user-menu'
// import { SidebarMobile } from './sidebar-mobile'
// import { SidebarToggle } from './sidebar-toggle'
// import { ChatHistory } from './chat-history'
// import { Session } from '@/lib/types'

const twitterMsg =
  'Hey, check out this free Cover letter generator! 🤩 https://coverletter.work';

async function UserOrLogin() {
  // const session = (await auth()) as Session
  return (
    <>
      {/* {session?.user ? (
        <>
          <SidebarMobile>
            <ChatHistory userId={session.user.id} />
          </SidebarMobile>
          <SidebarToggle />
        </>
      ) : (
        <Link href="/new" rel="nofollow">
          <IconNextChat className="size-6 mr-2 dark:hidden" inverted />
          <IconNextChat className="hidden size-6 mr-2 dark:block" />
        </Link>
      )} */}
      <div className="items-center">
        <IconSeparator className="text-muted-foreground/50 size-6" />
        {/* {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/login">Login</Link>
          </Button>
        )} */}
      </div>
    </>
  );
}

export function Header() {
  return (
    <header className="from-background/10 via-background/50 to-background/80 sticky top-0 z-50 hidden h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b px-4 backdrop-blur-xl sm:flex">
      <div className="flex items-center">
        {/* <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense> */}
      </div>
      <div className="flex items-center justify-end space-x-2">
        <a
          href={`https://x.com/intent/post?text=${encodeURIComponent(
            twitterMsg
          )}`}
          target="_blank"
          className={cn(buttonVariants(), 'text-neutral-100')}
        >
          <IconX
            target="_blank"
            className="mr-2 text-neutral-100 dark:text-black"
          />
          <span>Share on X</span>
        </a>
        <Button
          href={`https://x.com/intent/post?text=${encodeURIComponent(
            twitterMsg
          )}`}
          target="_blank"
          icon={<IconX className="mr-2 text-neutral-100" />}
        >
          <span>Share on X</span>
        </Button>
      </div>
    </header>
  );
}
