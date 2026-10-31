import StudioFilter from "@/components/dashboard-components/StudioFilter";

const ExploreStudioPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`, {
    cache: "no-store",
  });
  const studios = await res.json();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#cd274e]">
          Full Marketplace Catalog
        </p>

        <h1 className="text-3xl font-bold sm:text-4xl">
          Explore Creative Studios
        </h1>

        <p className="mt-2 text-muted-foreground">
          Discover sound stages, photography studios, podcast hubs, and creative
          spaces.
        </p>
      </div>

      <StudioFilter studios={studios} key={studios._id} />
    </div>
  );
};

export default ExploreStudioPage;
