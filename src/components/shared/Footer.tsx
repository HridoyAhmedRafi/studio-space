import Link from "next/link";
import { ArrowUpRight, Clapperboard } from "lucide-react";

import NewsletterForm from "@/components/shared/NewsletterForm";
import {
  InstagramIcon,
  LinkedInIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/shared/SocialIcons";
import { POPULAR_CATEGORY_LINKS } from "@/types/studio-categories";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about" },
  { label: "My Bookings", href: "/my-bookings" },
] as const;

const socialLinks = [
  { label: "X (Twitter)", href: "https://x.com", Icon: XIcon },
  {
    label: "Instagram",
    href: "https://instagram.com",
    Icon: InstagramIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company",
    Icon: LinkedInIcon,
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    Icon: YouTubeIcon,
  },
] as const;

const linkClass =
  "text-sm text-gray-500 transition-colors hover:text-[#d1234c] dark:text-gray-400 dark:hover:text-[#f06a8f]";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-[#F8F9FC] dark:border-gray-800 dark:bg-[#020618]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1.4fr] lg:gap-8">
          {/* Brand + mission */}
          <div>
            <Link
              href="/"
              className="group flex w-fit items-center gap-2.5"
              aria-label="StudioSpace home"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-[#d1234c] text-white shadow-sm shadow-[#d1234c]/30 transition-transform group-hover:scale-105">
                <Clapperboard className="size-4" />
              </span>

              <span className="text-base font-semibold tracking-tight">
                Studio
                <span className="text-[#d1234c] dark:text-[#f06a8f]">
                  Space
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500 dark:text-gray-400">
              StudioSpace connects filmmakers, photographers, and creators with
              production-ready studios — book by the hour, shoot with
              confidence.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex size-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:border-[#d1234c]/40 hover:bg-[#d1234c]/10 hover:text-[#d1234c] dark:border-gray-700 dark:bg-white/5 dark:text-gray-400 dark:hover:border-[#d1234c]/40 dark:hover:bg-[#d1234c]/15 dark:hover:text-[#f06a8f]"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h2>

            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Popular categories */}
          <nav aria-label="Popular studio categories">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Popular Categories
            </h2>

            <ul className="mt-4 space-y-3">
              {POPULAR_CATEGORY_LINKS.map((category) => (
                <li key={category.value}>
                  <Link
                    href={`/studios?category=${encodeURIComponent(category.value)}`}
                    className={`${linkClass} inline-flex items-center gap-1`}
                  >
                    {category.label}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  href="/studios"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#d1234c] transition-colors hover:text-[#b51f43] dark:text-[#f06a8f]"
                >
                  All Studios
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Newsletter */}
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Stay in the loop
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
              New spaces, host spotlights, and booking tips — once a month, no
              spam.
            </p>

            <div className="mt-4">
              <NewsletterForm />
            </div>

            <p className="mt-3 text-xs leading-5 text-gray-400 dark:text-gray-500">
              By subscribing you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 dark:border-gray-800 sm:flex-row">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {year} StudioSpace. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/#"
              className="text-gray-500 transition-colors hover:text-[#d1234c] dark:text-gray-400 dark:hover:text-[#f06a8f]"
            >
              Terms of Service
            </Link>

            <span
              aria-hidden="true"
              className="size-1 rounded-full bg-gray-300 dark:bg-gray-700"
            />

            <Link
              href="/#"
              className="text-gray-500 transition-colors hover:text-[#d1234c] dark:text-gray-400 dark:hover:text-[#f06a8f]"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
