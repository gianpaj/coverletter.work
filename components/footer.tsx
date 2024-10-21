import Link from 'next/link';
// import { FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6"
// import { Logo } from "@/components/logo"

export function Footer() {
  return (
    <div>
      <div className="bg-muted px-4 py-12 text-center lg:px-6">
        <div className="flex flex-col items-center justify-center space-x-2 space-y-6">
          {/* <Logo /> */}
          {/* <div className="flex justify-center space-x-4 text-xl text-zinc-500"> */}
          {/* <FaInstagram className="transition-all hover:text-zinc-800" />
            <FaYoutube className="transition-all hover:text-zinc-800" />
            <FaXTwitter className="transition-all hover:text-zinc-800" />
            <FaLinkedin className="transition-all hover:text-zinc-800" /> */}
          {/* </div> */}
          <span className="text-muted-foreground text-sm">
            © {new Date().getFullYear()}{' '}
            <Link href="https://custom-cover-letter.vercel.app/">
              custom-cover-letter.vercel.app
            </Link>{' '}
            All Rights Reserved
          </span>
        </div>
      </div>
    </div>
  );
}
