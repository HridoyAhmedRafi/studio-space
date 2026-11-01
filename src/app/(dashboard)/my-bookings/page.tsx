import Link from "next/link";
import { headers } from "next/headers";
import { ArrowRight, CalendarCheck2, CalendarX2, LogIn } from "lucide-react";

import BookingCard from "@/components/dashboard-components/BookingCard";
import { auth } from "@/lib/auth";
import { IBooking } from "@/lib/booking-type";
import { IStudio } from "@/lib/studio-type";

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user?.email) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#F8F9FC] px-4 py-16 dark:bg-[#020618]">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm dark:border-gray-800 dark:bg-[#0F172A]">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#d1234c]/10 text-[#d1234c]">
            <LogIn size={26} />
          </div>

          <h1 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
            Please log in
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            You need an account to view your studio bookings.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#d1234c] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#b51f43]"
          >
            Go to Login
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    );
  }

  const [bookingsRes, studiosRes] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/${encodeURIComponent(user.email)}`,
      { cache: "no-store" },
    ),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`, { cache: "no-store" }),
  ]);

  const bookings: IBooking[] = bookingsRes.ok ? await bookingsRes.json() : [];
  const studios: IStudio[] = studiosRes.ok ? await studiosRes.json() : [];

  const studiosById = new Map(
    studios.map((studio) => [String(studio._id), studio]),
  );

  return (
    <section className="min-h-screen bg-[#F8F9FC] px-4 py-10 dark:bg-[#020618] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#d1234c]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#d1234c] dark:bg-[#d1234c]/15 dark:text-[#f47291]">
              <CalendarCheck2 size={14} />
              Production Schedule
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              My Studio Bookings
            </h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Track reservation statuses, cancellation requests, and shoot
              times.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#d1234c] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#b51f43] hover:shadow-md"
          >
            Explore More Studios
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
        </div>

        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking: IBooking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                studio={studiosById.get(String(booking.studioId))}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center dark:border-gray-700 dark:bg-[#0F172A]">
            <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-[#d1234c]/10 text-[#d1234c]">
              <CalendarX2 size={30} />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              No bookings found
            </h3>

            <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
              Once you request a workspace, your bookings and their status will
              show up here.
            </p>

            <Link
              href="/studios"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#d1234c] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#b51f43]"
            >
              Browse Studios
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyBookingsPage;
