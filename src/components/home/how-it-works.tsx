import Link from "next/link";
import {
  CalendarCheck,
  CalendarClock,
  Clapperboard,
  Compass,
} from "lucide-react";
import { cn } from "cn";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const steps = [
  {
    title: "Discover Spaces",
    description:
      "Browse cyc walls, sound stages, podcast lounges, recording suites and workshops. Filter by space type, location, date and budget.",
    icon: Compass,
  },
  {
    title: "Select Shoot Hours",
    description:
      "Inspect live availability and choose the exact hours you need — hourly or full day, with transparent rates and no hidden fees.",
    icon: CalendarClock,
  },
  {
    title: "Book Instantly",
    description:
      "Reserve in seconds with secure checkout and real-time confirmation. Manage or adjust your booking from your dashboard.",
    icon: CalendarCheck,
  },
  {
    title: "Create & Produce",
    description:
      "Show up and shoot. Every space is verified, equipped and production-ready for your crew.",
    icon: Clapperboard,
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="scroll-mt-24 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d1234c] dark:text-[#f06a8f]">
            How it works
          </span>
          <h2
            id="how-it-works-heading"
            className=" mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            From idea to shoot in four simple steps
          </h2>
          <p className="mt-3 text-muted-foreground">
            StudioSpace connects creators with verified hosts — transparent
            pricing, real-time availability and instant booking at every step.
          </p>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <li key={step.title} className="h-full">
                <Card className="group h-full ring-[#d1234c]/15 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-[#d1234c]/10 hover:ring-[#d1234c]/40">
                  <CardContent className="cursor-pointer flex h-full flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-[#d1234c]/10 text-[#d1234c] transition-colors group-hover:bg-[#d1234c] group-hover:text-white dark:bg-[#d1234c]/20 dark:text-[#f06a8f] dark:group-hover:text-white">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-semibold text-[#d1234c] dark:text-[#f06a8f]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <CardTitle>{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/studios"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 rounded-lg bg-[#d1234c] px-6 text-white shadow-sm shadow-[#d1234c]/30 hover:bg-[#d1234c]/90 focus-visible:border-[#d1234c] focus-visible:ring-[#d1234c]/30",
            )}
          >
            Explore Studios
          </Link>
          {/* <Link
            href="/studios"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded-lg border-black/20 px-6 hover:border-[#d1234c]/40 hover:bg-[#d1234c]/5 hover:text-[#d1234c] dark:border-white/20 dark:hover:bg-[#d1234c]/10 dark:hover:text-[#f06a8f]",
            )}
          >
            Host Your Space
          </Link> */}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
