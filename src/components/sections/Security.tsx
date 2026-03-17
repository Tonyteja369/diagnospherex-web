import { motion } from 'framer-motion';
import '../../styles/Security.css';

const PRINCIPLES = [
  {
    icon: '🔒',
    title: 'Secure Data Handling',
    desc: 'Medical data is intended to be processed through encrypted communication channels and stored using protected infrastructure designed to reduce unauthorized access risks.',
    delay: 0,
  },
  {
    icon: '🛡️',
    title: 'Controlled Access',
    desc: 'The platform architecture is planned to include authentication systems and role-based access controls so that sensitive medical information can only be accessed by authorized users.',
    delay: 0.1,
  },
  {
    icon: '🔍',
    title: 'Privacy-Focused Architecture',
    desc: 'The system is designed to minimize unnecessary exposure of sensitive patient information while enabling AI models to analyze medical data responsibly.',
    delay: 0.2,
  },
  {
    icon: '⚙️',
    title: 'Responsible AI Processing',
    desc: 'AI systems within DiagnoSphereX are intended to follow strict data-handling practices to ensure that clinical information is processed carefully and ethically.',
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
          <p className="security-eyebrow">Platform Principles</p>
          <h2 className="section-title">
            Security-First <span className="text-gradient">System Design</span>
          </h2>
          <p className="security-desc">
            DiagnoSphereX is being developed with privacy and security as foundational system principles.
            As the platform evolves, our architecture is designed to protect sensitive medical information
            through careful data handling, controlled access, and modern encryption practices.
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

        {/* Transparency statement */}
        <motion.div
          className="transparency-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="transparency-dot" />
          <div>
            <p className="transparency-label">Platform Status</p>
            <p className="transparency-text">
              DiagnoSphereX is currently under active development.
              Security infrastructure and compliance measures will continue to evolve as the platform grows.
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
