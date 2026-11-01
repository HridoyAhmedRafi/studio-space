import { BookingListSkeleton, PageHeaderSkeleton } from "@/components/shared/skeletons";

const MyBookingsLoading = () => (
  <section className="min-h-screen bg-[#F8F9FC] px-4 py-10 dark:bg-[#020618] sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <PageHeaderSkeleton />
      <BookingListSkeleton count={3} />
    </div>
  </section>
);

export default MyBookingsLoading;
