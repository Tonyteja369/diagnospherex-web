import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ArrowRight, Brain, Activity, Layout, Network, CheckCircle2, ChevronLeft } from 'lucide-react';
import { Stepper, Step } from '../reactbits/Stepper';
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

const CareersSection = () => {
  // Inline stepper state — null means stepper is hidden
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    link: '',
    whyHealthcare: '',
  });

  const openStepper = (roleTitle: string) => {
    setFormData({ name: '', email: '', role: roleTitle, link: '', whyHealthcare: '' });
    setSubmitted(false);
    setActiveRole(roleTitle);
    // Scroll to the stepper
    setTimeout(() => {
      document.getElementById('careers-inline-stepper')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const closeStepper = () => {
    setActiveRole(null);
    setSubmitted(false);
  };

  const handleSubmit = () => {
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
              className={`career-card saas-card${activeRole === role.title ? ' career-card--active' : ''}`}
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

              <div className="role-impact-box">
                <p className="role-impact-text">"{role.impact}"</p>
              </div>

              <div className="role-skills-wrap">
                {role.skills.map((skill) => (
                  <span key={skill} className="role-skill-tag">{skill}</span>
                ))}
              </div>

              <div className="role-card-footer">
                <button
                  className="role-apply-btn"
                  onClick={() => openStepper(role.title)}
                >
                  <span>Apply for Role</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Roadmap */}
        <div className="application-flow-card saas-card">
          <div className="flow-header text-center">
            <span className="flow-eyebrow">Transparent Process</span>
            <h3 className="flow-title">How the Application Works</h3>
            <p className="flow-desc">No endless rounds. 3 transparent steps from application to shipping code.</p>
          </div>

          <div className="flow-steps-wrapper" style={{ margin: '32px 0' }}>
            <Stepper
              initialStep={1}
              backButtonText="Back"
              nextButtonText="Next"
              activeColor="#8B5CF6"
            >
              <Step>
                <div className="step-content-inner">
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>01 — Apply</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Submit your resume/LinkedIn and a one-line answer to "Why healthcare AI?". Takes under 3 minutes.</p>
                </div>
              </Step>
              <Step>
                <div className="step-content-inner">
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>02 — Intro Call</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>A friendly 20-minute conversation with founder K. Tharun discussing your background and research vision.</p>
                </div>
              </Step>
              <Step>
                <div className="step-content-inner">
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>03 — Start Building</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Remote, flexible, high-impact. Ship real code and biomedical models to thousands of families from week one.</p>
                </div>
              </Step>
            </Stepper>
          </div>

          <div className="flow-cta-bar">
            <span>Ready to make an impact? Applications are reviewed rolling weekly.</span>
            <button
              className="btn-primary flow-apply-btn"
              onClick={() => openStepper('AI Research Intern')}
            >
              Start Application
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* ── INLINE APPLICATION STEPPER ── */}
        <AnimatePresence>
          {activeRole && (
            <motion.div
              id="careers-inline-stepper"
              className="careers-inline-stepper saas-card"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              {/* Header row */}
              <div className="inline-stepper-header">
                <div>
                  <span className="eyebrow-tag" style={{ marginBottom: 4 }}>Applying for</span>
                  <h3 className="inline-stepper-role-title">{activeRole}</h3>
                </div>
                <button className="stepper-close-btn" onClick={closeStepper} aria-label="Close application form">
                  <ChevronLeft size={16} />
                  Cancel
                </button>
              </div>

              {submitted ? (
                <motion.div
                  className="inline-success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="inline-success-icon">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3>Application Sent!</h3>
                  <p>Your application for <strong>{activeRole}</strong> has been forwarded to diagnospherex@gmail.com. We review every application and respond within 48 hours.</p>
                  <button className="btn-secondary" onClick={closeStepper} style={{ marginTop: 20 }}>
                    Back to Careers
                  </button>
                </motion.div>
              ) : (
                <Stepper
                  initialStep={1}
                  backButtonText="Back"
                  nextButtonText="Continue"
                  activeColor="#8B5CF6"
                  onFinalStepCompleted={handleSubmit}
                >
                  {/* Step 1 — Personal Details */}
                  <Step>
                    <div className="inline-step-body">
                      <h4 className="inline-step-title">Personal Details</h4>
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
                          placeholder="you@university.edu"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                  </Step>

                  {/* Step 2 — Profile Links */}
                  <Step>
                    <div className="inline-step-body">
                      <h4 className="inline-step-title">Profile & Portfolio</h4>
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
                    </div>
                  </Step>

                  {/* Step 3 — Motivation */}
                  <Step>
                    <div className="inline-step-body">
                      <h4 className="inline-step-title">Why Healthcare AI?</h4>
                      <div className="form-group">
                        <label className="form-label">Tell us your motivation (1–2 sentences) *</label>
                        <textarea
                          required
                          rows={3}
                          className="form-input"
                          placeholder="What motivates you to work on explainable medical intelligence?"
                          value={formData.whyHealthcare}
                          onChange={(e) => setFormData({ ...formData, whyHealthcare: e.target.value })}
                        />
                      </div>
                      <p className="inline-step-note">
                        Clicking <strong>Submit</strong> will open your mail client pre-filled with your application addressed to diagnospherex@gmail.com.
                      </p>
                    </div>
                  </Step>
                </Stepper>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default CareersSection;
