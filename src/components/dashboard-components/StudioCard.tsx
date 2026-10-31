import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IStudio } from "@/lib/studio-type";

const StudioCard = ({ studio }: { studio: IStudio }) => {
  return (
    <div className=" group cursor-pointer overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#d1234c]">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={studio.imageUrl}
          alt={studio.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <Badge className="absolute left-3 top-3 border-0 bg-white text-[#cd274e] hover:bg-white">
          {studio.category}
        </Badge>
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        <div>
          <h3 className="line-clamp-1 text-lg font-semibold">{studio.title}</h3>

          <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0" />
            <span className="line-clamp-1">{studio.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-xs text-muted-foreground">Hourly rate</p>
            <p className="text-xl font-bold text-[#cd274e]">
              ${studio.hourlyRate}
              <span className="text-sm font-normal text-muted-foreground">
                /hr
              </span>
            </p>
          </div>

          <Link
            href={`/studios/${studio._id}`}
            className="inline-flex h-9 items-center justify-center gap-1 rounded-md bg-[#cd274e] px-4 text-sm font-medium text-white transition-colors hover:bg-[#b92144]"
          >
            View Details
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudioCard;
