// Single source of truth for studio categories.
// These values must match the `category` strings stored on studio documents,
// because the studio filter uses an exact match.
export const STUDIO_CATEGORIES = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
  "Creative Space",
] as const;

export type StudioCategory = (typeof STUDIO_CATEGORIES)[number];

export const ALL_STUDIOS = "All Studios";

// Friendly display labels for the five marketing categories. `value` must stay
// in sync with STUDIO_CATEGORIES because filters use an exact match.
export const POPULAR_CATEGORY_LINKS: { label: string; value: StudioCategory }[] =
  [
    { label: "Photo Studios", value: "Photo Studio" },
    { label: "Sound Stages", value: "Film Stage" },
    { label: "Podcast Rooms", value: "Podcast Lounge" },
    { label: "Music Suites", value: "Music Suite" },
    { label: "Art Workshops", value: "Workshop" },
  ];

export const isStudioCategory = (
  value?: string | null,
): value is StudioCategory =>
  !!value && (STUDIO_CATEGORIES as readonly string[]).includes(value);
