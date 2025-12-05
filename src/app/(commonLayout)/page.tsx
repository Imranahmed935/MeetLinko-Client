import FeaturedTravelPlans from "@/components/Home/FeaturedTravelPlans";
import FinalAction from "@/components/Home/FinalAction";
import HeroSection from "@/components/Home/HeroSection";
import HowItWorks from "@/components/Home/HowItWorks";
import PopularDestinations from "@/components/Home/PopularDestinaitons";
import RecommendedMatches from "@/components/Home/RecommandedMatches";
import SubscriptionPlans from "@/components/Home/SubscriptionPlans";
import Testimonials from "@/components/Home/Testimonials";
import TopRatedTravelers from "@/components/Home/TopRatedTravelers";
import WhyChooseUs from "@/components/Home/WhyChooseUs";

export default function Home() {
  return (
    <main className="flex flex-col gap-20">
      <HeroSection />

      <HowItWorks />

      <WhyChooseUs />

      <PopularDestinations />

      <FeaturedTravelPlans />

      <RecommendedMatches />

      <TopRatedTravelers />

      <SubscriptionPlans />

      <Testimonials />

      <FinalAction />
    </main>
  );
}
