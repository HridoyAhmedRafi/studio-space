"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import {
  A11y,
  Autoplay,
  EffectFade,
  Keyboard,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "cn";

import { buttonVariants } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    eyebrow: "Creative spaces, on demand",
    title: "Find the perfect space for your next shoot",
    subtitle:
      "Photography cyc walls, cinema sound stages, podcast lounges and music suites — discover, filter and book by the hour with transparent pricing.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1920&q=80",
    alt: "Bright modern creative studio with large windows",
  },
  {
    eyebrow: "For filmmakers, photographers & musicians",
    title: "From cyc walls to sound stages — create without limits",
    subtitle:
      "Inspect real-time availability, compare gear and rates, and lock in the exact hours your production needs.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1920&q=80",
    alt: "Designer workspace filled with natural light",
  },
  {
    eyebrow: "For studio hosts",
    title: "Turn your studio into steady income",
    subtitle:
      "List your cyc wall, sound stage, podcast lounge or workshop and reach creators who are booking spaces right now.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1920&q=80",
    alt: "Open-plan studio interior with seating areas",
  },
];

const slideImageStyle: CSSProperties = {
  "--swiper-pagination-color": "#d1234c",
  "--swiper-pagination-bullet-inactive-color": "#ffffff",
  "--swiper-pagination-bullet-inactive-opacity": "0.5",
} as CSSProperties;

const navButtonClass =
  "hero-nav absolute top-1/2 z-20 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white backdrop-blur transition-colors hover:bg-black/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:flex";

const BannerPage = () => {
  return (
    <section
      className="relative isolate"
      aria-roledescription="carousel"
      aria-label="Featured studios"
    >
      <h1 className="sr-only">
        StudioSpace — book creative studios by the hour
      </h1>

      <Swiper
        modules={[A11y, Autoplay, EffectFade, Keyboard, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={700}
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        navigation={{ prevEl: ".hero-prev", nextEl: ".hero-next" }}
        pagination={{ clickable: true }}
        a11y={{ enabled: true }}
        className="h-140 w-full sm:h-155 lg:h-170"
        style={slideImageStyle}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.title}>
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="100vw"
                className="object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/55 to-black/20" />

              <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pb-16 sm:px-6 lg:px-8">
                <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
                  <Sparkles
                    className="size-3.5 text-[#f06a8f]"
                    aria-hidden="true"
                  />
                  {slide.eyebrow}
                </span>

                <h2 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h2>

                <p className="mt-4 max-w-xl text-base text-white/80 sm:text-lg">
                  {slide.subtitle}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/studios"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "h-11 rounded-lg bg-[#d1234c] px-6 text-white shadow-sm shadow-[#d1234c]/30 hover:bg-[#d1234c]/90 focus-visible:border-[#d1234c] focus-visible:ring-[#d1234c]/30",
                    )}
                  >
                    Explore Studios
                  </Link>
                  <Link
                    href="/studios"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "h-11 rounded-lg border-white/30 bg-white/10 px-6 text-white backdrop-blur hover:bg-white/20 hover:text-white",
                    )}
                  >
                    Host Your Space
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        aria-label="Previous slide"
        className={cn(navButtonClass, "hero-prev left-4")}
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        className={cn(navButtonClass, "hero-next right-4")}
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>
    </section>
  );
};

export default BannerPage;
