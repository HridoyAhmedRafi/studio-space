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
import {
  PlusCircle,
  Building2,
  CalendarDays,
  Heart,
  LogOut,
} from "lucide-react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { useState } from "react";

const brandSolidClass =
  "bg-[#d1234c] text-white shadow-sm shadow-[#d1234c]/25 hover:bg-[#d1234c]/90 focus-visible:border-[#d1234c] focus-visible:ring-[#d1234c]/30";

const brandOutlineClass =
  "border-black/20 bg-transparent hover:border-[#d1234c]/40 hover:bg-[#d1234c]/5 hover:text-[#d1234c] dark:border-white/20 dark:bg-transparent dark:hover:bg-[#d1234c]/10 dark:hover:text-[#f06a8f]";

export default function SessionButton() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    toast.success("You have been signed out");
    signOut();
    redirect("/login");
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
              <DropdownMenuItem className="cursor-pointer rounded-lg p-0 focus:bg-[#d1234c]/10 focus:text-[#d1234c]">
                <Link
                  href="/add-studio"
                  className="flex w-full items-center gap-3 px-3 py-2.5 text-sm"
                >
                  <PlusCircle className="size-4 text-[#d1234c]" />
                  Add New Studio
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-lg p-0">
                <Link
                  href="/my-studio-listings"
                  className="flex w-full items-center gap-3 px-3 py-2.5 text-sm"
                >
                  <Building2 className="size-4 text-muted-foreground" />
                  My Studio Listings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-lg p-0">
                <Link
                  href="/my-bookings"
                  className="flex w-full items-center gap-3 px-3 py-2.5 text-sm"
                >
                  <CalendarDays className="size-4 text-muted-foreground" />
                  My Bookings
                </Link>
              </DropdownMenuItem>

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

          {/* Mobile buttons */}
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
        </>
      )}
    </>
  );
}
