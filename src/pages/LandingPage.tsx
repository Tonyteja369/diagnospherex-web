import { useState } from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import Cursor from '../components/Cursor';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/sections/HeroSection';
import InteractiveReport from '../components/sections/InteractiveReport';
import PlatformCapabilities from '../components/sections/PlatformCapabilities';
import Security from '../components/sections/Security';
import WhyBuilding from '../components/sections/WhyBuilding';
import CallToAction from '../components/sections/CallToAction';
import EarlyAccessModal from '../components/EarlyAccessModal';

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="landing-page-root">
      {/* Ambient background: soft drifting gradient blobs */}
      <AnimatedBackground />

      {/* Subtle cursor */}
      <Cursor />

      {/* 1. Nav: Home / Features / Demo / Security / About + CTA */}
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      
      <main>
        {/* 2. Hero: Light bg, gradient headline word, phone mockup with soft shadow + float */}
        <HeroSection onOpenModal={() => setIsModalOpen(true)} />

        {/* 3. Live Interactive Demo: Moved up, animated progress states */}
        <InteractiveReport />

        {/* 4. Core Features: Report Analyzer / Family Vault / Instant Intelligence */}
        <PlatformCapabilities />

        {/* 5. Security & Trust: 4-card grid, soft gradient icon backgrounds */}
        <Security />

        {/* 6. Why We're Building This: Condensed 3-card row & founder note */}
        <WhyBuilding />

        {/* 7. Waitlist CTA: Full-width soft-gradient section, animated button */}
        <CallToAction onOpenModal={() => setIsModalOpen(true)} />
      </main>

      {/* 8. Footer: About/Careers/Research links, contact email only, social icons */}
      <Footer />
      
      {/* Waitlist Modal */}
      <EarlyAccessModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default LandingPage;
