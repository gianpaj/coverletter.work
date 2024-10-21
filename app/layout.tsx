import "./globals.css";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
// import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title:
    "Custom Cover Letter - Generate a free tailored cover letter for your next job",
  description:
    "Tired of the same old cover letter? Generate a free custom cover letter for your next job application",
  // icons: {
  //   icon: '/favicon.ico',
  //   shortcut: '/favicon-16x16.png',
  //   apple: '/apple-touch-icon.png'
  // }
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-sans antialiased", inter.className)}>
        {/* <Toaster position="top-center" /> */}
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
