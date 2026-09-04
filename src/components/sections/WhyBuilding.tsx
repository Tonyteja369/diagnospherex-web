import { motion } from 'framer-motion';
import { Lightbulb, Users, HeartHandshake, Sparkles, ArrowUpRight } from 'lucide-react';
import '../../styles/WhyBuilding.css';

const CARDS = [
  {
    icon: Lightbulb,
    tag: 'The Mission',
    title: "Why We're Building DiagnoSphereX",
    desc: 'Healthcare generates massive volumes of intricate clinical data daily, yet patients and clinicians struggle with fragmented jargon. DiagnoSphereX bridges this chasm by transforming dense diagnostic records into lucid, explainable clinical intelligence.',
    badge: 'Democratizing Understanding',
    bg: '#EDE9FE',
    color: '#7C3AED',
  },
  {
    icon: Users,
    tag: 'Ecosystem',
    title: 'Designed For Everyone in Care',
    desc: 'Empowering diverse healthcare stakeholders: patients seeking clarity for their families, medical students dissecting pathology patterns, practicing clinicians optimizing consult time, and biomedical researchers testing clinical models.',
    roles: ['Patients', 'Medical Students', 'Clinicians', 'Biomedical Researchers', 'Healthcare Innovators'],
    badge: 'Human-Centered Design',
    bg: '#EFF6FF',
    color: '#2563EB',
  },
  {
    icon: HeartHandshake,
    tag: 'Responsibility',
    title: 'Our Ethical & Clinical Commitment',
    desc: 'AI must assist, never supplant, licensed human judgment. We enforce radical transparency: every diagnostic explanation cites its ICMR reference range, confidence factor, and a clear prompt to discuss findings with your physician.',
    badge: 'Physician-First Philosophy',
    bg: '#ECFDF5',
    color: '#059669',
  },
];

const WhyBuilding = () => {
  return (
    <section className="why-section" id="about">
      <div className="container">

        {/* Header */}
        <div className="section-header text-center">
          <span className="eyebrow-tag">
            <Sparkles size={13} />
            Our Purpose & Ethos
          </span>
          <h2 className="section-title">
            Why We Are <span className="text-gradient">Building DiagnoSphereX</span>
          </h2>
          <p className="section-desc">
            Bridging the gap between raw biomedical telemetry and human comprehension with trustworthy, explainable intelligence.
          </p>
        </div>

        {/* Condensed 3-Card Row */}
        <div className="why-grid">
          {CARDS.map((card, idx) => (
            <motion.div
              key={card.title}
              className="why-card saas-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="why-card-top">
                <div 
                  className="why-icon-box"
                  style={{ backgroundColor: card.bg, color: card.color }}
                >
                  <card.icon size={22} />
                </div>
                <span className="why-badge">{card.badge}</span>
              </div>

              <span className="why-tag">{card.tag}</span>
              <h3 className="why-title">{card.title}</h3>
              <p className="why-desc">{card.desc}</p>

              {card.roles && (
                <div className="role-tags-wrap">
                  {card.roles.map((r) => (
                    <span key={r} className="role-tag-pill">{r}</span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Founder Story Strip */}
        <motion.div
          className="founder-strip saas-card"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="founder-left">
            <div className="founder-avatar">
              <span>KT</span>
            </div>
            <div>
              <div className="founder-header-line">
                <h4 className="founder-name">Led by Biomedical Engineering Innovation</h4>
                <span className="founder-role-tag">K. Tharun · Founder & Biomedical Engineer</span>
              </div>
              <p className="founder-bio">
                DiagnoSphereX was conceived from firsthand observation of patients navigating intimidating diagnostic reports in Indian hospitals. Built with an unwavering vision to combine biomedical signal processing, neuroscience, and responsible AI for millions of families.
              </p>
            </div>
          </div>
          <a 
            href="https://linkedin.com/in/tharuntej-diagnospherex" 
            target="_blank" 
            rel="noopener noreferrer"
            className="founder-connect-btn"
          >
            <span>Connect on LinkedIn</span>
            <ArrowUpRight size={15} />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyBuilding;
