import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, User, Mail, Briefcase } from 'lucide-react';
import MetallicBorderButton from '../reactbits/MetallicBorderButton';
import '../../styles/CallToAction.css';

const ROLES = [
  'Patient / Family Member',
  'Medical Student / Researcher',
  'Practicing Clinician',
  'Biomedical Engineer',
];

export const CallToAction: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Patient / Family Member',
    interest: 'Report Translation & Telugu Insights',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (step === 1 && (!formData.name.trim() || !formData.email.trim())) return;
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  return (
    <section className="cta-section" id="waitlist-stepper">
      <div className="container" style={{ maxWidth: '960px', margin: '0 auto' }}>
        <motion.div
          className="cta-card saas-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ padding: '48px 36px', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}
        >
          {/* Ambient soft glow background inside card */}
          <div className="cta-ambient-glow" aria-hidden="true" />

          <div className="cta-content text-center" style={{ maxWidth: '680px', margin: '0 auto' }}>
            <span className="eyebrow-tag" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              <Sparkles size={13} />
              Priority Access Initiative
            </span>

            <h2 className="cta-headline" style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '12px' }}>
              Join the Priority Cohort for <span className="text-gradient">DiagnoSphereX</span>
            </h2>

            <p className="cta-subtitle" style={{ fontSize: '1rem', color: 'var(--text-secondary, #64748B)', marginBottom: '32px' }}>
              Live progressive onboarding. Zero popups — experience explainable clinical intelligence calibrated to ICMR Indian demographics.
            </p>

            {!submitted ? (
              <div
                className="waitlist-inline-stepper-box"
                style={{
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid var(--border-subtle, #EAEAF2)',
                  borderRadius: '20px',
                  padding: '32px',
                  textAlign: 'left',
                  boxShadow: '0 12px 36px rgba(20, 20, 31, 0.04)',
                }}
              >
                {/* Stepper Progress Bar Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {[1, 2, 3].map((num) => (
                      <div
                        key={num}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          background: step === num ? '#8B5CF6' : step > num ? '#8B5CF6' : '#F1F5F9',
                          color: step >= num ? '#FFFFFF' : '#64748B',
                          transition: 'all 0.25s ease',
                        }}
                      >
                        {step > num ? <CheckCircle2 size={16} /> : num}
                      </div>
                    ))}
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary, #64748B)' }}>
                    Step {step} of 3
                  </span>
                </div>

                {/* Form Input Steps */}
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px', color: '#0F172A' }}>
                        01 — Identity Details
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '20px' }}>
                        Enter your name and primary email address.
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                            Full Name
                          </label>
                          <div style={{ position: 'relative' }}>
                            <User size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: '#94A3B8' }} />
                            <input
                              type="text"
                              required
                              placeholder="K. Tharun Tej"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              style={{
                                width: '100%',
                                padding: '12px 14px 12px 40px',
                                borderRadius: '10px',
                                border: '1px solid #CBD5E1',
                                fontSize: '0.95rem',
                                outline: 'none',
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                            Email Address
                          </label>
                          <div style={{ position: 'relative' }}>
                            <Mail size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: '#94A3B8' }} />
                            <input
                              type="email"
                              required
                              placeholder="tharun@diagnospherex.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              style={{
                                width: '100%',
                                padding: '12px 14px 12px 40px',
                                borderRadius: '10px',
                                border: '1px solid #CBD5E1',
                                fontSize: '0.95rem',
                                outline: 'none',
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px', color: '#0F172A' }}>
                        02 — Select Your Role
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '20px' }}>
                        How will you primarily use DiagnoSphereX?
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {ROLES.map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setFormData({ ...formData, role: r })}
                            style={{
                              padding: '14px 16px',
                              borderRadius: '10px',
                              border: formData.role === r ? '2px solid #8B5CF6' : '1px solid #E2E8F0',
                              background: formData.role === r ? 'rgba(139, 92, 246, 0.08)' : '#FFFFFF',
                              color: formData.role === r ? '#6D28D9' : '#334155',
                              fontWeight: 600,
                              fontSize: '0.85rem',
                              textAlign: 'left',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <Briefcase size={14} style={{ display: 'inline', marginRight: '6px' }} />
                            {r}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px', color: '#0F172A' }}>
                        03 — Core Interest & Priority Access
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '20px' }}>
                        What feature is most important to your workflow?
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {[
                          'Report Translation & Telugu Insights',
                          'Family Vault & Longitudinal Health Timeline',
                          'Multi-Document Lab Cross-Referencing',
                          'Clinical Research & Model Fine-Tuning',
                        ].map((interest) => (
                          <label
                            key={interest}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              padding: '12px 16px',
                              borderRadius: '10px',
                              border: formData.interest === interest ? '2px solid #8B5CF6' : '1px solid #E2E8F0',
                              background: formData.interest === interest ? 'rgba(139, 92, 246, 0.08)' : '#FFFFFF',
                              cursor: 'pointer',
                            }}
                          >
                            <input
                              type="radio"
                              name="interest"
                              checked={formData.interest === interest}
                              onChange={() => setFormData({ ...formData, interest })}
                              style={{ accentColor: '#8B5CF6' }}
                            />
                            <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#1E293B' }}>{interest}</span>
                          </label>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #EAEAF2' }}>
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '10px 18px',
                        borderRadius: '10px',
                        border: '1px solid #CBD5E1',
                        background: 'transparent',
                        color: '#475569',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                      }}
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>
                  ) : <div />}

                  <MetallicBorderButton size="md" onClick={() => handleNext()}>
                    <span>{step === 3 ? 'Complete Access Application' : 'Continue'}</span>
                    <ArrowRight size={16} className="btn-icon-arrow" />
                  </MetallicBorderButton>
                </div>
              </div>
            ) : (
              /* Step 4 Confirmation Card */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '40px',
                  border: '2px solid #8B5CF6',
                  textAlign: 'center',
                  boxShadow: '0 16px 40px rgba(139, 92, 246, 0.15)',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#EDE9FE',
                    color: '#6D28D9',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <ShieldCheck size={32} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                  Priority Access Granted!
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#64748B', maxWidth: '480px', margin: '0 auto 24px auto' }}>
                  Welcome aboard, <strong style={{ color: '#0F172A' }}>{formData.name}</strong>. Your application has been registered for the beta cohort. Early access invite sent to <span style={{ color: '#6D28D9', fontWeight: 600 }}>{formData.email}</span>.
                </p>

                <div
                  style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#475569',
                  }}
                >
                  Token ID: DSX-BETA-2026-0042
                </div>
              </motion.div>
            )}

            <div className="cta-guarantees" style={{ marginTop: '32px', display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <div className="guarantee-item" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569' }}>
                <CheckCircle2 size={15} style={{ color: '#10B981' }} />
                <span>Zero spam, guaranteed</span>
              </div>
              <div className="guarantee-item" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569' }}>
                <CheckCircle2 size={15} style={{ color: '#10B981' }} />
                <span>AES-256 client-side privacy</span>
              </div>
              <div className="guarantee-item" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569' }}>
                <CheckCircle2 size={15} style={{ color: '#10B981' }} />
                <span>Early beta access in 12 weeks</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
