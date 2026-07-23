import { motion, Variants } from 'framer-motion';
import '../../styles/ResearchSection.css';

const RESEARCH_CARDS = [
  {
    emoji: '🧠',
    title: 'Human Intelligence Engine (HIE)',
    subtitle: 'Flagship Research Initiative',
    status: 'Research Vision',
    statusColor: '#6236FF',
    description:
      'The Human Intelligence Engine (HIE) is DiagnoSphereX\u2019s flagship long-term research initiative focused on creating explainable physiological intelligence systems capable of learning from multimodal biomedical signals while keeping humans at the center of every decision.',
    cta: 'Explore Vision',
  },
  {
    emoji: '🧠',
    title: 'NeuroSenseX',
    subtitle: 'EEG Intelligence Platform',
    status: 'In Development',
    statusColor: '#2FD3FF',
    description:
      'An advanced EEG intelligence platform for signal processing, explainable AI, brain visualization, neuroscience research, and AI-assisted clinical documentation.',
    cta: null,
  },
  {
    emoji: '❤️',
    title: 'MedQuantum-NIN',
    subtitle: 'Quantum-Inspired ECG Intelligence',
    status: 'Research Paper',
    statusColor: '#10B981',
    description:
      'A research framework exploring uncertainty-aware ECG signal intelligence using quantum-inspired computational methods and explainable biomedical AI.',
    cta: null,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const ResearchSection = () => {
  return (
    <section className="research-section" id="research">
      <div className="container">
        <div className="research-header">
          <motion.p
            className="research-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            RESEARCH & INNOVATION
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Research & <span className="text-gradient">Innovation</span>
          </motion.h2>
          <motion.p
            className="research-subtitle"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Building the next generation of explainable biomedical intelligence systems.
          </motion.p>
        </div>

        <div className="research-cards-grid">
          {RESEARCH_CARDS.map((card, i) => (
            <motion.div
              key={i}
              className="research-card glass-panel"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Glow accent */}
              <div
                className="rc-glow"
                style={{
                  background: `radial-gradient(circle at 30% 20%, ${card.statusColor}18, transparent 70%)`,
                }}
              />

              <div className="rc-top">
                <span className="rc-emoji">{card.emoji}</span>
                <span
                  className="rc-status"
                  style={{
                    color: card.statusColor,
                    borderColor: `${card.statusColor}55`,
                    background: `${card.statusColor}12`,
                  }}
                >
                  {card.status}
                </span>
              </div>

              <h3 className="rc-title">{card.title}</h3>
              <p className="rc-subtitle">{card.subtitle}</p>
              <p className="rc-desc">{card.description}</p>

              {card.cta && (
                <button className="rc-cta">
                  {card.cta}
                  <span className="rc-cta-arrow">→</span>
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
