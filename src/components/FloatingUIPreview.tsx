import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle, RefreshCw } from 'lucide-react';
import '../styles/FloatingUIPreview.css';

const FloatingUIPreview = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 2000);
    const timer2 = setTimeout(() => setStep(2), 5000);
    const timer3 = setTimeout(() => setStep(0), 10000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [step]);

  return (
    <motion.div 
      className="floating-preview glass-panel"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      whileHover={{ y: -5, boxShadow: "0 15px 40px rgba(98,54,255,0.3)" }}
    >
      <div className="preview-header">
        <div className="window-controls">
          <span className="control close"></span>
          <span className="control min"></span>
          <span className="control max"></span>
        </div>
        <span className="preview-title">DiagnoSphereX Engine</span>
      </div>
      
      <div className="preview-body">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div 
              key="step0"
              className="preview-step"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
            >
              <UploadCloud size={40} className="step-icon text-cyan" />
              <p>Upload Medical Report</p>
              <div className="upload-box">
                <FileText size={24} />
                <span>clinical_data_2026.pdf</span>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div 
              key="step1"
              className="preview-step processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
            >
              <RefreshCw size={40} className="step-icon text-purple rotating" />
              <p>AI Processing Clinical Data...</p>
              <div className="scanning-bar-container">
                <motion.div 
                  className="scanning-bar"
                  animate={{ left: ['-10%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
                <div className="neural-particles-loader" />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              className="preview-step complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
            >
              <CheckCircle size={40} className="step-icon text-cyan" />
              <p>Generating Explanation</p>
              <div className="insight-snippet">
                <div className="snippet-line shimmer-effect" style={{ width: '100%' }}></div>
                <div className="snippet-line shimmer-effect" style={{ width: '80%' }}></div>
                <div className="snippet-line shimmer-effect" style={{ width: '60%' }}></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FloatingUIPreview;
