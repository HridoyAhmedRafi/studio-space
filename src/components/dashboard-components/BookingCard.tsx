"use client";
import Image from "next/image";
import {
  BadgeCheck,
  CalendarDays,
  CircleCheck,
  CircleX,
  Clapperboard,
  Clock3,
  MapPin,
} from "lucide-react";

import { IBooking } from "@/lib/booking-type";
import { IStudio } from "@/lib/studio-type";
import toast from "react-hot-toast";
import { useState } from "react";

type BookingStatus = IBooking["status"];

const statusStyles: Record<
  BookingStatus,
  { label: string; className: string; icon: typeof Clock3 }
> = {
  Pending: {
    label: "Pending Host Approval",
    className:
      "bg-amber-50 text-amber-600 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20",
    icon: Clock3,
  },
  Confirmed: {
    label: "Confirmed",
    className:
      "bg-emerald-50 text-emerald-600 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20",
    icon: CircleCheck,
  },
  Completed: {
    label: "Completed",
    className:
      "bg-sky-50 text-sky-600 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:ring-sky-500/20",
    icon: BadgeCheck,
  },
  Cancelled: {
    label: "Cancelled",
    className:
      "bg-rose-50 text-rose-600 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-500/20",
    icon: CircleX,
  },
};

const getStatus = (value: string) => {
  const key = (Object.keys(statusStyles) as BookingStatus[]).find(
    (status) => status.toLowerCase() === String(value).toLowerCase(),
  );

  const resolved = key ?? "Pending";

  return { key: resolved, ...statusStyles[resolved] };
};

const formatDate = (value: string) => {
  if (!value) return "";

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) return value;

  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const BookingCard = ({
  booking,
  studio,
}: {
  booking: IBooking;
  studio?: IStudio;
}) => {
  const [currentStatus, setCurrentStatus] = useState<BookingStatus>(
    booking.status,
  );
  const handleCancelBooking = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/cancel/${booking._id}`,
        {
          method: "PATCH",
        },
      );

      const backendRes = await res.json();

      if (!res.ok || backendRes.modifiedCount === 0) {
        toast.error(backendRes.message || "Unable to cancel booking.");
        return;
      }

      setCurrentStatus("Cancelled");

      toast.success("Booking cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  const status = getStatus(currentStatus);
  const StatusIcon = status.icon;
  const canCancel = currentStatus === "Pending";

  const total = Number(booking.totalAmount) || 0;
  const duration = Number(booking.duration) || 0;

  return (
    <article className="group flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#d1234c]/40 hover:shadow-md dark:border-gray-800 dark:bg-[#0F172A] sm:flex-row sm:items-center sm:gap-5">
      {/* Studio Image */}
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 sm:h-28 sm:w-36">
        {studio?.imageUrl ? (
          <Image
            src={studio.imageUrl}
            alt={booking.studioTitle}
            fill
            sizes="(max-width: 640px) 100vw, 144px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-300 dark:text-gray-600">
            <Clapperboard size={30} />
          </div>
        )}
      </div>

      {/* Booking Details */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${status.className}`}
          >
            <StatusIcon size={13} />
            {status.label}
          </span>

          <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
            ID: #{booking._id?.slice(-6)}
          </span>
        </div>

        <h3 className="mt-2 line-clamp-2 text-base font-bold leading-snug text-gray-900 dark:text-white sm:text-lg">
          {booking.studioTitle}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={14} className="shrink-0 text-gray-400" />
            {formatDate(booking.bookingDate)}
          </span>

          <span
            aria-hidden="true"
            className="hidden size-1 rounded-full bg-gray-300 dark:bg-gray-600 sm:block"
          />

          <span className="inline-flex items-center gap-1.5">
            <Clock3 size={14} className="shrink-0 text-gray-400" />
            {booking.startTime} - {booking.endTime}
            {duration > 0 && (
              <span className="text-gray-400 dark:text-gray-500">
                ({duration} {duration === 1 ? "hr" : "hrs"})
              </span>
            )}
          </span>
        </div>

        {studio?.location && (
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <MapPin size={14} className="shrink-0 text-gray-400" />
            <span className="line-clamp-1">{studio.location}</span>
          </p>
        )}
      </div>

      {/* Payment & Actions */}
      <div className="flex shrink-0 items-center justify-between gap-4 border-t border-gray-100 pt-4 dark:border-gray-800 sm:flex-col sm:items-end sm:justify-center sm:border-l sm:border-t-0 sm:py-1 sm:pl-5 sm:pt-0">
        <div className="sm:text-right">
          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
            Total Charged / Due
          </p>

          <p className="mt-0.5 text-2xl font-bold tracking-tight text-[#d1234c]">
            ${total.toLocaleString("en-US", { maximumFractionDigits: 2 })}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {canCancel && (
            <button
              onClick={handleCancelBooking}
              type="button"
              title="Cancel booking"
              aria-label="Cancel booking"
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 transition-colors hover:border-rose-300 hover:bg-rose-100 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/15"
            >
              <CircleX size={14} />
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default BookingCard;
