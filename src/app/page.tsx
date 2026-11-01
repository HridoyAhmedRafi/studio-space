import { Suspense } from "react";

import BannerPage from "@/components/home/banner";
import CategorySection from "@/components/home/CategorySection";
import FeaturedSection from "@/components/home/FeaturedSection";
import HostGuarantee from "@/components/home/host-guarantee";
import HowItWorks from "@/components/home/how-it-works";
import {
  CategorySectionSkeleton,
  FeaturedSectionSkeleton,
} from "@/components/shared/skeletons";

const HomePage = () => {
  return (
    <div>
      <BannerPage />

      <Suspense fallback={<FeaturedSectionSkeleton />}>
        <FeaturedSection />
      </Suspense>

      <Suspense fallback={<CategorySectionSkeleton />}>
        <CategorySection />
      </Suspense>

      <HowItWorks />
      <HostGuarantee />
    </div>
  );
};

export default HomePage;
