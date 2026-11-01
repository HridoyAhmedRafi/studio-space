import { Skeleton } from "@/components/ui/skeleton";
import { StudioGridSkeleton } from "@/components/shared/skeletons";

const StudiosLoading = () => (
  <div className="mx-auto max-w-7xl px-4 py-8">
    {/* Page header */}
    <div className="mb-8 space-y-3">
      <Skeleton className="h-4 w-56" />
      <Skeleton className="h-9 w-96 max-w-full" />
      <Skeleton className="h-4 w-full max-w-xl" />
    </div>

    {/* Search panel */}
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-[#0F172A] sm:p-7">
      <Skeleton className="h-6 w-56" />
      <Skeleton className="mt-2 h-4 w-80 max-w-full" />
      <Skeleton className="mt-5 h-12 w-full rounded-xl" />
    </div>

    {/* Category chips */}
    <div className="mt-8 space-y-4">
      <Skeleton className="h-5 w-44" />
      <Skeleton className="h-4 w-64" />

      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-10 w-32 shrink-0 rounded-full" />
        ))}
      </div>
    </div>

    {/* Results header */}
    <div className="mt-8 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
      <div className="space-y-2">
        <Skeleton className="h-6 w-44" />
        <Skeleton className="h-4 w-64" />
      </div>

      <Skeleton className="h-8 w-28 rounded-full" />
    </div>

    <div className="mt-8">
      <StudioGridSkeleton count={6} />
    </div>
  </div>
);

export default StudiosLoading;
