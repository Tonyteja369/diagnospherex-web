import { motion, Variants } from 'framer-motion';
import HeroPhoneMockups from './HeroPhoneMockups';
import '../../styles/HeroSection.css';

interface HeroSectionProps {
  onOpenModal?: () => void;
}

/* ── Liquid character animation ── */
const LIQUID_WORDS = ['Real Insights'];

const charVariants: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.6 + i * 0.045,
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

            {/* Liquid Headline */}
            <h1 className="hero-headline" aria-label="From Reports to Real Insights Instantly">
              <motion.span
                className="hero-line"
                custom={0}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                style={{ display: 'block' }}
              >
                From Reports to
              </motion.span>

              {/* LIQUID animated gradient text — character by character */}
              <span className="hero-line liquid-line" style={{ display: 'block' }}>
                <LiquidText text={LIQUID_WORDS[0]} />
              </span>

              <motion.span
                className="hero-line"
                custom={2}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                style={{ display: 'block' }}
              >
                <span className="desktop-only-dash">— </span>Instantly
              </motion.span>
            </h1>

            <motion.p
              className="hero-subheadline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <span className="desktop-only text-inherit">
                AI That Explains, Not Just Analyzes. Transform complex medical data
                into clear, actionable intelligence in seconds.
              </span>
              <span className="mobile-only text-inherit">
                AI That Explains, Not Just Analyzes. Transform your medical reports
                into clear, instant insights built for Indian clinical standards.
              </span>
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
                Join Early Access
              </button>

              <div className="social-proof-badge">
                <div className="avatar-group">
                  <div className="avatar" style={{ background: '#4F46E5', left: 0 }} />
                  <div className="avatar" style={{ background: '#EC4899', left: '16px' }} />
                  <div className="avatar" style={{ background: '#10B981', left: '32px' }} />
                </div>
                <span><strong>50+</strong> early users joining</span>
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
