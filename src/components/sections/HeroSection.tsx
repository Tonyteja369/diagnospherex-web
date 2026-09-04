import { motion } from 'framer-motion';
import { Sparkles, GraduationCap, Users, ArrowRight } from 'lucide-react';
import HeroPhoneMockups from './HeroPhoneMockups';
import '../../styles/HeroSection.css';

interface HeroSectionProps {
  onOpenModal?: () => void;
}

const HeroSection = ({ onOpenModal }: HeroSectionProps) => {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-container">
        <div className="hero-content">

          {/* ── LEFT: Text Content ── */}
          <div className="hero-text-container">

            {/* Research Status Eyebrow Badge */}
            <motion.div
              className="hero-eyebrow-badge"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Sparkles size={14} className="badge-icon" />
              <span>Flagship Research Initiative · AI Healthcare</span>
            </motion.div>

            {/* Headline with gradient on key words */}
            <motion.h1 
              className="hero-headline"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              Transforming Complex Medical Data into <span className="text-gradient">Clinical Intelligence</span>.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="hero-subheadline"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Explainable AI that helps patients, clinicians, researchers, and healthcare innovators better understand complex medical information with clarity, transparency, and confidence.
            </motion.p>

            {/* Actions: Primary CTA, Social Proof & Internship Badge */}
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="hero-cta-group">
                <button
                  className="btn-primary"
                  onClick={onOpenModal}
                >
                  Join the waitlist for free
                  <ArrowRight size={16} />
                </button>

                <div className="social-proof-badge">
                  <div className="avatar-group">
                    <div className="avatar" style={{ background: '#818CF8' }}>Dr</div>
                    <div className="avatar" style={{ background: '#A78BFA' }}>AI</div>
                    <div className="avatar" style={{ background: '#60A5FA' }}>R</div>
                  </div>
                  <span className="social-proof-text">
                    <Users size={13} className="inline-icon" />
                    <strong>50+</strong> Researchers, Students & Innovators
                  </span>
                </div>
              </div>

              {/* Internship Hiring Badge */}
              <div className="internship-badge">
                <div className="ib-left">
                  <div className="ib-icon-wrap">
                    <GraduationCap size={16} />
                  </div>
                  <div className="ib-text">
                    <span className="ib-title">Research & Engineering Internship Applications Open</span>
                    <span className="ib-tags">Biomedical AI · Healthcare · Full Stack · AI Agents</span>
                  </div>
                </div>
                <a href="#about" className="ib-link">
                  <span>Apply Now</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Phone Mockups Visual ── */}
          <motion.div 
            className="hero-visual-container"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroPhoneMockups />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
