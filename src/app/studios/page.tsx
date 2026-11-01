import StudioFilter from "@/components/dashboard-components/studio/StudioFilter";

const ExploreStudioPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) => {
  const { category } = await searchParams;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`, {
    cache: "no-store",
  });
  const studios = res.ok ? await res.json() : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d1234c] dark:text-[#f06a8f]">
          Full Marketplace Catalog
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Explore Creative Studios
        </h1>

        <p className="mt-2 text-muted-foreground">
          Discover sound stages, photography studios, podcast hubs, and creative
          spaces.
        </p>
      </div>

      <StudioFilter studios={studios} initialCategory={category} />
    </div>
  );
};

export default ExploreStudioPage;
