import React from "react";
import StudioCard from "../dashboard-components/StudioCard";
import { IStudio } from "@/lib/studio-type";

const FeaturedSection = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/featured-studio-data`,
  );
  const data = await res.json();
  return (
    <div className="max-w-7xl mx-auto px-4  scroll-mt-24 py-16 sm:py-20">
      <h1 className="text-3xl  font-bold sm:text-4xl">Featured Workspace</h1>
      <p className="mt-1 mb-4 text-muted-foreground">
        Discover inspiring creative spaces, thoughtfully selected for your next
        big idea.
      </p>
      <div className="space-y-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
        {data.map((item: IStudio) => (
          <StudioCard key={item._id} studio={item} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
