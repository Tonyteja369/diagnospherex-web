import { motion } from 'framer-motion';
import { Lock, ShieldCheck, Database, CheckCircle2, Shield } from 'lucide-react';
import '../../styles/Security.css';

const PRINCIPLES = [
  {
    icon: Lock,
    title: 'AES-256 Encryption at Rest',
    desc: 'Every health record is encrypted before it touches the database. Each family member’s data is encrypted independently with separate cryptographic keys. Even our infrastructure operators cannot view your records.',
    badge: 'Cryptographic Isolation',
    bg: '#EDE9FE',
    color: '#7C3AED',
  },
  {
    icon: ShieldCheck,
    title: 'Zero-Knowledge Architecture',
    desc: 'Encryption keys are derived client-side from your own password via PBKDF2/Argon2. You hold the key. We hold zero decryption material. One-tap permanent purge removes all data with no lingering copies.',
    badge: 'Client-Side Key Derivation',
    bg: '#EFF6FF',
    color: '#2563EB',
  },
  {
    icon: Database,
    title: 'ICMR Indian Clinical Standards',
    desc: 'Every diagnostic reference range is calibrated to Indian age, gender, dietary, and regional demographics using official ICMR guidelines — preventing misdiagnoses caused by Western WHO baseline biases.',
    badge: 'Demographic Precision',
    bg: '#ECFDF5',
    color: '#059669',
  },
  {
    icon: CheckCircle2,
    title: 'Zero-Hallucination Pipeline',
    desc: 'Biochemical parameters and units are parsed and mathematically cross-verified by deterministic code prior to AI interpretation. The AI explains context; the deterministic engine verifies facts.',
    badge: 'Deterministic Verification',
    bg: '#FFFBEB',
    color: '#D97706',
  },
];

const Security = () => {
  return (
    <section className="security-section" id="security">
      <div className="container">

        {/* Header */}
        <div className="section-header text-center">
          <span className="eyebrow-tag">
            <Shield size={13} />
            Security & Clinical Rigor
          </span>
          <h2 className="section-title">
            Security-First, <span className="text-gradient">India-First Architecture</span>
          </h2>
          <p className="section-desc">
            DiagnoSphereX is architected with end-to-end encryption, client-side zero-knowledge proofs, and official ICMR medical standards as foundational primitives — not afterthoughts.
          </p>
        </div>

        {/* 4-Card 2x2 Grid */}
        <div className="principles-grid">
          {PRINCIPLES.map((p, idx) => (
            <motion.div
              key={p.title}
              className="principle-card saas-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="principle-top">
                <div 
                  className="principle-icon-wrap"
                  style={{ backgroundColor: p.bg, color: p.color }}
                >
                  <p.icon size={22} />
                </div>
                <span className="principle-badge">{p.badge}</span>
              </div>

              <h3 className="principle-title">{p.title}</h3>
              <p className="principle-desc">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Transparency / Platform Status Banner */}
        <motion.div
          className="transparency-card saas-card"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="transparency-left">
            <div className="pulse-indicator">
              <span className="pulse-ping" />
              <span className="pulse-core" />
            </div>
            <div>
              <span className="transparency-label">Platform Status · Active Development</span>
              <p className="transparency-text">
                DiagnoSphereX is undergoing clinical benchmark trials from Vijayawada, Andhra Pradesh. Built from day one to comply with Indian DISHA and ISO 27001 medical confidentiality guidelines.
              </p>
            </div>
          </div>
          <a href="#about" className="transparency-link">
            Learn About Our Rigor →
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Security;
