import { auth } from "@/lib/auth";
import { IStudio } from "@/types/studio-type";
import { headers } from "next/headers";
import Link from "next/link";
import {
  Plus,
  LayoutGrid,
  Building2,
  LockKeyhole,
  TriangleAlert,
} from "lucide-react";
import MyListingCard from "@/components/dashboard-components/my-listing/MyListingCard";
import EmptyState from "@/components/shared/EmptyState";

const MyStudioListings = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user?.email) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#F8F9FC] px-4 py-16 dark:bg-[#020618]">
        <div className="w-full max-w-2xl">
          <EmptyState
            icon={<LockKeyhole className="size-7" />}
            title="Please log in"
            description="You need an account to manage your studio listings."
            primaryAction={{ label: "Go to Login", href: "/login" }}
            secondaryAction={{ label: "Browse Studios", href: "/studios" }}
          />
        </div>
      </section>
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/studios/owner/${encodeURIComponent(user.email)}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return (
      <section className="min-h-screen bg-[#F8F9FC] px-4 py-10 dark:bg-[#020618] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EmptyState
            icon={<TriangleAlert className="size-7" />}
            title="We couldn't load your listings"
            description="The studio service did not respond. Check your connection and try again."
            primaryAction={{ label: "Try Again", href: "/my-listings" }}
          />
        </div>
      </section>
    );
  }

  const data: IStudio[] = await res.json();

  return (
    <section className="min-h-screen bg-[#F8F9FC] px-4 py-10 dark:bg-[#020618] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#d1234c]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#d1234c] dark:bg-[#d1234c]/15 dark:text-[#F47291]">
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
            href="/add-studio"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-[#d1234c] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#b51f43] hover:shadow-md"
          >
            <Plus size={18} strokeWidth={2.5} />
            Add New Studio
          </Link>
        </div>

        <div className="mb-6 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 dark:border-gray-800 dark:bg-[#0F172A]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d1234c]/10 text-[#d1234c] dark:bg-[#d1234c]/15 dark:text-[#F47291]">
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

        {data.length > 0 ? (
          <div className="space-y-4">
            {data.map((item: IStudio) => (
              <MyListingCard key={item._id} listingData={item} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Building2 className="size-7" />}
            title="No studios listed yet"
            description="Start showcasing your creative spaces by adding your first studio."
            primaryAction={{ label: "Create Studio", href: "/add-studio" }}
          />
        )}
      </div>
    </section>
  );
};

export default MyStudioListings;
