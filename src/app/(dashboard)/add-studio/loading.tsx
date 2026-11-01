import { Skeleton } from "@/components/ui/skeleton";

const AddStudioLoading = () => (
  <div className="mx-auto w-full max-w-4xl px-4 py-10">
    <div className="mb-4 space-y-2">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-4 w-72 max-w-full" />
    </div>

    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#0F172A]">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="mt-2 h-4 w-72 max-w-full" />

      <div className="mt-6 space-y-8">
        {Array.from({ length: 3 }, (_, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            <Skeleton className="h-5 w-40" />

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-end gap-3">
          <Skeleton className="h-9 w-28 rounded-lg" />
          <Skeleton className="h-9 w-44 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

export default AddStudioLoading;
