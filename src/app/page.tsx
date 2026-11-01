import BannerPage from "@/components/home/banner";
import CategorySection from "@/components/home/CategorySection";
import FeaturedSection from "@/components/home/FeaturedSection";
import HostGuarantee from "@/components/home/host-guarantee";
import HowItWorks from "@/components/home/how-it-works";

const HomePage = () => {
  return (
    <div>
      <BannerPage />
      <FeaturedSection />
      <CategorySection />
      <HowItWorks />
      <HostGuarantee />
    </div>
  );
};

export default HomePage;
