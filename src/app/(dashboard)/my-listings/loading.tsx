import { Skeleton } from "@/components/ui/skeleton";
import { PageHeaderSkeleton } from "@/components/shared/skeletons";

const ListingRowSkeleton = () => (
  <div className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-[#0F172A] lg:flex-row lg:items-center">
    <Skeleton className="h-48 w-full rounded-xl sm:h-44 lg:h-32 lg:w-44" />

    <div className="min-w-0 flex-1 space-y-3">
      <Skeleton className="h-6 w-32 rounded-md" />
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-4">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>

    <div className="flex items-center justify-between gap-5 border-t border-gray-100 pt-4 dark:border-gray-800 lg:flex-col lg:items-end lg:border-l lg:border-t-0 lg:py-2 lg:pl-6 lg:pt-0">
      <div className="space-y-2 lg:flex lg:flex-col lg:items-end">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-7 w-24" />
      </div>

      <div className="flex gap-2">
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} className="size-9 rounded-lg" />
        ))}
      </div>
    </div>
  </div>
);

const MyListingsLoading = () => (
  <section className="min-h-screen bg-[#F8F9FC] px-4 py-10 dark:bg-[#020618] sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <PageHeaderSkeleton />

      <div className="mb-6 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 dark:border-gray-800 dark:bg-[#0F172A]">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-40" />
          </div>
        </div>

        <Skeleton className="h-8 w-10 rounded-lg" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 3 }, (_, index) => (
          <ListingRowSkeleton key={index} />
        ))}
      </div>
    </div>
  </section>
);

export default MyListingsLoading;
