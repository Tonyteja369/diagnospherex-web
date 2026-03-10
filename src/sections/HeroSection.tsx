
import { motion } from 'framer-motion';
import MobileAppPreview from '../components/MobileAppPreview';
import FloatingUIPreview from '../components/FloatingUIPreview';
import './HeroSection.css';

interface HeroSectionProps {
  onNavigate?: () => void;
}

const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-background">
        <div className="gradient-waves" />
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-text-container">
            <motion.h1
              className="hero-headline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Medical Intelligence,<br />
              Reimagined with <span className="text-gradient">AI</span>
            </motion.h1>

            <motion.p
              className="hero-subheadline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              DiagnoSphereX transforms complex medical reports,<br />
              clinical data, and diagnostic information into<br />
              clear, actionable insights powered by artificial intelligence.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button className="btn-primary ripple-btn glow-effect elevation-3d">
                Try AI Report Simplifier
              </button>
              <button 
                className="btn-secondary ripple-btn glow-effect elevation-3d"
                onClick={onNavigate}
              >
                Watch Demo
              </button>
            </motion.div>
            
            <FloatingUIPreview />
          </div>

          <div className="hero-3d-container">
            <MobileAppPreview />
          </div>
        </div>
      </div>
      

    </section>
  );
};

export default HeroSection;
