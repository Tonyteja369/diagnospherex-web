import { motion } from 'framer-motion';
import '../../styles/Security.css';

const PRINCIPLES = [
  {
    icon: '🔒',
    title: 'AES-256 Encryption at Rest',
    desc: 'Every health record is encrypted before it touches the database. Each family member\'s data is encrypted independently. Even we cannot read your data.',
    delay: 0,
  },
  {
    icon: '🛡️',
    title: 'Zero Knowledge Architecture',
    desc: 'Encryption keys are derived from your own password. You hold the key. We hold nothing. One-tap permanent deletion removes everything — no hidden copies.',
    delay: 0.1,
  },
  {
    icon: '🇮🇳',
    title: 'ICMR Indian Clinical Standards',
    desc: 'Every reference range is calibrated to Indian age, gender, and regional population using ICMR guidelines. Not WHO global averages built for Western bodies.',
    delay: 0.2,
  },
  {
    icon: '✅',
    title: 'Zero Hallucination Architecture',
    desc: 'Values are extracted and validated by code before the AI ever sees them. The AI explains. The code verifies. You never see a number the AI invented.',
    delay: 0.3,
  },
];

const Security = () => {
  return (
    <section className="security-section" id="security">
      {/* Animated grid background */}
      <div className="security-grid-bg" />

      {/* Top divider glow */}
      <div className="section-divider-glow" />

      <div className="security-inner">
        {/* Header */}
        <motion.div
          className="security-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="security-eyebrow">PLATFORM PRINCIPLES</p>
          <h2 className="section-title">
            Security-First, <span className="text-gradient">India-First System Design</span>
          </h2>
          <p className="security-desc">
            DiagnoSphereX is built with AES-256 encryption, zero-knowledge architecture, and ICMR Indian clinical
            standards as the absolute foundation — not added later, not optional.
          </p>
        </motion.div>

        {/* 2×2 Principle cards grid */}
        <div className="principles-grid">
          {PRINCIPLES.map((p) => (
            <motion.div
              key={p.title}
              className="principle-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: p.delay }}
              style={{ animationDelay: `${p.delay * 1.5}s` }}
            >
              <div className="principle-icon">{p.icon}</div>
              <h3 className="principle-title">{p.title}</h3>
              <p className="principle-desc">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Status bar */}
        <motion.div
          className="transparency-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="transparency-dot" />
          <div>
            <p className="transparency-label">PLATFORM STATUS</p>
            <p className="transparency-text">
              DiagnoSphereX is under active development. Launching in 12 weeks from Vijayawada, Andhra Pradesh.
              Security architecture and ICMR database are being built from day one.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom divider glow */}
      <div className="section-divider-glow" />
    </section>
  );
};

export default Security;
