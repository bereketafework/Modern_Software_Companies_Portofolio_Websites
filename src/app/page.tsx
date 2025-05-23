import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import TechExpertiseSection from "@/components/sections/TechExpertiseSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <TechExpertiseSection /> {/* This section also includes the "About Us" / "Development Process" part */}
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
