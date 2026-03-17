import { useState } from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import Cursor from '../components/Cursor';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/sections/HeroSection';
import TrustBanner from '../components/sections/TrustBanner';
import ProductExplanation from '../components/sections/ProductExplanation';
import PlatformCapabilities from '../components/sections/PlatformCapabilities';
import AIBrainSimulation from '../components/sections/AIBrainSimulation';
import InteractiveReport from '../components/sections/InteractiveReport';
import Security from '../components/sections/Security';
import Careers from '../components/sections/Careers';
import SignatureActivation from '../components/sections/SignatureActivation';
import LogoShowcase from '../components/sections/LogoShowcase';
import CallToAction from '../components/sections/CallToAction';
import DemoPage from '../pages/DemoPage';
import EarlyAccessModal from '../components/EarlyAccessModal';

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AnimatedBackground />
      <Cursor />
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      
      <main>
        <HeroSection onOpenModal={() => setIsModalOpen(true)} />
        <TrustBanner />
        <ProductExplanation />
        <DemoPage />
        <PlatformCapabilities />
        <AIBrainSimulation />
        <InteractiveReport />
        <Security />
        <Careers />
        <SignatureActivation />
        <LogoShowcase />
        <CallToAction />
      </main>

      <Footer />
      
      <EarlyAccessModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default LandingPage;
