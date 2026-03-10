import { motion } from 'framer-motion';
import { FileText, Stethoscope, Microscope } from 'lucide-react';
import './ProductExplanation.css';

const ProductExplanation = () => {
  return (
    <section className="product-explanation" id="product">
      <div className="container">
        <motion.div 
          className="section-header text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            AI Intelligence for <span className="text-gradient">Modern Healthcare</span>
          </h2>
        </motion.div>

        <div className="explanation-grid">
          <motion.div 
            className="explanation-card glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="icon-wrapper">
              <FileText className="text-purple" size={32} />
            </div>
            <h3>Medical Report Simplification</h3>
          </motion.div>

          <motion.div 
            className="explanation-card glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="icon-wrapper">
              <Stethoscope className="text-cyan" size={32} />
            </div>
            <h3>Clinical Documentation Assistance</h3>
          </motion.div>

          <motion.div 
            className="explanation-card glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="icon-wrapper">
              <Microscope className="text-neon-blue" size={32} />
            </div>
            <h3>Diagnostic Interpretation</h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductExplanation;
