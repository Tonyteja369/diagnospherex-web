import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import '../styles/ApplicationPage.css';

const ApplicationSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="application-page">
      <motion.div
        className="application-glass-panel success-panel"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="success-icon-box">
          <CheckCircle size={64} className="text-cyan drop-shadow-glow" />
        </div>
        <h2 className="success-headline">Application Submitted</h2>
        <p className="success-msg" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
          <strong>Your application has been submitted successfully. We will contact you soon.</strong>
        </p>
        <p className="success-msg">
          Thank you for applying to the DiagnoSphere X Founding Internship Program. Our team will review your application carefully, including your resume.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '32px', maxWidth: '300px', width: '100%', margin: '32px auto 0' }}>
          <button 
            onClick={() => navigate('/')} 
            className="btn-primary ripple-btn glow-effect"
          >
            Return to Home
          </button>
          <a 
            href="https://wa.me/917036834428"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary ripple-btn glow-effect"
            style={{ display: 'block', textDecoration: 'none', textAlign: 'center', fontSize: '1rem', padding: '16px 24px' }}
          >
            Contact via WhatsApp <span style={{ fontSize: '0.8em', opacity: 0.8 }}>(Optional)</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default ApplicationSuccessPage;
