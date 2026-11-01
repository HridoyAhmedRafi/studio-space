import React from "react";
import { Clapperboard } from "lucide-react";

import StudioCard from "../dashboard-components/studio/StudioCard";
import EmptyState from "@/components/shared/EmptyState";
import { IStudio } from "@/types/studio-type";

const FeaturedSection = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/featured-studio-data`,
  );
  const data: IStudio[] = res.ok ? await res.json() : [];

  return (
    <section className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d1234c] dark:text-[#f06a8f]">
        Handpicked workspaces
      </p>

      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Featured Workspace
      </h2>

      <p className="mt-3 text-muted-foreground">
        Discover inspiring creative spaces, thoughtfully selected for your next
        big idea.
      </p>

      {data.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item: IStudio) => (
            <StudioCard key={item._id} studio={item} />
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <EmptyState
            icon={<Clapperboard className="size-7" />}
            title="Featured studios are being curated"
            description="New spaces are added every week. In the meantime, explore the full marketplace to find your next set."
            primaryAction={{ label: "Browse All Studios", href: "/studios" }}
          />
        </div>
      )}
    </section>
  );
};

export default FeaturedSection;
