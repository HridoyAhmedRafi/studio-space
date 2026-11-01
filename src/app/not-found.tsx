import Link from "next/link";
import { ArrowRight, Clapperboard } from "lucide-react";

const StudioIllustration = () => (
  <svg
    viewBox="0 0 260 200"
    role="img"
    aria-label="An empty film clapperboard under a spotlight"
    className="mx-auto h-44 w-auto sm:h-52"
  >
    <defs>
      <linearGradient id="spotlight" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#d1234c" stopOpacity="0.28" />
        <stop offset="100%" stopColor="#d1234c" stopOpacity="0" />
      </linearGradient>

      <linearGradient id="board" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#d1234c" />
        <stop offset="100%" stopColor="#8f1733" />
      </linearGradient>
    </defs>

    {/* Spotlight beam */}
    <path d="M130 6 62 132h136L130 6Z" fill="url(#spotlight)" />

    {/* Ground shadow */}
    <ellipse
      cx="130"
      cy="176"
      rx="82"
      ry="9"
      fill="currentColor"
      className="text-[#d1234c]/15"
    />

    {/* Clapper sticks */}
    <g transform="rotate(-6 130 76)">
      <rect x="62" y="52" width="136" height="22" rx="6" fill="#1f2937" />
      {[0, 1, 2, 3, 4].map((index) => (
        <rect
          key={index}
          x={74 + index * 26}
          y="52"
          width="11"
          height="22"
          rx="3"
          fill="#ffffff"
          opacity="0.9"
          transform={`skewX(-18)`}
        />
      ))}
    </g>

    {/* Board body */}
    <rect
      x="62"
      y="78"
      width="136"
      height="82"
      rx="10"
      fill="url(#board)"
    />

    <rect
      x="74"
      y="92"
      width="112"
      height="54"
      rx="6"
      fill="#ffffff"
      opacity="0.12"
    />

    <text
      x="130"
      y="130"
      textAnchor="middle"
      fontFamily="var(--font-geist-sans), system-ui, sans-serif"
      fontSize="34"
      fontWeight="700"
      fill="#ffffff"
    >
      404
    </text>

    {/* Sparkles */}
    <g className="text-[#d1234c]" fill="currentColor">
      <circle cx="42" cy="66" r="3" opacity="0.5" />
      <circle cx="219" cy="98" r="4" opacity="0.35" />
      <circle cx="205" cy="46" r="2.5" opacity="0.55" />
      <circle cx="54" cy="128" r="2.5" opacity="0.4" />
    </g>
  </svg>
);

const NotFound = () => {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-[#F8F9FC] px-4 py-16 dark:bg-[#020618]">
      <div className="mx-auto w-full max-w-xl text-center">
        <StudioIllustration />

        <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d1234c]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#d1234c] dark:bg-[#d1234c]/15 dark:text-[#f47291]">
          <Clapperboard className="size-3.5" />
          Error 404
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          This set is empty
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
          The page you are looking for has already wrapped, moved, or never made
          it past pre-production. Let&apos;s get you back on set.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#d1234c] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#b51f43] sm:w-auto"
          >
            Return to Home
            <ArrowRight className="size-4" />
          </Link>

          <Link
            href="/studios"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-transparent dark:text-gray-300 dark:hover:bg-gray-800 sm:w-auto"
          >
            Browse Studios
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
