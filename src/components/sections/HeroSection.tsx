
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
              style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}
            >
              <button 
                className="btn-primary ripple-btn glow-effect elevation-3d"
                onClick={onOpenModal}
                style={{ padding: '16px 32px', fontSize: '1.1rem' }}
              >
                Join Early Access
              </button>

              <div 
                className="social-proof-badge" 
                style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '8px' }}
              >
                <div style={{ display: 'flex', position: 'relative', width: '60px', height: '28px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#4F46E5', position: 'absolute', left: 0, border: '2px solid var(--color-bg-black)' }}></div>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#EC4899', position: 'absolute', left: '16px', border: '2px solid var(--color-bg-black)' }}></div>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#10B981', position: 'absolute', left: '32px', border: '2px solid var(--color-bg-black)' }}></div>
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
