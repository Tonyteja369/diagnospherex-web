
import './App.css';
import AnimatedBackground from './components/AnimatedBackground';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import ProductExplanation from './sections/ProductExplanation';
import PlatformCapabilities from './sections/PlatformCapabilities';
import AIBrainSimulation from './sections/AIBrainSimulation';
import InteractiveReport from './sections/InteractiveReport';
import Security from './sections/Security';
import Careers from './sections/Careers';
import SignatureActivation from './sections/SignatureActivation';
import LogoShowcase from './sections/LogoShowcase';
import CallToAction from './sections/CallToAction';
import DemoPage from './pages/DemoPage';

function App() {
  return (
    <div className="app-container">
      <AnimatedBackground />
      
      <Cursor />
      <Navbar />
      
      <main>
        <HeroSection />
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
    </div>
  );
}

export default App;
