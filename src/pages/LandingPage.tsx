import { useState } from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import Cursor from '../components/Cursor';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/sections/HeroSection';
import InteractiveReport from '../components/sections/InteractiveReport';
import QuotesSection from '../components/sections/QuotesSection';
import PlatformCapabilities from '../components/sections/PlatformCapabilities';
import TechCodeSnippet from '../components/sections/TechCodeSnippet';
import Security from '../components/sections/Security';
import CareersSection from '../components/sections/CareersSection';
import WhyBuilding from '../components/sections/WhyBuilding';
import CallToAction from '../components/sections/CallToAction';
import EarlyAccessModal from '../components/EarlyAccessModal';

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="landing-page-root">
      {/* Background: Logo-sampled soft radial wash behind hero only */}
      <AnimatedBackground />

      {/* Subtle cursor */}
      <Cursor />

      {/* 1. Nav: Light-default with Dark Toggle, CTA, and Clean Links */}
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      
      <main>
        {/* 2. Hero: Light/Dark adaptive with Scroll-Driven 3D Parallax */}
        <HeroSection onOpenModal={() => setIsModalOpen(true)} />

        {/* 3. Live Interactive Demo: Pinned Walkthrough with Animated States */}
        <InteractiveReport />

        {/* 4. Quotes / Testimonials Block: Large Display Type & Radical Whitespace */}
        <QuotesSection />

        {/* 5. Core Platform Capabilities: 3-Card Grid */}
        <PlatformCapabilities />

        {/* 6. Technical Architecture & Code Snippet: Deterministic ICMR Rules */}
        <TechCodeSnippet />

        {/* 7. Security & Trust: 4-Card Grid & Active Enclave Standards */}
        <Security />

        {/* 8. Careers & Internships: 4 Healthcare-Framed Roles + 3-Step Flow */}
        <CareersSection />

        {/* 9. Purpose & Founder Story Strip */}
        <WhyBuilding />

        {/* 10. Waitlist CTA: Full-Width Gradient Shimmer Section */}
        <CallToAction onOpenModal={() => setIsModalOpen(true)} />
      </main>

      {/* 11. Footer: Clean 4-Column Navigation & Real Contact Email */}
      <Footer />
      
      {/* Priority Waitlist Modal */}
      <EarlyAccessModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default LandingPage;
