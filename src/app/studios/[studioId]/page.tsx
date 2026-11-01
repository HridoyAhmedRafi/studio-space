import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Users,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Mail,
} from "lucide-react";

import { IStudio } from "@/lib/studio-type";
import StudioGallery from "@/components/dashboard-components/StudioGallery";
import BookingModal from "@/components/dashboard-components/BookingModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type Review = {
  _id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

type StudioDetails = IStudio & {
  gallery?: string[];
  reviews?: Review[];
};

type ParamsProps = {
  params: Promise<{
    studioId: string;
  }>;
};

const StudioDetailsPage = async ({ params }: ParamsProps) => {
  const { studioId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const user = session?.user;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/studios/${studioId}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Studio Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          This studio may have been removed or is no longer available.
        </p>

        <Link
          href="/studios"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#cd274e] hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back to Studios
        </Link>
      </div>
    );
  }

  const studio = (await res.json()) as StudioDetails;

  const amenities = Array.isArray(studio.amenities)
    ? studio.amenities
    : typeof studio.amenities === "string"
      ? studio.amenities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  const reviews = studio.reviews ?? [];

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-8">
      {/* Back Navigation */}
      <Link
        href="/studios"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-[#cd274e]"
      >
        <ArrowLeft className="size-4" />
        Back to Studios
      </Link>

      {/* Gallery */}
      <StudioGallery
        images={[studio.imageUrl, ...(studio.gallery ?? [])].filter(Boolean)}
        title={studio.title}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-10">
          {/* Studio Heading */}
          <section className="space-y-4 border-b pb-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#cd274e]/10 px-3 py-1 text-xs font-semibold text-[#cd274e]">
                {studio.category}
              </span>

              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <CheckCircle2 className="size-3.5 text-green-600" />
                Available for booking
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {studio.title}
            </h1>

            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-[#cd274e]" />
              {studio.location}
            </p>

            <p className="max-w-3xl leading-7 text-muted-foreground">
              {studio.overview || "No description has been provided yet."}
            </p>
          </section>

          {/* Specifications */}
          <section className="space-y-5">
            <div>
              <h2 className="text-xl font-bold">Workspace Specifications</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Everything you need to know about this creative space.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Specification
                icon={<Users className="size-5" />}
                label="Maximum Capacity"
                value={`${studio.capacity} People`}
              />

              <Specification
                icon={<Clock className="size-5" />}
                label="Hourly Rate"
                value={`$${studio.hourlyRate} / hour`}
              />

              <Specification
                icon={<ShieldCheck className="size-5" />}
                label="Security Deposit"
                value={`$${studio.securityDeposit}`}
              />

              <Specification
                icon={<MapPin className="size-5" />}
                label="Location"
                value={studio.location}
              />
            </div>
          </section>

          {/* Amenities */}
          <section className="space-y-5">
            <div>
              <h2 className="text-xl font-bold">Available Amenities</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Facilities and equipment available in this workspace.
              </p>
            </div>

            {amenities.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {amenities.map((amenity, index) => (
                  <div
                    key={`${amenity}-${index}`}
                    className="flex items-center gap-3 rounded-xl border p-4"
                  >
                    <CheckCircle2 className="size-4 shrink-0 text-[#cd274e]" />
                    <span className="text-sm font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
                No amenities have been listed yet.
              </p>
            )}
          </section>

          {/* Host Details */}
          <section className="space-y-5">
            <div>
              <h2 className="text-xl font-bold">Meet Your Host</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Get to know the person managing this workspace.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 rounded-xl border p-5">
              <div className="flex size-14 items-center justify-center rounded-full bg-[#cd274e]/10 text-xl font-bold text-[#cd274e]">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={studio.ownerName || "Host"}
                    width={56}
                    height={56}
                    className="size-full object-cover"
                  />
                ) : (
                  studio.ownerName?.charAt(0)?.toUpperCase() || "U"
                )}
              </div>

              <div className="min-w-0">
                <h3 className="font-semibold">
                  {studio.ownerName || "Studio Host"}
                </h3>

                <p className="mt-1 flex items-center gap-2 break-all text-sm text-muted-foreground">
                  <Mail className="size-4 shrink-0" />
                  {studio.ownerEmail}
                </p>
              </div>
            </div>
          </section>

          {/* Reviews */}
          {/* <section className="space-y-5">
            <div>
              <h2 className="text-xl font-bold">Guest Reviews</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Feedback from people who have used this workspace.
              </p>
            </div>

            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review._id} className="rounded-xl border p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold">{review.userName}</h3>

                      <span className="flex items-center gap-1 text-sm font-medium">
                        <Star className="size-4 fill-yellow-400 text-yellow-400" />
                        {review.rating}/5
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed px-5 py-10 text-center">
                <Star className="mx-auto size-8 text-muted-foreground/50" />
                <h3 className="mt-3 font-semibold">No Reviews Yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Be the first to share your experience with this studio.
                </p>
              </div>
            )}
          </section> */}
        </div>

        {/* Booking Card */}
        <aside className="lg:sticky lg:top-24">
          <div className="space-y-5 rounded-2xl border bg-card p-6 shadow-sm">
            <div>
              <p className="text-sm text-muted-foreground">Starting from</p>

              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-3xl font-bold">${studio.hourlyRate}</span>
                <span className="text-sm text-muted-foreground">/ hour</span>
              </div>
            </div>

            <div className="space-y-3 border-y py-5 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Security Deposit</span>
                <span className="font-semibold">${studio.securityDeposit}</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Capacity</span>
                <span className="font-semibold">{studio.capacity} People</span>
              </div>
            </div>

            <BookingModal studio={studio} />

            <p className="text-center text-xs leading-5 text-muted-foreground">
              Choose your preferred date and time to request a booking.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
};

const Specification = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-4 rounded-xl border p-4">
    <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#cd274e]/10 text-[#cd274e]">
      {icon}
    </div>

    <div className="min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold">{value}</p>
    </div>
  </div>
);

export default StudioDetailsPage;
