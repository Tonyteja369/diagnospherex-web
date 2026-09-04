import { motion, Variants } from 'framer-motion';
import { FileText, Users, Activity, Sparkles, Zap } from 'lucide-react';
import '../../styles/PlatformCapabilities.css';

const FEATURES = [
  {
    icon: FileText,
    tag: 'Report Analyzer',
    title: 'ICMR-Calibrated Medical Interpretation',
    desc: 'Upload any blood test or diagnostic PDF. Every parameter is explained in plain Telugu and English using ICMR Indian reference ranges calibrated to Indian demographics, diet, and regional baselines — not Western averages.',
    highlight: 'Instant Telugu & English Insights',
    color: '#8B5CF6',
    bg: '#EDE9FE',
  },
  {
    icon: Users,
    tag: 'Family Health Vault',
    title: 'Zero-Knowledge Longitudinal Vault',
    desc: 'One account securely manages complete health timelines for up to 6 family members. Every medical record is AES-256 encrypted independently with user-derived keys. Even our engineers cannot access your records.',
    highlight: 'AES-256 Encrypted Per Member',
    color: '#3B82F6',
    bg: '#EFF6FF',
  },
  {
    icon: Activity,
    tag: 'Instant Intelligence',
    title: 'Multi-Document Cross-Referencing',
    desc: 'Upload multiple test reports together. DiagnoSphereX reads them simultaneously, detecting subtle correlations between disparate markers across lab visits, and prepares a concrete 48-hour doctor consult plan.',
    highlight: 'Cross-Document Correlation',
    color: '#10B981',
    bg: '#ECFDF5',
  },
];

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const PlatformCapabilities = () => {
  return (
    <section className="capabilities-section" id="features">
      <div className="container">

        {/* Section Header */}
        <div className="section-header text-center">
          <span className="eyebrow-tag">
            <Zap size={13} />
            Core Platform Capabilities
          </span>
          <h2 className="section-title">
            Engineered for <span className="text-gradient">Clarity, Privacy, and Trust</span>
          </h2>
          <p className="section-desc">
            Traditional lab reports are written for pathologists. DiagnoSphereX translates clinical complexity into actionable, physician-aligned understanding.
          </p>
        </div>

        {/* 3-Column Responsive Grid */}
        <motion.div
          className="capabilities-grid"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.tag}
              className="capability-card saas-card"
              variants={cardVariants}
            >
              {/* Top Icon Badge */}
              <div 
                className="cap-icon-box"
                style={{ backgroundColor: feature.bg, color: feature.color }}
              >
                <feature.icon size={24} />
              </div>

              {/* Tag */}
              <span className="cap-tag">{feature.tag}</span>

              {/* Title */}
              <h3 className="cap-title">{feature.title}</h3>

              {/* Description */}
              <p className="cap-desc">{feature.desc}</p>

              {/* Bottom Feature Pill */}
              <div className="cap-footer">
                <span className="cap-highlight">
                  <Sparkles size={13} className="inline mr-1" />
                  {feature.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default PlatformCapabilities;
