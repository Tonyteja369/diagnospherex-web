import { motion, Variants } from 'framer-motion';
import { Sparkles, GraduationCap, Users } from 'lucide-react';
import HeroPhoneMockups from './HeroPhoneMockups';
import '../../styles/HeroSection.css';

interface HeroSectionProps {
  onOpenModal?: () => void;
}

/* ── Liquid character animation ── */
const LIQUID_WORDS = ['Clinical Intelligence.'];

const charVariants: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.6 + i * 0.035,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const LiquidText = ({ text }: { text: string }) => {
  const chars = text.split('');
  return (
    <span className="liquid-word" aria-label={text}>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          className={ch === ' ' ? 'liquid-space' : 'liquid-char liquid-gradient-mask'}
          custom={i}
          variants={charVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
        >
          {ch === ' ' ? '\u00a0' : ch}
        </motion.span>
      ))}
    </span>
  );
};

/* ── Word-reveal for headline lines ── */
const wordVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const HeroSection = ({ onOpenModal }: HeroSectionProps) => {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-background">
        <div className="gradient-waves" />
      </div>

      <div className="hero-full-container">
        <div className="hero-content">

          {/* ── LEFT: Text + CTA ── */}
          <div className="hero-text-container">

            {/* Research Status Badge */}
            <motion.div
              className="research-status-badge"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Sparkles size={14} className="text-cyan" />
              <span>Flagship Research Initiative</span>
            </motion.div>

            {/* Liquid Headline */}
            <h1 className="hero-headline" aria-label="Transforming Complex Medical Data into Explainable Clinical Intelligence">
              <motion.span
                className="hero-line"
                custom={0}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                style={{ display: 'block' }}
              >
                Transforming Complex Medical Data into
              </motion.span>

              {/* LIQUID animated gradient text */}
              <span className="hero-line liquid-line" style={{ display: 'block' }}>
                <LiquidText text={LIQUID_WORDS[0]} />
              </span>
            </h1>

            <motion.p
              className="hero-subheadline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Explainable AI that helps patients, clinicians, researchers, and healthcare innovators better understand complex medical information with clarity, transparency, and confidence.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <button
                className="btn-primary ripple-btn glow-effect"
                onClick={onOpenModal}
              >
                Join the waitlist for free
              </button>

              <div className="social-proof-badge">
                <div className="avatar-group">
                  <div className="avatar" style={{ background: '#4F46E5', left: 0 }} />
                  <div className="avatar" style={{ background: '#EC4899', left: '16px' }} />
                  <div className="avatar" style={{ background: '#10B981', left: '32px' }} />
                </div>
                <span><Users size={14} className="inline mr-1 text-cyan" /> <strong>50+</strong> Researchers, Students & Early Healthcare Innovators</span>
              </div>

              {/* Internship Hiring Badge */}
              <div className="internship-badge">
                <div className="ib-header">
                  <GraduationCap size={20} className="ib-icon text-cyan" />
                  <div>
                    <span className="ib-title">Research & Engineering Internship Applications Open</span>
                    <span className="ib-tags">Biomedical AI • Healthcare • Full Stack • AI Agents • Research</span>
                  </div>
                </div>
                <a href="#careers" className="ib-cta">Apply Now →</a>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Desktop Mockups ── */}
          <div className="hero-3d-container desktop-mockup-wrapper">
            <HeroPhoneMockups />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
