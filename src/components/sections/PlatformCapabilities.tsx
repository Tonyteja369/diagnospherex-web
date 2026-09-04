import { FileText, Users, Activity, Sparkles, Zap } from 'lucide-react';
import MagicBento from '../reactbits/MagicBento';
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
        <div className="capabilities-grid">
          {FEATURES.map((feature) => (
            <MagicBento
              key={feature.tag}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              spotlightRadius={260}
              glowColor="139, 92, 246"
            >
              <div className="capability-card saas-card" style={{ height: '100%' }}>
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

                {/* Feature Highlight Pill */}
                <div className="cap-highlight-pill">
                  <Sparkles size={12} className="text-purple" />
                  <span>{feature.highlight}</span>
                </div>
              </div>
            </MagicBento>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PlatformCapabilities;
