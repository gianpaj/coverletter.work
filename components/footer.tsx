import Link from 'next/link';
// import { FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6"
// import { Logo } from "@/components/logo"

export function Footer() {
  return (
    <footer className="bg-muted px-4 py-8 text-center lg:px-6">
      <div className="flex flex-col items-center justify-between space-x-2 text-sm sm:flex-row">
        {/* <Logo /> */}
        <span className="my-3 text-zinc-500">
          Created by{' '}
          <a
            className="font-bold transition hover:text-black/50"
            target="_blank"
            href="https://x.com/gianpaj"
          >
            Gianfranco P.
          </a>
        </span>
        {/* <FaInstagram className="transition-all hover:text-zinc-800" />
            <FaYoutube className="transition-all hover:text-zinc-800" />
            <FaXTwitter className="transition-all hover:text-zinc-800" />
            <FaLinkedin className="transition-all hover:text-zinc-800" /> */}
        <span className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Custom Cover Letter. All Rights Reserved
        </span>
      </div>
    </footer>
  );
}
