import { Clapperboard, LoaderCircle } from "lucide-react";

const RootLoading = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-4 py-20">
    <div className="relative flex size-16 items-center justify-center rounded-2xl bg-[#d1234c] text-white shadow-lg shadow-[#d1234c]/25">
      <Clapperboard className="size-7" />
      <LoaderCircle className="absolute -right-1.5 -bottom-1.5 size-6 animate-spin rounded-full bg-white p-0.5 text-[#d1234c] dark:bg-[#020618]" />
    </div>

    <div className="text-center">
      <p className="text-sm font-semibold text-gray-900 dark:text-white">
        Setting the stage…
      </p>
      <p
        role="status"
        className="mt-1 text-xs text-gray-500 dark:text-gray-400"
      >
        Loading your StudioSpace experience
      </p>
    </div>
  </div>
);

export default RootLoading;
