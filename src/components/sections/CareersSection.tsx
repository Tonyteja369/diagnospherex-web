import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ArrowRight, Brain, Activity, Layout, Network, CheckCircle2, Send, X } from 'lucide-react';
import '../../styles/CareersSection.css';

const ROLES = [
  {
    id: 'ai-research',
    title: 'AI Research Intern',
    subtitle: 'Biomedical NLP & Clinical Reasoning',
    impact: "Help build the explainable clinical reasoning models that translate dense diagnostic reports for families who've never had one explained to them before.",
    skills: ['Biomedical LLMs', 'Clinical Reasoning Traces', 'ICMR Guideline Alignment'],
    icon: Brain,
    bg: '#EDE9FE',
    color: '#7C3AED',
  },
  {
    id: 'biomed-eng',
    title: 'Biomedical Engineering Intern',
    subtitle: 'Signal Processing & Demographic Baselines',
    impact: 'Calibrate epidemiological physiological baselines to ensure Indian clinical standards are accurately reflected across every demographic.',
    skills: ['ICMR Reference Datasets', 'Haematology Baselines', 'Deterministic Verification'],
    icon: Activity,
    bg: '#EFF6FF',
    color: '#2563EB',
  },
  {
    id: 'frontend',
    title: 'Full-Stack & Frontend Intern',
    subtitle: 'Apple-Tier Healthcare UI & Performance',
    impact: 'Design ultra-accessible interfaces that make critical lab values immediately understandable on low-bandwidth Indian mobile devices.',
    skills: ['React / TypeScript', 'Framer Motion 3D', 'Vernacular Typography'],
    icon: Layout,
    bg: '#ECFDF5',
    color: '#059669',
  },
  {
    id: 'agentic-ai',
    title: 'Agentic AI & Systems Intern',
    subtitle: 'Multi-Document Pipelines & Security',
    impact: 'Architect autonomous multi-document correlation pipelines with client-side zero-knowledge encryption for complete family health histories.',
    skills: ['Autonomous Agent Graphs', 'AES-256 WebCrypto', 'Multi-Doc Correlators'],
    icon: Network,
    bg: '#FFFBEB',
    color: '#D97706',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Apply',
    desc: 'Submit your resume/LinkedIn and a one-line answer to "Why healthcare AI?". Takes under 3 minutes.',
  },
  {
    num: '02',
    title: 'Intro Call',
    desc: 'A friendly 20-minute conversation with founder K. Tharun discussing your background and research vision.',
  },
  {
    num: '03',
    title: 'Start Building',
    desc: 'Remote, flexible, and high-impact. Ship real code and biomedical models to thousands of families from week one.',
  },
];

const CareersSection = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'AI Research Intern',
    link: '',
    whyHealthcare: '',
  });

  const handleOpenApply = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    setFormData((prev) => ({ ...prev, role: roleTitle }));
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pre-fill mailto link with applicant information
    const subject = encodeURIComponent(`Internship Application: ${formData.role} - ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nRole: ${formData.role}\nProfile/Resume: ${formData.link}\nWhy Healthcare AI: ${formData.whyHealthcare}`
    );
    window.open(`mailto:diagnospherex@gmail.com?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  return (
    <section className="careers-section" id="careers">
      <div className="container">

        {/* Section Header */}
        <div className="section-header text-center">
          <span className="eyebrow-tag">
            <GraduationCap size={13} />
            Internship Program
          </span>
          <h2 className="section-title">
            Build Healthcare AI with <span className="text-gradient">Real Population Impact</span>
          </h2>
          <p className="section-desc">
            We are actively recruiting passionate researchers, student engineers, and clinical innovators to shape explainable biomedical intelligence from day one.
          </p>
        </div>

        {/* 4-Role Grid */}
        <div className="careers-roles-grid">
          {ROLES.map((role, idx) => (
            <motion.div
              key={role.id}
              className="career-card saas-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="role-card-top">
                <div 
                  className="role-icon-box"
                  style={{ backgroundColor: role.bg, color: role.color }}
                >
                  <role.icon size={22} />
                </div>
                <span className="hiring-badge">Open Role</span>
              </div>

              <h3 className="role-title">{role.title}</h3>
              <span className="role-subtitle">{role.subtitle}</span>

              {/* Healthcare Impact Statement */}
              <div className="role-impact-box">
                <p className="role-impact-text">“{role.impact}”</p>
              </div>

              {/* Skills / Tech */}
              <div className="role-skills-wrap">
                {role.skills.map((skill) => (
                  <span key={skill} className="role-skill-tag">{skill}</span>
                ))}
              </div>

              {/* Apply CTA */}
              <div className="role-card-footer">
                <button
                  className="role-apply-btn"
                  onClick={() => handleOpenApply(role.title)}
                >
                  <span>Apply for Role</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3 Visible Steps Roadmap */}
        <div className="application-flow-card saas-card">
          <div className="flow-header text-center">
            <span className="flow-eyebrow">Transparent Process</span>
            <h3 className="flow-title">How the Application Works</h3>
            <p className="flow-desc">No endless rounds. 3 transparent steps from application to shipping code.</p>
          </div>

          <div className="flow-steps-grid">
            {STEPS.map((step, idx) => (
              <div key={step.num} className="flow-step-item">
                <div className="step-num-badge">{step.num}</div>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-desc">{step.desc}</p>
                {idx < STEPS.length - 1 && <div className="step-connector desktop-only" />}
              </div>
            ))}
          </div>

          <div className="flow-cta-bar">
            <span>Ready to make an impact? Applications are reviewed rolling weekly.</span>
            <button
              className="btn-primary flow-apply-btn"
              onClick={() => handleOpenApply('AI Research Intern')}
            >
              Start Application
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedRole && (
          <>
            <motion.div
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRole(null)}
            />
            <div className="modal-wrapper">
              <motion.div
                className="early-access-modal saas-card"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="modal-close" 
                  onClick={() => setSelectedRole(null)}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="modal-content">
                    <span className="eyebrow-tag mb-2">Direct Founder Review</span>
                    <h3 className="modal-title">Apply: {formData.role}</h3>
                    <p className="modal-subtitle">
                      Complete this short form. Applications go directly to founder K. Tharun at diagnospherex@gmail.com.
                    </p>

                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="e.g. Ananya Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        required
                        className="form-input"
                        placeholder="you@university.edu or gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">LinkedIn or GitHub Profile *</label>
                      <input
                        type="url"
                        required
                        className="form-input"
                        placeholder="https://linkedin.com/in/yourprofile"
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Why healthcare AI? (1–2 sentences) *</label>
                      <textarea
                        required
                        rows={2}
                        className="form-input"
                        placeholder="What motivates you to work on explainable medical intelligence?"
                        value={formData.whyHealthcare}
                        onChange={(e) => setFormData({ ...formData, whyHealthcare: e.target.value })}
                      />
                    </div>

                    <button type="submit" className="btn-primary submit-btn">
                      <Send size={16} className="inline mr-1" />
                      Submit Application
                    </button>
                  </form>
                ) : (
                  <div className="modal-success text-center py-6">
                    <div className="modal-success-icon">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="modal-success-title">Application Received!</h3>
                    <p className="modal-success-desc">
                      Thank you for applying for the {formData.role} role. Your information has been forwarded to diagnospherex@gmail.com. We review every application and respond within 48 hours.
                    </p>
                    <button
                      className="btn-secondary"
                      onClick={() => setSelectedRole(null)}
                    >
                      Close Window
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CareersSection;
