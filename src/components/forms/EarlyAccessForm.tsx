import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';

interface EarlyAccessFormProps {
  onSuccessClose: () => void;
}

const EarlyAccessForm = ({ onSuccessClose }: EarlyAccessFormProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: '',
    country: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const stateKey = e.target.name.toLowerCase();
    setFormData({ ...formData, [stateKey]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.profession && formData.country) {
      setIsSubmitting(true);
      
      const formElement = e.currentTarget;
      const submissionData = new FormData(formElement);
      submissionData.append('_subject', `New Early Access Request: ${formData.name}`);
      submissionData.append('_template', 'table');

      try {
        await fetch('https://formsubmit.co/ajax/diagnospherex@gmail.com', {
          method: 'POST',
          body: submissionData,
          headers: { 
            'Accept': 'application/json'
          }
        });
      } catch (error) {
        console.error("Form submission failed", error);
      } finally {
        setIsSubmitting(false);
        setStep(2);
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {step === 1 ? (
        <motion.div
          key="form"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="modal-content"
        >
          <h2 className="modal-title">Request Early Access</h2>
          <p className="modal-desc">
            Join the exploration phase of DiagnoSphere X. <strong>Be among the first 100 users</strong> to experience our AI-powered intelligent healthcare platform.
          </p>

          <form onSubmit={handleSubmit} className="ea-form">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="Name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                placeholder="Dr. John Doe / Jane Doe"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="Email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                placeholder="hello@example.com"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-group row-group">
              <div className="half-width">
                <label>Profession</label>
                <select name="Profession" value={formData.profession} onChange={handleChange} required disabled={isSubmitting}>
                  <option value="" disabled>Select Role</option>
                  <option value="Doctor">Doctor / Clinician</option>
                  <option value="Student">Medical Student</option>
                  <option value="Engineer">Engineer / Developer</option>
                  <option value="General User">General User / Other</option>
                </select>
              </div>
              <div className="half-width">
                <label>Country</label>
                <input 
                  type="text" 
                  name="Country" 
                  value={formData.country} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. United States"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label>How did you hear about us?</label>
              <select name="Referral Source" defaultValue="" disabled={isSubmitting}>
                <option value="" disabled>Select an option (Optional)</option>
                <option value="Instagram">Instagram</option>
                <option value="Friend/Colleague">Friend or Colleague</option>
                <option value="College/University">College / University</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Search Engine">Search Engine</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <motion.button 
              type="submit" 
              className="btn-primary ea-submit glow-effect"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="rotating" size={20} />
                  Sending Request...
                </>
              ) : (
                "Request Early Access"
              )}
            </motion.button>
          </form>
        </motion.div>
      ) : (
        <motion.div
          key="success"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="modal-success"
        >
          <div className="success-icon-wrapper">
            <CheckCircle size={48} className="text-cyan drop-shadow-glow" />
          </div>
          <h2 className="modal-title">Request Received</h2>
          
          <div className="email-preview glass-card">
            <div className="email-body">
              <p>Hello {formData.name},</p>
              <p><strong>Your application has been submitted successfully. We will contact you soon.</strong></p>
              <p>We are currently preparing the first version of our AI-powered healthcare platform designed for doctors, students, and healthcare innovators.</p>
              <p>We appreciate your interest in supporting the future of intelligent healthcare tools.</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
            <motion.button 
              onClick={onSuccessClose}
              className="btn-primary close-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Return to Site
            </motion.button>
            <motion.a 
              href="https://wa.me/917036834428"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary close-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ display: 'block', textDecoration: 'none' }}
            >
              Contact via WhatsApp (Optional)
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EarlyAccessForm;
