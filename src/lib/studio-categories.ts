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

export const isStudioCategory = (
  value?: string | null,
): value is StudioCategory =>
  !!value && (STUDIO_CATEGORIES as readonly string[]).includes(value);
