import { auth } from "@/lib/auth";
import { IStudio } from "@/lib/studio-type";
import { headers } from "next/headers";
import Link from "next/link";
import { Plus, LayoutGrid, Building2 } from "lucide-react";
import MyListingCard from "@/components/dashboard-components/MyListingCard";

const MyStudioListings = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user?.email) {
    return (
      <div className="py-20 text-center text-gray-500">
        Please log in to view your studio listings.
      </div>
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/studios/owner/${encodeURIComponent(user.email)}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch studio listings");
  }

  const data: IStudio[] = await res.json();

  return (
    <section className="min-h-screen bg-[#F8F9FC] px-4 py-10 dark:bg-[#020618] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#CD274E]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#CD274E] dark:bg-[#CD274E]/15 dark:text-[#F47291]">
              <LayoutGrid size={14} />
              Host Workspace
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              My Studio Listings
            </h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Manage your creative spaces, pricing, and studio details.
            </p>
          </div>

          <Link
            href="/dashboard/add-studio"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#CD274E] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#B51F43] hover:shadow-md"
          >
            <Plus size={18} strokeWidth={2.5} />
            Add New Studio
          </Link>
        </div>

        {/* Listing Summary */}
        <div className="mb-6 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 dark:border-gray-800 dark:bg-[#0F172A]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#CD274E]/10 text-[#CD274E] dark:bg-[#CD274E]/15 dark:text-[#F47291]">
              <Building2 size={20} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                Your Studios
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                All your listed creative spaces
              </p>
            </div>
          </div>

          <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-bold text-gray-800 dark:bg-gray-800 dark:text-gray-200">
            {data.length}
          </span>
        </div>

        {/* Studio Listings */}
        {data.length > 0 ? (
          <div className="space-y-4">
            {data.map((item: IStudio) => (
              <MyListingCard key={item._id} listingData={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center dark:border-gray-700 dark:bg-[#0F172A]">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#CD274E]/10 text-[#CD274E] dark:bg-[#CD274E]/15">
              <Building2 size={30} />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              No studios listed yet
            </h3>

            <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
              Start showcasing your creative spaces by adding your first studio.
            </p>

            <Link
              href="/dashboard/add-studio"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#CD274E] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B51F43]"
            >
              <Plus size={17} />
              Create Studio
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyStudioListings;
