import { motion } from 'framer-motion';
import './SignatureActivation.css';

const FounderSection = () => {
  return (
    <section className="signature-section" id="about">
      <div className="signature-container">
        <motion.div
          className="founder-name-display"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="founder-label">FOUNDED BY</p>
          <h2 className="founder-name-text">K. Tharun</h2>
          <div className="founder-divider" />
          <p className="founder-role">Founder, DiagnoSphereX</p>
          <p className="founder-dept">Biomedical Engineering</p>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSection;
