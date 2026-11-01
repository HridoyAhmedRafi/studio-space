import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Clapperboard,
  Mic,
  Music4,
  Palette,
  type LucideProps,
} from "lucide-react";

import { IStudio } from "@/lib/studio-type";
import { StudioCategory } from "@/lib/studio-categories";

interface CategoryCard {
  label: string;
  value: StudioCategory;
  description: string;
  icon: React.ComponentType<LucideProps>;
  iconClassName: string;
}

const categoryCards: CategoryCard[] = [
  {
    label: "Photo Studios",
    value: "Photo Studio",
    description:
      "Cyclorama walls, natural daylight lofts, and profoto lighting setups.",
    icon: Camera,
    iconClassName:
      "bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400",
  },
  {
    label: "Sound Stages",
    value: "Film Stage",
    description:
      "Acoustic blackboxes, green screens, camlock power, and drive-in access.",
    icon: Clapperboard,
    iconClassName:
      "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
  },
  {
    label: "Podcast Rooms",
    value: "Podcast Lounge",
    description:
      "Turnkey audio/video recording with multi-cam 4K switchers and Shure mics.",
    icon: Mic,
    iconClassName:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
  },
  {
    label: "Music Suites",
    value: "Music Suite",
    description:
      "Dolby Atmos monitoring, analog consoles, vocal booths, and live rooms.",
    icon: Music4,
    iconClassName:
      "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
  },
  {
    label: "Art Workshops",
    value: "Workshop",
    description:
      "Ceramic kilns, pottery wheels, printmaking presses, and raw maker space.",
    icon: Palette,
    iconClassName: "bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400",
  },
];

const getCategoryCounts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) return {};

    const studios: IStudio[] = await res.json();

    return studios.reduce<Record<string, number>>((counts, studio) => {
      const key = String(studio.category ?? "").trim();

      if (key) counts[key] = (counts[key] ?? 0) + 1;

      return counts;
    }, {});
  } catch {
    // The homepage should never break because the categories count failed.
    return {};
  }
};

const CategorySection = async () => {
  const counts = await getCategoryCounts();

  return (
    <section className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:py-20">
      {/* Section Header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#d1234c]">
            Curated Production Categories
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Browse by Creative Discipline
          </h2>
        </div>

        <Link
          href="/studios"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-[#d1234c] transition-colors hover:text-[#b51f43]"
        >
          Explore All Workspaces
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {categoryCards.map((card) => {
          const Icon = card.icon;
          const count = counts[card.value] ?? 0;

          return (
            <Link
              key={card.value}
              href={`/studios?category=${encodeURIComponent(card.value)}`}
              className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d1234c]/40 hover:shadow-md dark:border-gray-800 dark:bg-[#0F172A]"
            >
              <div>
                <div
                  className={`flex size-11 items-center justify-center rounded-xl ${card.iconClassName}`}
                >
                  <Icon size={20} />
                </div>

                <h3 className="mt-4 font-semibold text-gray-900 transition-colors group-hover:text-[#d1234c] dark:text-white dark:group-hover:text-[#f47291]">
                  {card.label}
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-gray-500 dark:text-gray-400">
                  {card.description}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-xs font-medium text-gray-400 dark:border-gray-800 dark:text-gray-500">
                {count > 0 ? (
                  <span>
                    {count} {count === 1 ? "Space" : "Spaces"}
                  </span>
                ) : (
                  <span>Explore</span>
                )}

                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#d1234c]" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySection;
