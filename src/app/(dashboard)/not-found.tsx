import Link from "next/link";
import { ArrowRight, CalendarDays, LayoutGrid } from "lucide-react";

const DashboardNotFound = () => {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="mx-auto w-full max-w-lg rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm dark:border-gray-800 dark:bg-[#0F172A]">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-[#d1234c]/10 text-[#d1234c] dark:bg-[#d1234c]/15 dark:text-[#f47291]">
          <LayoutGrid className="size-7" />
        </div>

        <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-[#d1234c] dark:text-[#f47291]">
          Error 404
        </p>

        <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
          This dashboard page does not exist
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500 dark:text-gray-400">
          The link may be outdated. Pick up where you left off from your
          bookings or studio listings.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-2 sm:flex-row">
          <Link
            href="/my-bookings"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#d1234c] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#b51f43] sm:w-auto"
          >
            <CalendarDays className="size-4" />
            My Bookings
          </Link>

          <Link
            href="/studios"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-transparent dark:text-gray-300 dark:hover:bg-gray-800 sm:w-auto"
          >
            Browse Studios
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DashboardNotFound;
