"use client";

import Link from "next/link";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const brandSolidClass =
  "bg-[#d1234c] text-white shadow-sm shadow-[#d1234c]/25 hover:bg-[#d1234c]/90 focus-visible:border-[#d1234c] focus-visible:ring-[#d1234c]/30";

const brandOutlineClass =
  "border-black/20 bg-transparent hover:border-[#d1234c]/40 hover:bg-[#d1234c]/5 hover:text-[#d1234c] dark:border-white/20 dark:bg-transparent dark:hover:bg-[#d1234c]/10 dark:hover:text-[#f06a8f]";

export default function SessionButton() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <>
      {user ? (
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#d1234c]">
              <Avatar className="size-8">
                <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                <AvatarFallback>
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>Profile</DropdownMenuItem>

              <DropdownMenuItem>Sign Out</DropdownMenuItem>
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
