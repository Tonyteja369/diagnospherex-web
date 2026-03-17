
import { motion } from 'framer-motion';
import MobileAppPreview from '../MobileAppPreview';
import FloatingUIPreview from '../FloatingUIPreview';
import '../../styles/HeroSection.css';

interface HeroSectionProps {
  onOpenModal?: () => void;
}

const HeroSection = ({ onOpenModal }: HeroSectionProps) => {
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
              From Reports to <br />
              <span className="text-gradient">Real Insights</span> — Instantly
            </motion.h1>

            <motion.p
              className="hero-subheadline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              AI That Explains, Not Just Analyzes. Transform complex medical data 
              into clear, actionable intelligence in seconds.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button 
                className="btn-primary ripple-btn glow-effect elevation-3d"
                onClick={onOpenModal}
                style={{ padding: '16px 32px', fontSize: '1.1rem' }}
              >
                Join Early Access
              </button>

              <div className="social-proof-badge">
                <div className="avatar-group">
                  <div className="avatar" style={{ background: '#4F46E5', left: 0 }}></div>
                  <div className="avatar" style={{ background: '#EC4899', left: '16px' }}></div>
                  <div className="avatar" style={{ background: '#10B981', left: '32px' }}></div>
                </div>
                <span><strong>50+</strong> people showed interest • Early users joining</span>
              </div>
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
