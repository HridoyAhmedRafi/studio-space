import { IStudio } from "@/lib/studio-type";
import {
  MapPin,
  Users,
  Wallet,
  ExternalLink,
  Pencil,
  Trash2,
  Clapperboard,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MyListingCard = ({ listingData }: { listingData: IStudio }) => {
  const {
    _id,
    title,
    category,
    capacity,
    hourlyRate,
    securityDeposit,
    location,
    imageUrl,
  } = listingData;

  return (
    <div className="cursor-pointer group overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#CD274E]/40 hover:shadow-md dark:border-gray-800 dark:bg-[#0F172A] dark:hover:border-[#CD274E]/40">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        {/* Studio Image */}
        <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 sm:h-44 lg:h-32 lg:w-44">
          <Image
            src={imageUrl}
            alt={title}
            loading="lazy"
            height={128}
            width={176}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Studio Information */}
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#CD274E]/10 px-2.5 py-1 text-xs font-semibold text-[#CD274E] dark:bg-[#CD274E]/15 dark:text-[#F47291]">
              <Clapperboard size={13} />
              {category}
            </span>
          </div>

          <h3 className="line-clamp-2 text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#CD274E] dark:text-white dark:group-hover:text-[#F47291]">
            {title}
          </h3>

          <p className="mt-2 flex items-start gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <MapPin size={15} className="mt-0.5 shrink-0 text-[#CD274E]" />
            <span className="line-clamp-1">{location}</span>
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
            <span className="inline-flex items-center gap-1.5">
              <Users size={15} className="text-gray-400" />
              {capacity} People
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Wallet size={15} className="text-gray-400" />
              Deposit: ${securityDeposit}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-5 border-t border-gray-100 pt-4 dark:border-gray-800 lg:min-w-52 lg:flex-col lg:items-end lg:justify-center lg:border-l lg:border-t-0 lg:py-2 lg:pl-6 lg:pt-0">
          <div className="lg:text-right">
            <p className="mb-1 text-xs font-medium text-gray-400">
              Hourly Rate
            </p>

            <div className="flex items-baseline gap-0.5 lg:justify-end">
              <span className="text-2xl font-bold tracking-tight text-[#CD274E] dark:text-[#F47291]">
                ${hourlyRate}
              </span>
              <span className="text-sm font-medium text-gray-400">/hr</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/studios/${_id}`}
              title="View Studio"
              aria-label="View Studio"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all hover:border-[#CD274E]/40 hover:bg-[#CD274E]/10 hover:text-[#CD274E] dark:border-gray-700 dark:text-gray-400 dark:hover:bg-[#CD274E]/15 dark:hover:text-[#F47291]"
            >
              <ExternalLink size={16} />
            </Link>

            <Link
              href={`/dashboard/edit-studio/${_id}`}
              title="Edit Studio"
              aria-label="Edit Studio"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
            >
              <Pencil size={16} />
            </Link>

            <button
              type="button"
              title="Delete Studio"
              aria-label="Delete Studio"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyListingCard;
