import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ArrowRight, Brain, Activity, Layout, Network, CheckCircle2, ChevronLeft, Upload, X, FileText } from 'lucide-react';
import '../../styles/CareersSection.css';

const ROLES = [
  {
    id: 'ai-research',
    category: 'Research',
    title: 'AI Research Intern',
    subtitle: 'Biomedical NLP & Clinical Reasoning',
    impact: 'Help build explainable clinical reasoning models that translate dense diagnostic reports for families who have never had one explained before.',
    skills: ['Biomedical LLMs', 'Clinical Reasoning Traces', 'ICMR Guideline Alignment'],
    icon: Brain,
    bg: '#EDE9FE',
    color: '#7C3AED',
    duration: 'Remote · 3-6 months',
    stipend: 'Performance-based',
  },
  {
    id: 'biomed-eng',
    category: 'Engineering',
    title: 'Biomedical Engineering Intern',
    subtitle: 'Signal Processing & Demographic Baselines',
    impact: 'Calibrate epidemiological physiological baselines to ensure Indian clinical standards are accurately reflected across every demographic.',
    skills: ['ICMR Reference Datasets', 'Haematology Baselines', 'Deterministic Verification'],
    icon: Activity,
    bg: '#EFF6FF',
    color: '#2563EB',
    duration: 'Remote · 3-6 months',
    stipend: 'Performance-based',
  },
  {
    id: 'frontend',
    category: 'Engineering',
    title: 'Full-Stack & Frontend Intern',
    subtitle: 'Apple-Tier Healthcare UI & Performance',
    impact: 'Design ultra-accessible interfaces that make critical lab values immediately understandable on low-bandwidth Indian mobile devices.',
    skills: ['React / TypeScript', 'Framer Motion 3D', 'Vernacular Typography'],
    icon: Layout,
    bg: '#ECFDF5',
    color: '#059669',
    duration: 'Remote · 3-6 months',
    stipend: 'Performance-based',
  },
  {
    id: 'agentic-ai',
    category: 'AI Systems',
    title: 'Agentic AI & Systems Intern',
    subtitle: 'Multi-Document Pipelines & Security',
    impact: 'Architect autonomous multi-document correlation pipelines with client-side zero-knowledge encryption for complete family health histories.',
    skills: ['Autonomous Agent Graphs', 'AES-256 WebCrypto', 'Multi-Doc Correlators'],
    icon: Network,
    bg: '#FFFBEB',
    color: '#D97706',
    duration: 'Remote · 3-6 months',
    stipend: 'Performance-based',
  },
];

interface ResumeFile {
  name: string;
  size: number;
  type: string;
}

const CareersSection = () => {
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [resumeFile, setResumeFile] = useState<ResumeFile | null>(null);
  const [resumeError, setResumeError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    linkedin: '',
    github: '',
    whyHealthcare: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openForm = (roleTitle: string) => {
    setFormData({ name: '', email: '', role: roleTitle, linkedin: '', github: '', whyHealthcare: '' });
    setResumeFile(null);
    setResumeError('');
    setSubmitted(false);
    setActiveRole(roleTitle);
    setTimeout(() => {
      document.getElementById('careers-application-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const closeForm = () => {
    setActiveRole(null);
    setSubmitted(false);
    setResumeFile(null);
    setResumeError('');
  };

  const validateFile = (file: File): boolean => {
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.type)) {
      setResumeError('Please upload a PDF, DOC, or DOCX file.');
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      setResumeError('File size must be under 10MB.');
      return false;
    }
    setResumeError('');
    return true;
  };

  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      setResumeFile({ name: file.name, size: file.size, type: file.type });
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.whyHealthcare.trim()) return;
    setSubmitted(true);
  };

  const selectedRole = ROLES.find(r => r.title === activeRole);

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
              <div className="role-category-row">
                <div
                  className="role-icon-box"
                  style={{ backgroundColor: role.bg, color: role.color }}
                >
                  <role.icon size={20} />
                </div>
                <div className="role-category-badges">
                  <span className="role-category-tag" style={{ color: role.color, background: role.bg }}>{role.category}</span>
                  <span className="hiring-badge">Open Role</span>
                </div>
              </div>

              <h3 className="role-title">{role.title}</h3>
              <span className="role-subtitle">{role.subtitle}</span>

              <p className="role-impact-text">{role.impact}</p>

              <div className="role-skills-wrap">
                {role.skills.map((skill) => (
                  <span key={skill} className="role-skill-tag">{skill}</span>
                ))}
              </div>

              <div className="role-meta-row">
                <span className="role-meta-item">{role.duration}</span>
                <span className="role-meta-dot" />
                <span className="role-meta-item">{role.stipend}</span>
              </div>

              <div className="role-card-footer">
                <button
                  className="role-apply-btn"
                  onClick={() => openForm(role.title)}
                >
                  <span>Start Application</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Inline Application Form */}
        <AnimatePresence>
          {activeRole && (
            <motion.div
              id="careers-application-form"
              className="careers-application-form saas-card"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="form-header-row">
                <div>
                  <span className="eyebrow-tag" style={{ marginBottom: 4 }}>Applying for</span>
                  <h3 className="form-role-title">{activeRole}</h3>
                  {selectedRole && (
                    <span className="form-role-subtitle">{selectedRole.subtitle}</span>
                  )}
                </div>
                <button className="form-close-btn" onClick={closeForm} aria-label="Cancel application">
                  <ChevronLeft size={16} />
                  Cancel
                </button>
              </div>

              {submitted ? (
                <motion.div
                  className="application-success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="success-icon-circle">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3>Application Received!</h3>
                  <p>Your application for <strong>{activeRole}</strong> has been submitted. Our team reviews every application and responds within 48 hours.</p>

                  {/* Application Summary Table */}
                  <div className="application-summary-table">
                    <h4>Application Summary</h4>
                    <table>
                      <tbody>
                        <tr><td className="summary-label">Candidate</td><td className="summary-value">{formData.name}</td></tr>
                        <tr><td className="summary-label">Email</td><td className="summary-value">{formData.email}</td></tr>
                        <tr><td className="summary-label">Position</td><td className="summary-value">{formData.role}</td></tr>
                        {formData.linkedin && <tr><td className="summary-label">LinkedIn</td><td className="summary-value">{formData.linkedin}</td></tr>}
                        {formData.github && <tr><td className="summary-label">GitHub</td><td className="summary-value">{formData.github}</td></tr>}
                        {resumeFile && <tr><td className="summary-label">Resume</td><td className="summary-value">{resumeFile.name} ({formatBytes(resumeFile.size)})</td></tr>}
                      </tbody>
                    </table>
                  </div>

                  <button className="btn-secondary" onClick={closeForm} style={{ marginTop: 20 }}>
                    Back to Roles
                  </button>
                </motion.div>
              ) : (
                <form className="application-form-body" onSubmit={handleSubmit} noValidate>
                  <div className="form-section">
                    <h4 className="form-section-title">Personal Details</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input
                          type="text"
                          required
                          className="form-input"
                          placeholder="e.g. Aarav Mehta"
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
                  </div>

                  <div className="form-section">
                    <h4 className="form-section-title">Profile Links</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">LinkedIn Profile</label>
                        <input
                          type="url"
                          className="form-input"
                          placeholder="https://linkedin.com/in/yourprofile"
                          value={formData.linkedin}
                          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">GitHub / Portfolio</label>
                        <input
                          type="url"
                          className="form-input"
                          placeholder="https://github.com/yourusername"
                          value={formData.github}
                          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h4 className="form-section-title">Resume / CV Upload</h4>
                    {!resumeFile ? (
                      <div
                        className={`resume-dropzone${dragActive ? ' dropzone-active' : ''}`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => fileInputRef.current?.click()}
                        role="button"
                        tabIndex={0}
                        aria-label="Upload resume file"
                        onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                      >
                        <Upload size={28} className="dropzone-icon" />
                        <p className="dropzone-main">Drag & drop your resume here</p>
                        <p className="dropzone-sub">or <span className="dropzone-browse">browse files</span></p>
                        <p className="dropzone-hint">PDF, DOC, DOCX · Max 10MB</p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx"
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileSelect(file);
                          }}
                        />
                      </div>
                    ) : (
                      <div className="resume-preview-card">
                        <div className="resume-file-info">
                          <FileText size={22} className="resume-file-icon" />
                          <div>
                            <p className="resume-file-name">{resumeFile.name}</p>
                            <p className="resume-file-size">{formatBytes(resumeFile.size)}</p>
                          </div>
                        </div>
                        <div className="resume-file-actions">
                          <button type="button" className="resume-replace-btn" onClick={() => fileInputRef.current?.click()}>
                            Replace
                          </button>
                          <button type="button" className="resume-remove-btn" onClick={() => { setResumeFile(null); setResumeError(''); }}>
                            <X size={14} />
                          </button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileSelect(file);
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {resumeError && <p className="resume-error">{resumeError}</p>}
                  </div>

                  <div className="form-section">
                    <h4 className="form-section-title">Motivation</h4>
                    <div className="form-group">
                      <label className="form-label">Why Healthcare AI? (1–2 sentences) *</label>
                      <textarea
                        required
                        rows={3}
                        className="form-input"
                        placeholder="What motivates you to work on explainable medical intelligence for Indian families?"
                        value={formData.whyHealthcare}
                        onChange={(e) => setFormData({ ...formData, whyHealthcare: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-submit-row">
                    <p className="form-privacy-note">
                      Your application is submitted securely. No data is shared externally.
                    </p>
                    <button
                      type="submit"
                      className="btn-primary form-submit-btn"
                      disabled={!formData.name.trim() || !formData.email.trim() || !formData.whyHealthcare.trim()}
                    >
                      Submit Application
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default CareersSection;
