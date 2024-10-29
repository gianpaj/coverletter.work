// import Link from 'next/link';
// import { FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6"
// import { Logo } from "@/components/logo"

export function Footer() {
  return (
    <footer className="bg-muted px-4 py-6 text-center lg:px-6">
      <div className="flex flex-col items-center justify-between space-x-2 text-sm sm:flex-row">
        {/* <Logo /> */}
        <span className="mb-3 sm:mb-0 text-zinc-500">
          Created by{' '}
          <a
            className="font-bold transition hover:text-black/40"
            target="_blank"
            href="https://x.com/gianpaj"
          >
            Gianfranco P.
          </a>
          {' - '}
          <a
            className="font-bold transition hover:text-black/40"
            target="_blank"
            href="https://github.com/gianpaj/custom-cover-letter"
          >
            GitHub
          </a>
        </span>
        {/* <FaInstagram className="transition-all hover:text-zinc-800" />
            <FaYoutube className="transition-all hover:text-zinc-800" />
            <FaXTwitter className="transition-all hover:text-zinc-800" />
            <FaLinkedin className="transition-all hover:text-zinc-800" /> */}
        <span className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} coverletter.work - All Rights Reserved
        </span>
      </div>
    </footer>
  );
}
