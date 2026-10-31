"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clapperboard, Menu, X } from "lucide-react";
import { cn } from "cn";

import { Button, buttonVariants } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
] as const;

const isActivePath = (pathname: string, href: string) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);

const navLinkClass = (active: boolean) =>
  cn(
    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
    active
      ? "bg-[#d1234c]/10 text-[#d1234c] dark:bg-[#d1234c]/20 dark:text-[#f06a8f]"
      : "text-muted-foreground hover:bg-[#d1234c]/5 hover:text-[#d1234c] dark:hover:bg-[#d1234c]/10 dark:hover:text-[#f06a8f]",
  );

const brandGhostClass =
  "hover:bg-[#d1234c]/10 hover:text-[#d1234c] dark:hover:bg-[#d1234c]/20 dark:hover:text-[#f06a8f]";

const brandSolidClass =
  "bg-[#d1234c] text-white shadow-sm shadow-[#d1234c]/25 hover:bg-[#d1234c]/90 focus-visible:border-[#d1234c] focus-visible:ring-[#d1234c]/30";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#d1234c]/15 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-[#d1234c]/25">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="Studio Space home"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-[#d1234c] text-white shadow-sm shadow-[#d1234c]/30 transition-transform group-hover:scale-105">
            <Clapperboard className="size-4" />
          </span>
          <span className="text-base font-semibold tracking-tight">
            Studio
            <span className="text-[#d1234c] dark:text-[#f06a8f]">Space</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navLinks.map((link) => {
            const active = isActivePath(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={navLinkClass(active)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              brandGhostClass,
            )}
          >
            Login
          </Link>
          <Link
            href="/register"
            className={cn(buttonVariants({ size: "sm" }), brandSolidClass)}
          >
            Register
          </Link>
        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className={cn("md:hidden", brandGhostClass)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-[#d1234c]/15 bg-background md:hidden dark:border-[#d1234c]/25"
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
          >
            {navLinks.map((link) => {
              const active = isActivePath(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={navLinkClass(active)}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="mt-3 flex flex-col gap-2 border-t border-[#d1234c]/15 pt-3 dark:border-[#d1234c]/25">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "w-full hover:border-[#d1234c]/40 hover:bg-[#d1234c]/5 hover:text-[#d1234c] dark:hover:text-[#f06a8f]",
                )}
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className={cn(
                  buttonVariants({ size: "sm" }),
                  brandSolidClass,
                  "w-full",
                )}
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
