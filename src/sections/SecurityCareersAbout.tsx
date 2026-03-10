
import { motion } from 'framer-motion';
import { Shield, Users, Lightbulb, User } from 'lucide-react';
import './SecurityCareersAbout.css';

const SecurityCareersAbout = () => {
  return (
    <>
      <section className="info-section security-section" id="security">
        <div className="info-content">
          <div className="info-icon-wrapper">
            <Shield size={40} className="text-cyan drop-glow" />
          </div>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Healthcare-Grade <span className="text-gradient">Security</span>
          </motion.h2>
          <p className="section-description">
            DiagnoSphereX is designed with strong privacy principles to protect sensitive medical information.
          </p>
          <ul className="info-list">
            <li><Shield size={18} className="text-purple" /> Encrypted data transmission</li>
            <li><Shield size={18} className="text-purple" /> Secure authentication standards</li>
            <li><Shield size={18} className="text-purple" /> Privacy-first architecture</li>
          </ul>
        </div>
      </section>

      <section className="info-section careers-section" id="careers">
        <div className="info-content">
          <div className="info-icon-wrapper">
            <Users size={40} className="text-purple drop-glow" />
          </div>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Join the Future of <span className="text-gradient">Medical AI</span>
          </motion.h2>
          <p className="section-description">
            DiagnoSphereX is currently expanding its research and development team. We are actively looking for passionate individuals interested in building the next generation of intelligent healthcare technologies.
          </p>
          
          <div className="roles-grid">
            {['AI Research Intern', 'Biomedical Engineering Intern', 'Frontend Developer Intern', 'Product Coordinator', 'Technical Coordinator'].map((role, idx) => (
              <div key={idx} className="role-card glass-panel">
                <span>{role}</span>
                <span className="badge">Open</span>
              </div>
            ))}
          </div>
          
          <button className="btn-primary ripple-btn glow-effect mt-8">Apply for Internship</button>
        </div>
      </section>

      <section className="info-section about-section" id="about">
        <div className="info-grid">
          <motion.div 
            className="about-card glass-panel elevation-3d"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Lightbulb size={32} className="text-cyan mb-4" />
            <h3 className="section-title text-start">The Vision Behind <br/>DiagnoSphereX</h3>
            <p className="section-description text-start mt-4">
              DiagnoSphereX was created to bridge the gap between complex medical information and human understanding.
              <br/><br/>
              Modern healthcare produces enormous volumes of diagnostic data. Interpreting this information quickly and accurately can be difficult for both clinicians and patients.
              <br/><br/>
              DiagnoSphereX leverages artificial intelligence to simplify this complexity and deliver clear, meaningful insights.
            </p>
          </motion.div>

          <motion.div 
            className="founder-card glass-panel elevation-3d"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <User size={32} className="text-purple mb-4" />
            <h3 className="section-title text-start">Led by Biomedical <br/>Innovation</h3>
            <p className="section-description text-start mt-4">
              DiagnoSphereX is led by <strong>K. Tharun</strong>, a biomedical engineering student dedicated to building advanced AI-driven healthcare systems.
              <br/><br/>
              The goal of the platform is to make medical knowledge easier to interpret, faster to access, and more useful for real-world healthcare decisions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="cta-section">
        <motion.div
           className="cta-content glass-panel"
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <div className="cta-glow" />
          <h2 className="cta-headline">Experience the Future of Medical Intelligence</h2>
          <button className="btn-primary ripple-btn glow-effect cta-btn">Join Early Access</button>
        </motion.div>
      </section>
    </>
  );
};

export default SecurityCareersAbout;
