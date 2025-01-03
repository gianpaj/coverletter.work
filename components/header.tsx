import * as React from 'react';
import Link from 'next/link';

// import { auth } from '@/auth'
import { Button } from '@/components/ui/button';
import { IconLogo, IconX } from '@/components/ui/icons';
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
      )} */}
      <Link href="/" rel="nofollow">
        <IconLogo className="size-8" />
      </Link>
      {/*
      <div className="items-center">
        <IconSeparator className="text-muted-foreground/50 size-6" />
          {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
      */}
    </>
  );
}

export function Header() {
  return (
    <header className="from-background/10 via-background/50 to-background/80 sticky top-0 z-50 hidden h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b px-4 backdrop-blur-xl sm:flex">
      <div className="flex items-center">
        <UserOrLogin />
        {/* <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
        </React.Suspense> */}
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button asChild>
          <>
            <IconX className="text-background mr-2" />
            <Link
              target="_blank"
              href={`https://x.com/intent/post?text=${encodeURIComponent(
                twitterMsg
              )}`}
            >
              Share on X
            </Link>
          </>
        </Button>
      </div>
    </header>
  );
}
