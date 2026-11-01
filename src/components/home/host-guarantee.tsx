import Link from "next/link";
import { BadgeCheck, Headset, ShieldCheck, Wrench } from "lucide-react";
import { cn } from "cn";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const assurances = [
  {
    title: "Liability protection",
    description:
      "Every booking is backed by platform liability protection — covering hosts, creators and the space itself.",
    icon: ShieldCheck,
  },
  {
    title: "Verified profiles",
    description:
      "Hosts and creators verify their identity before booking, so you always know who you are working with.",
    icon: BadgeCheck,
  },
  {
    title: "Equipment safety",
    description:
      "Spaces and gear are listed with clear equipment details and inspected regularly, so there are no surprises on shoot day.",
    icon: Wrench,
  },
  {
    title: "24/7 host support",
    description:
      "Real humans on call around the clock for bookings, access issues, last-minute changes and disputes.",
    icon: Headset,
  },
];

const HostGuarantee = () => {
  return (
    <section
      id="about"
      aria-labelledby="host-guarantee-heading"
      className="scroll-mt-24 border-t border-[#d1234c]/15 bg-[#d1234c]/[0.03] py-16 dark:border-[#d1234c]/25 dark:bg-[#d1234c]/[0.06] sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d1234c] dark:text-[#f06a8f]">
            Host guarantee &amp; creator support
          </span>
          <h2
            id="host-guarantee-heading"
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Protected at every step — for hosts and creators
          </h2>
          <p className="mt-3 text-muted-foreground">
            From verified profiles to liability protection, StudioSpace backs
            every booking — so hosts and creators can focus on the work.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {assurances.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className="group ring-[#d1234c]/15 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-[#d1234c]/10 hover:ring-[#d1234c]/40"
              >
                <CardContent className="cursor-pointer flex items-start gap-4">
                  <span className=" flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#d1234c]/10 text-[#d1234c] transition-colors group-hover:bg-[#d1234c] group-hover:text-white dark:bg-[#d1234c]/20 dark:text-[#f06a8f] dark:group-hover:text-white">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/studios"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 rounded-lg bg-[#d1234c] px-6 text-white shadow-sm shadow-[#d1234c]/30 hover:bg-[#d1234c]/90 focus-visible:border-[#d1234c] focus-visible:ring-[#d1234c]/30",
            )}
          >
            Host Your Space
          </Link>
          {/* <Link
            href="/studios"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded-lg border-black/20 px-6 hover:border-[#d1234c]/40 hover:bg-[#d1234c]/5 hover:text-[#d1234c] dark:border-white/20 dark:hover:bg-[#d1234c]/10 dark:hover:text-[#f06a8f]",
            )}
          >
            Explore Studios
          </Link> */}
        </div>
      </div>
    </section>
  );
};

export default HostGuarantee;
