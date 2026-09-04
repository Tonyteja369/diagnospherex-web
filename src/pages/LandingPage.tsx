import HeroSection from '../components/sections/HeroSection';
import InteractiveReport from '../components/sections/InteractiveReport';
import QuotesSection from '../components/sections/QuotesSection';
import PlatformCapabilities from '../components/sections/PlatformCapabilities';
import TechCodeSnippet from '../components/sections/TechCodeSnippet';
import Security from '../components/sections/Security';
import CareersSection from '../components/sections/CareersSection';
import WhyBuilding from '../components/sections/WhyBuilding';
import LogoShowcase from '../components/sections/LogoShowcase';
import CallToAction from '../components/sections/CallToAction';
import ThreeHeroBackground from '../components/ThreeHeroBackground';

const LandingPage = () => {
  return (
    <div className="landing-page-root">
      {/* 1. Hero Section with low-power 3D particle constellation */}
      <div style={{ position: 'relative' }}>
        <ThreeHeroBackground />
        <HeroSection />
      </div>

      {/* 2. Live Interactive Demo */}
      <InteractiveReport />

      {/* 3. Quotes / Clinical Testimonials */}
      <QuotesSection />

      {/* 4. Core Platform Capabilities */}
      <PlatformCapabilities />

      {/* 5. Technical Architecture & ICMR Code Snippet */}
      <TechCodeSnippet />

      {/* 6. Security & Enclave Standards */}
      <Security />

      {/* 7. Careers & Internships Section */}
      <CareersSection />

      {/* 8. Purpose & Founder Story Strip */}
      <WhyBuilding />

      {/* 9. Brand Identity Showcase */}
      <LogoShowcase />

      {/* 10. Waitlist CTA & Progressive Onboarding Stepper */}
      <CallToAction />
    </div>
  );
};

export default LandingPage;
