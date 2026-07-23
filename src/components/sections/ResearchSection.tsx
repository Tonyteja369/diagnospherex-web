import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  BrainCircuit, 
  HeartPulse, 
  Dna, 
  Cpu, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  FlaskConical,
  BookOpen,
  ShieldCheck,
  Microscope,
  Users
} from 'lucide-react';
import '../../styles/ResearchSection.css';

const METRICS = [
  { label: 'Research Programs', value: '03', icon: FlaskConical },
  { label: 'Research Paper', value: '01', icon: FileText },
  { label: 'Internship Roles', value: '07', icon: Users },
  { label: 'Focus Areas', value: '15+', icon: Microscope },
];

const RESEARCH_PILLARS = [
  {
    icon: BrainCircuit,
    title: 'Brain Intelligence',
    subtitle: 'NeuroSenseX',
    status: 'Active Development',
    statusColor: '#00F5FF',
    description: 'An advanced EEG intelligence platform focused on explainable brain signal analysis, neuroscience research, AI-assisted clinical decision support, biomedical visualization, and intelligent research workflows.',
    areas: ['EEG Intelligence', 'Brain Signal Processing', 'Neuroscience', 'Explainable AI', 'Brain Visualization'],
  },
  {
    icon: HeartPulse,
    title: 'Cardiac Intelligence',
    subtitle: 'MedQuantum-NIN',
    status: 'Research Paper in Preparation',
    statusColor: '#7928CA',
    description: 'An ongoing research initiative exploring quantum-inspired computational frameworks for explainable ECG intelligence, uncertainty-aware biomedical signal analysis, and interpretable cardiac AI.',
    areas: ['ECG Intelligence', 'Signal Processing', 'Wavelets', 'Quantum-Inspired Computing', 'Explainable Cardiac AI'],
  },
  {
    icon: Dna,
    title: 'Physiological Intelligence',
    subtitle: 'Human Intelligence Engine (HIE)',
    badge: 'Flagship Research Program (2026–2035 Vision)',
    status: 'Research Vision',
    statusColor: '#8B5CF6',
    description: 'The Human Intelligence Engine (HIE) is DiagnoSphereX’s flagship research program dedicated to developing explainable physiological intelligence capable of understanding human biology through multimodal biomedical signals, trustworthy AI, and transparent computational reasoning.',
    areas: ['Multimodal Intelligence', 'Computational Medicine', 'Physiological Computing', 'Human-Centered AI', 'Biomedical Foundation Models'],
    longTermGoals: ['Brain Intelligence', 'Cardiac Intelligence', 'Physiological Intelligence', 'Human-AI Collaboration', 'Biomedical Foundation Models', 'Computational Medicine'],
    cta: 'Explore Vision',
  },
  {
    icon: Cpu,
    title: 'Responsible AI',
    subtitle: 'Trust & Transparency',
    status: 'Core Principle',
    statusColor: '#10B981',
    description: 'Ensuring all biomedical AI models maintain rigorous clinical safety, complete interpretability, data privacy, and human clinical oversight by design.',
    areas: ['Explainable AI', 'Privacy', 'Clinical Safety', 'Human Oversight', 'Trustworthy AI'],
  },
];

const PUBLICATIONS = [
  { project: 'MedQuantum-NIN', status: 'Research Paper in Preparation', type: 'Paper' },
  { project: 'NeuroSenseX', status: 'Active Development', type: 'Platform' },
  { project: 'Human Intelligence Engine', status: 'Research Vision', type: 'Vision Paper' },
  { project: 'Future Publications', status: 'Coming Soon', type: 'Upcoming' },
];

const PHILOSOPHY_PRINCIPLES = [
  {
    title: 'Scientific Rigor',
    desc: 'Built upon reproducible research, peer validation, and clinical methodologies.',
    color: '#00F5FF'
  },
  {
    title: 'Explainability',
    desc: 'Every AI decision should be transparent, traceable, and understandable by humans.',
    color: '#7928CA'
  },
  {
    title: 'Human-Centered Design',
    desc: 'Technology should empower clinicians, researchers, and patients—never replace them.',
    color: '#3B82F6'
  },
  {
    title: 'Responsible Innovation',
    desc: 'Privacy, ethics, and security are integrated from the beginning—not added later.',
    color: '#10B981'
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const ResearchSection: React.FC = () => {
  return (
    <section className="research-section" id="research">
      <div className="container">
        
        {/* ── Section Header ── */}
        <div className="research-header">
          <motion.div
            className="research-division-badge"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles size={14} className="text-cyan" />
            <span>Research Division</span>
          </motion.div>

          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient">Research</span>
          </motion.h2>

          <motion.p
            className="research-subtitle"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Exploring the future of explainable biomedical intelligence through AI, neuroscience, computational medicine, and responsible healthcare innovation.
          </motion.p>

          <motion.p
            className="research-intro-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            DiagnoSphereX Research is dedicated to developing trustworthy biomedical intelligence systems that bridge artificial intelligence, signal processing, neuroscience, and healthcare. Every project is grounded in explainability, scientific rigor, privacy, and human-centered design.
          </motion.p>
        </div>

        {/* ── Research Metrics ── */}
        <div className="research-metrics-grid">
          {METRICS.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={i}
                className="metric-card glass-panel"
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="metric-header">
                  <Icon size={18} className="text-cyan" />
                  <span className="metric-value">{m.value}</span>
                </div>
                <span className="metric-label">{m.label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* ── Research Pillars Grid ── */}
        <div className="research-pillars-grid">
          {RESEARCH_PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={i}
                className={`pillar-card glass-panel ${pillar.badge ? 'featured-pillar' : ''}`}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div
                  className="pillar-glow"
                  style={{
                    background: `radial-gradient(circle at 20% 20%, ${pillar.statusColor}22, transparent 70%)`,
                  }}
                />

                <div className="pillar-top">
                  <div className="pillar-icon-box" style={{ color: pillar.statusColor }}>
                    <Icon size={24} />
                  </div>
                  <span
                    className="pillar-status-badge"
                    style={{
                      color: pillar.statusColor,
                      borderColor: `${pillar.statusColor}55`,
                      background: `${pillar.statusColor}18`,
                    }}
                  >
                    {pillar.status}
                  </span>
                </div>

                {pillar.badge && (
                  <span className="pillar-flagship-tag">{pillar.badge}</span>
                )}

                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-subtitle">{pillar.subtitle}</p>
                <p className="pillar-desc">{pillar.description}</p>

                {pillar.longTermGoals && (
                  <div className="pillar-goals">
                    <span className="goals-label">Long-Term Research Goals</span>
                    <div className="goals-grid">
                      {pillar.longTermGoals.map((g, idx) => (
                        <div key={idx} className="goal-item">
                          <CheckCircle2 size={12} className="text-cyan" />
                          <span>{g}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pillar-areas">
                  <span className="areas-label">Research Areas / Domains</span>
                  <div className="areas-tags">
                    {pillar.areas.map((area, idx) => (
                      <span key={idx} className="area-tag">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {pillar.cta && (
                  <a 
                    href="https://linkedin.com/in/tharuntej-diagnospherex" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="rc-cta"
                  >
                    <span>{pillar.cta}</span>
                    <ArrowRight size={14} />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ── Publications & Research Section ── */}
        <div className="publications-block glass-panel">
          <div className="pub-header">
            <div className="pub-title-group">
              <div className="pub-title-icon-wrap">
                <BookOpen size={20} className="text-purple" />
                <h3 className="pub-block-title">Publications & Research</h3>
              </div>
              <p className="pub-block-subtitle">Ongoing academic research, whitepapers, and platform studies.</p>
            </div>
            <a 
              href="https://linkedin.com/in/tharuntej-diagnospherex" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="pub-action-btn"
            >
              <span>View Research</span>
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="publications-list">
            {PUBLICATIONS.map((pub, idx) => (
              <div key={idx} className="pub-row glass-panel">
                <div className="pub-info">
                  <h4 className="pub-project-title">{pub.project}</h4>
                  <span className="pub-project-type">{pub.type}</span>
                </div>
                <div className="pub-status">
                  <span className="pub-status-tag">
                    {pub.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Research Philosophy Section ── */}
        <div className="philosophy-block">
          <div className="philosophy-badge-wrap">
            <ShieldCheck size={14} />
            <span>Guiding Principles</span>
          </div>
          <h3 className="philosophy-title">Our Research Philosophy</h3>
          <p className="philosophy-intro">
            At DiagnoSphereX, we believe that trustworthy healthcare AI begins with scientific rigor, transparency, and human oversight. Every research initiative is developed with a strong focus on explainability, reproducibility, responsible AI, and real-world clinical relevance. Our goal is not to replace healthcare professionals, but to build intelligent technologies that amplify human expertise and accelerate biomedical innovation.
          </p>

          <div className="philosophy-grid">
            {PHILOSOPHY_PRINCIPLES.map((item, idx) => (
              <div key={idx} className="philo-card glass-panel">
                <div 
                  className="philo-card-bar" 
                  style={{ background: item.color }}
                />
                <h4 className="philo-card-title">{item.title}</h4>
                <p className="philo-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ResearchSection;
