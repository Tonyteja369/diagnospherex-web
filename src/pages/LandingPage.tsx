import { useState } from 'react';
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
import LogoShowcase from '../components/sections/LogoShowcase';
import CallToAction from '../components/sections/CallToAction';
import EarlyAccessModal from '../components/EarlyAccessModal';
import SmoothScroll from '../components/SmoothScroll';
import LiquidGlassFilter from '../components/LiquidGlassFilter';
import ThreeHeroBackground from '../components/ThreeHeroBackground';
import Grainient from '../components/reactbits/Grainient';
import { useLiquidGlassTracking } from '../hooks/useLiquidGlassTracking';

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Activate dynamic specular highlight tracking on all .liquid-glass surfaces
  useLiquidGlassTracking();

  return (
    <SmoothScroll>
      {/* Hidden SVG filter for true Liquid Glass refractive distortion */}
      <LiquidGlassFilter />

      {/* Entire Site Background: Dynamic Animated WebGL Grainient */}
      <Grainient
        color1="#ff08f6"
        color2="#46005e"
        color3="#49008e"
        timeSpeed={0.85}
        colorBalance={0.0}
        warpStrength={1.0}
        warpFrequency={12}
        warpSpeed={2.0}
        warpAmplitude={50.0}
        blendAngle={0.0}
        blendSoftness={0.05}
        rotationAmount={500.0}
        noiseScale={0}
        grainAmount={0}
        grainScale={0.2}
        grainAnimated={false}
        contrast={1.5}
        gamma={1.0}
        saturation={1.0}
        centerX={0.0}
        centerY={0.0}
        zoom={0.9}
      />

      <div className="landing-page-root">
        {/* Subtle cursor */}
        <Cursor />

        {/* 1. Nav: Light-default with Dark Toggle, CTA, and Clean Links */}
        <Navbar onOpenModal={() => setIsModalOpen(true)} />
        
        <main>
          {/* 2. Hero: Light/Dark adaptive with Scroll-Driven 3D Parallax */}
          {/* ThreeHeroBackground is positioned absolute inside the hero section */}
          <div style={{ position: 'relative' }}>
            <ThreeHeroBackground />
            <HeroSection onOpenModal={() => setIsModalOpen(true)} />
          </div>

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

          {/* 10. Brand Identity Showcase: GlassSurface Tiles + MetallicPaint Icon Mark */}
          <LogoShowcase />

          {/* 11. Waitlist CTA: Full-Width Gradient Shimmer Section */}
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
    </SmoothScroll>
  );
};

export default LandingPage;

