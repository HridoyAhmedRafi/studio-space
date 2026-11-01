"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Search, RotateCcw, SlidersHorizontal } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/shared/EmptyState";
import StudioCard from "@/components/dashboard-components/studio/StudioCard";
import {
  ALL_STUDIOS,
  isStudioCategory,
  STUDIO_CATEGORIES,
} from "@/types/studio-categories";
import { IStudio } from "@/types/studio-type";

const categories: string[] = [ALL_STUDIOS, ...STUDIO_CATEGORIES];

interface StudioFilterProps {
  studios: IStudio[];
  initialCategory?: string;
}

const StudioFilter = ({ studios, initialCategory }: StudioFilterProps) => {
  const pathname = usePathname();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>(() =>
    isStudioCategory(initialCategory) ? initialCategory : ALL_STUDIOS,
  );

  const [syncedCategory, setSyncedCategory] = useState(initialCategory);

  if (initialCategory !== syncedCategory) {
    setSyncedCategory(initialCategory);
    setCategory(
      isStudioCategory(initialCategory) ? initialCategory : ALL_STUDIOS,
    );
  }

  const filteredStudios = useMemo(() => {
    let result = [...studios];

    if (search.trim()) {
      const searchTerm = search.toLowerCase();

      result = result.filter((studio) => {
        const searchableText = [
          studio.title,
          studio.location,
          studio.category,
          studio.amenities,
          studio.overview,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(searchTerm);
      });
    }

    if (category !== ALL_STUDIOS) {
      result = result.filter((studio) => studio.category === category);
    }

    return result;
  }, [studios, search, category]);

  const syncCategoryToUrl = (nextCategory: string) => {
    if (typeof window === "undefined") return;

    const url =
      nextCategory === ALL_STUDIOS
        ? pathname
        : `${pathname}?category=${encodeURIComponent(nextCategory)}`;

    window.history.replaceState(null, "", url);
  };

  const handleCategoryChange = (nextCategory: string) => {
    setCategory(nextCategory);
    syncCategoryToUrl(nextCategory);
  };

  const handleReset = () => {
    setSearch("");
    setCategory(ALL_STUDIOS);
    syncCategoryToUrl(ALL_STUDIOS);
  };

  return (
    <div className=" space-y-8">
      <div className="rounded-2xl border bg-card p-5 sm:p-7">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Find Your Perfect Studio</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Search by studio name, location or available facilities.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="What kind of creative space are you looking for?"
            className="focus-visible:ring-1 h-12 rounded-xl pl-12 pr-12 focus-visible:ring-[#d1234c]"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Clear search"
            >
              <RotateCcw className="size-4" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-[#d1234c]" />
              <h3 className="font-semibold">Browse by Category</h3>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose a space that matches your creative needs.
            </p>
          </div>

          {(search || category !== ALL_STUDIOS) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className=" cursor-pointer text-[#d1234c] hover:text-[#b51f43]"
            >
              <RotateCcw className="mr-2 size-3.5" />
              Clear filters
            </Button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => {
            const isActive = category === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => handleCategoryChange(item)}
                className={`cursor-pointer shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "border-[#d1234c] bg-[#d1234c] text-white shadow-sm"
                    : "border-border bg-background text-muted-foreground hover:border-[#d1234c]/50 hover:text-[#d1234c]"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
        <div>
          <h2 className="text-xl font-bold">
            {category === ALL_STUDIOS ? "Available Studios" : category}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Explore spaces designed for your next project.
          </p>
        </div>

        <p className="rounded-full bg-muted px-3 py-1.5 text-sm font-medium">
          {filteredStudios.length}{" "}
          {filteredStudios.length === 1 ? "Studio" : "Studios"} Found
        </p>
      </div>

      {filteredStudios.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStudios.map((studio) => (
            <StudioCard key={studio._id} studio={studio} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Search className="size-6" />}
          title="No Studios Found"
          description="We couldn't find any studios matching your search. Try another keyword or category."
          primaryAction={{ label: "Clear Filters", onClick: handleReset }}
        />
      )}
    </div>
  );
};

export default StudioFilter;
