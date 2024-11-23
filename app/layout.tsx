import './globals.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

import { cn } from '@/lib/utils';
import { Providers } from '@/components/providers';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';
import { JSONSchema } from '@/components/json-schema';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title:
    'CoverLetter.work - Generate a free tailored cover letter for your next job (AI Cover Letter Generator)',
  description:
    'Make every application count. Create perfectly tailored cover letters that capture your experience and land more interviews.',
  icons: {
    icon: '/icon.svg',
    // shortcut: '/favicon-16x16.png',
    apple: '/apple-icon.png',
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta name="darkreader-lock" />
      <meta name="apple-mobile-web-app-title" content="CoverLetter.work" />
      <body className={cn('font-sans antialiased', inter.className)}>
        <JSONSchema />
        <Toaster position="top-center" />
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="grow">{children}</main>
            <Footer />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
