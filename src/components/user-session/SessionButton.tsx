"use client";

import Link from "next/link";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusCircle, Building2, CalendarDays, LogOut } from "lucide-react";
import { toastError, toastSuccess } from "@/lib/toast";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const brandSolidClass =
  "bg-[#d1234c] text-white shadow-sm shadow-[#d1234c]/25 hover:bg-[#d1234c]/90 focus-visible:border-[#d1234c] focus-visible:ring-[#d1234c]/30";

const brandOutlineClass =
  "border-black/20 bg-transparent hover:border-[#d1234c]/40 hover:bg-[#d1234c]/5 hover:text-[#d1234c] dark:border-white/20 dark:bg-transparent dark:hover:bg-[#d1234c]/10 dark:hover:text-[#f06a8f]";

const accountLinks = [
  { href: "/add-studio", label: "Add New Studio", icon: PlusCircle },
  { href: "/my-listings", label: "My Studio Listings", icon: Building2 },
  { href: "/my-bookings", label: "My Bookings", icon: CalendarDays },
] as const;

const isActivePath = (pathname: string, href: string) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);

interface SessionButtonProps {
  hideGuestActionsOnMobile?: boolean;
}

export default function SessionButton({
  hideGuestActionsOnMobile = false,
}: SessionButtonProps) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const user = session?.user;

  const handleSignOut = async () => {
    try {
      await signOut();
      toastSuccess("You have been signed out");
      router.push("/login");
      router.refresh();
    } catch (error) {
      toastError(error, "Unable to sign out. Please try again.");
    }
  };

  return (
    <>
      {user ? (
        <div className="flex items-center gap-2">
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#d1234c]">
              <Avatar className="size-8">
                <AvatarImage src={user.image || ""} alt={user.name || "User"} />

                <AvatarFallback>
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-fit min-w-56 max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-popover p-2 shadow-lg"
            >
              <div className="px-3 py-2">
                <p className="text-xs text-muted-foreground">Signed in as</p>
                <h2 className="text-sm font-semibold">{user.name}</h2>
                <p className="break-all text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>
              <div className="my-2 h-px bg-border" />
              {accountLinks.map((item) => {
                const active = isActivePath(pathname, item.href);
                const Icon = item.icon;

                return (
                  <DropdownMenuItem
                    key={item.href}
                    className={cn(
                      "cursor-pointer rounded-lg p-0 focus:bg-[#d1234c]/10 focus:text-[#d1234c]",
                      active && "bg-[#d1234c]/10",
                    )}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex w-full items-center gap-3 px-3 py-2.5 text-sm",
                        active ? "font-medium text-[#d1234c]" : "text-foreground",
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-4",
                          active
                            ? "text-[#d1234c]"
                            : "text-muted-foreground",
                        )}
                      />
                      {item.label}
                      {active && (
                        <span
                          aria-hidden="true"
                          className="ml-auto size-1.5 rounded-full bg-[#d1234c]"
                        />
                      )}
                    </Link>
                  </DropdownMenuItem>
                );
              })}

              <div className="my-2 h-px bg-border" />
              <DropdownMenuItem
                onClick={async () => {
                  await handleSignOut();
                  setOpen(false);
                }}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#d1234c] focus:bg-[#d1234c]/10 focus:text-[#d1234c]"
              >
                <LogOut className="size-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <>
          {/* Desktop buttons */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "hover:bg-[#d1234c]/10 hover:text-[#d1234c] dark:hover:bg-[#d1234c]/20 dark:hover:text-[#f06a8f]",
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

          {/* Mobile buttons — only rendered when this instance lives inside the
              mobile menu, so the top bar never duplicates the guest links. */}
          {!hideGuestActionsOnMobile && (
            <div className="flex flex-col gap-2 md:hidden">
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "w-full",
                  brandOutlineClass,
                )}
              >
                Login
              </Link>

              <Link
                href="/register"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  brandSolidClass,
                  "w-full",
                )}
              >
                Register
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
}
