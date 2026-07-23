import { motion } from 'framer-motion';
import '../../styles/ResearchRoadmap.css';

const MILESTONES = [
  {
    year: '2026',
    title: 'NeuroSenseX',
    desc: 'EEG Intelligence Platform',
    color: '#2FD3FF',
  },
  {
    year: '',
    title: 'MedQuantum-NIN',
    desc: 'Quantum-Inspired ECG Intelligence',
    color: '#a855f7',
  },
  {
    year: '',
    title: 'Human Intelligence Engine',
    desc: 'Explainable Physiological Intelligence',
    color: '#6236FF',
  },
  {
    year: 'Future',
    title: 'Multimodal Biomedical Intelligence',
    desc: 'Unified Biomedical Signal Platform',
    color: '#10B981',
  },
];

const ResearchRoadmap = () => {
  return (
    <section className="roadmap-section" id="roadmap">
      <div className="container">
        <div className="roadmap-header">
          <motion.p
            className="roadmap-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            RESEARCH ROADMAP
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Path <span className="text-gradient">Forward</span>
          </motion.h2>
        </div>

        <div className="roadmap-timeline">
          {/* Connecting line */}
          <div className="timeline-line">
            <motion.div
              className="timeline-line-fill"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {MILESTONES.map((m, i) => (
            <motion.div
              key={i}
              className="timeline-node"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Glowing dot */}
              <div className="node-dot-wrapper">
                <div
                  className="node-dot"
                  style={{ background: m.color, boxShadow: `0 0 14px ${m.color}88` }}
                />
                <div
                  className="node-pulse"
                  style={{ borderColor: `${m.color}55` }}
                />
              </div>

              {/* Year label */}
              {m.year && <span className="node-year" style={{ color: m.color }}>{m.year}</span>}

              {/* Content */}
              <div className="node-content">
                <h4 className="node-title">{m.title}</h4>
                <p className="node-desc">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchRoadmap;
