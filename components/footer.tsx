// import Link from 'next/link';
// import { FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6"
// import { Logo } from "@/components/logo"

export function Footer() {
  return (
    <footer className="bg-muted px-4 py-6 text-center lg:px-6">
      <div className="flex flex-col items-center justify-between space-x-2 text-sm sm:flex-row">
        {/* <Logo /> */}
        <span className="text-muted-foreground mb-3 text-sm sm:mb-0">
          Created by{' '}
          <a
            className="hover:text-muted-foreground/60 font-bold transition"
            target="_blank"
            href="https://x.com/gianpaj"
          >
            Gianfranco P.
          </a>
          {' - '}
          <a
            className="hover:text-muted-foreground/60 font-bold transition"
            target="_blank"
            href="https://github.com/gianpaj/coverletter.work"
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
