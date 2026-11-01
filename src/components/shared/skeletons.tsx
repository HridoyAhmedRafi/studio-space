import { Skeleton } from "@/components/ui/skeleton";

export const PageHeaderSkeleton = () => (
  <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
    <div className="space-y-3">
      <Skeleton className="h-6 w-40 rounded-full" />
      <Skeleton className="h-9 w-72 max-w-full" />
      <Skeleton className="h-4 w-80 max-w-full" />
    </div>

    <Skeleton className="h-11 w-48 rounded-xl" />
  </div>
);

export const StudioCardSkeleton = () => (
  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#0F172A]">
    <Skeleton className="h-56 w-full rounded-none" />

    <div className="space-y-4 p-5">
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />

        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
        <div className="space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>

        <Skeleton className="h-9 w-28 rounded-md" />
      </div>
    </div>
  </div>
);

export const StudioGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: count }, (_, index) => (
      <StudioCardSkeleton key={index} />
    ))}
  </div>
);

export const CategoryCardSkeleton = () => (
  <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#0F172A]">
    <div>
      <Skeleton className="size-11 rounded-xl" />
      <Skeleton className="mt-4 h-5 w-2/3" />
      <div className="mt-3 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
    </div>

    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="size-4 rounded-full" />
    </div>
  </div>
);

export const CategoryGridSkeleton = ({ count = 5 }: { count?: number }) => (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
    {Array.from({ length: count }, (_, index) => (
      <CategoryCardSkeleton key={index} />
    ))}
  </div>
);

export const FeaturedSectionSkeleton = () => (
  <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
    <Skeleton className="h-9 w-64" />
    <Skeleton className="mt-3 h-4 w-96 max-w-full" />

    <div className="mt-8">
      <StudioGridSkeleton count={3} />
    </div>
  </section>
);

export const CategorySectionSkeleton = () => (
  <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="space-y-3">
        <Skeleton className="h-3 w-56" />
        <Skeleton className="h-9 w-80 max-w-full" />
      </div>

      <Skeleton className="h-4 w-40" />
    </div>

    <CategoryGridSkeleton />
  </section>
);

export const BookingCardSkeleton = () => (
  <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-[#0F172A] sm:flex-row sm:items-center sm:gap-5">
    <Skeleton className="h-40 w-full shrink-0 rounded-xl sm:h-28 sm:w-36" />

    <div className="min-w-0 flex-1 space-y-3">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-44 rounded-full" />
        <Skeleton className="h-3 w-20" />
      </div>

      <Skeleton className="h-5 w-2/3" />

      <div className="flex flex-wrap items-center gap-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-40" />
      </div>

      <Skeleton className="h-4 w-52 max-w-full" />
    </div>

    <div className="flex shrink-0 items-center justify-between gap-4 border-t border-gray-100 pt-4 dark:border-gray-800 sm:flex-col sm:items-end sm:justify-center sm:border-l sm:border-t-0 sm:py-1 sm:pl-5 sm:pt-0">
      <div className="space-y-2 sm:flex sm:flex-col sm:items-end">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-7 w-24" />
      </div>

      <Skeleton className="h-9 w-28 rounded-lg" />
    </div>
  </div>
);

export const BookingListSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: count }, (_, index) => (
      <BookingCardSkeleton key={index} />
    ))}
  </div>
);

export const StudioDetailsSkeleton = () => (
  <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
    <Skeleton className="h-4 w-36" />

    <div className="mt-5 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
      <div className="space-y-6">
        <Skeleton className="h-80 w-full rounded-2xl sm:h-[26rem]" />

        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="h-20 rounded-xl" />
          ))}
        </div>

        <div className="space-y-3">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="h-20 rounded-xl" />
          ))}
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-10/12" />
        </div>
      </div>

      <div className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#0F172A]">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-9 w-32" />

        <div className="space-y-3 border-y border-gray-100 py-5 dark:border-gray-800">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>

        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  </div>
);
