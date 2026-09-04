import React from 'react';
import { Github, Linkedin, Instagram, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="container">
        
        {/* Top Grid */}
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <a href="#hero" className="footer-brand-logo">
              <img src="/logo1.png" alt="DiagnoSphereX Logo" className="footer-logo-img" />
              <span className="footer-logo-text">Diagno<span className="text-gradient">Sphere</span>X</span>
            </a>
            <p className="footer-desc">
              Transforming complex medical reports and biomedical telemetry into explainable, trustworthy clinical intelligence for families and clinicians across India.
            </p>
            <div className="footer-contact-item">
              <Mail size={15} className="contact-icon" />
              <a href="mailto:diagnospherex@gmail.com" className="footer-email-link">
                diagnospherex@gmail.com
              </a>
            </div>
            <div className="footer-location-item">
              <MapPin size={15} className="contact-icon" />
              <span>Vijayawada, Andhra Pradesh, India</span>
            </div>
          </div>

          {/* Links Columns */}
          <div className="footer-links-grid">
            {/* Product */}
            <div className="footer-link-group">
              <h4 className="footer-group-title">Product</h4>
              <ul className="footer-links-list">
                <li><a href="#hero">Overview</a></li>
                <li><a href="#features">Report Analyzer</a></li>
                <li><a href="#features">Family Vault</a></li>
                <li><a href="#demo">Live Demo</a></li>
                <li><a href="#security">Security & Privacy</a></li>
              </ul>
            </div>

            {/* Research & Division */}
            <div className="footer-link-group">
              <h4 className="footer-group-title">Research</h4>
              <ul className="footer-links-list">
                <li>
                  <a href="https://linkedin.com/in/tharuntej-diagnospherex" target="_blank" rel="noopener noreferrer" className="external-footer-link">
                    <span>Human Intelligence Engine</span>
                    <ArrowUpRight size={12} />
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/in/tharuntej-diagnospherex" target="_blank" rel="noopener noreferrer" className="external-footer-link">
                    <span>NeuroSenseX Research</span>
                    <ArrowUpRight size={12} />
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/in/tharuntej-diagnospherex" target="_blank" rel="noopener noreferrer" className="external-footer-link">
                    <span>MedQuantum-NIN Lab</span>
                    <ArrowUpRight size={12} />
                  </a>
                </li>
                <li><a href="#security">ICMR Indian Baselines</a></li>
              </ul>
            </div>

            {/* Company & Careers */}
            <div className="footer-link-group">
              <h4 className="footer-group-title">Company</h4>
              <ul className="footer-links-list">
                <li><a href="#about">About DiagnoSphereX</a></li>
                <li>
                  <a href="mailto:diagnospherex@gmail.com?subject=Internship%20Application%20-%20DiagnoSphereX" className="internship-link">
                    <span>Careers & Internships</span>
                    <span className="hiring-pill">Hiring</span>
                  </a>
                </li>
                <li><a href="#about">Clinical Advisory</a></li>
                <li><a href="mailto:diagnospherex@gmail.com">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Middle: Social Profiles */}
        <div className="footer-social-row">
          <div className="footer-founder-tag">
            <span>Founded & Engineered by <strong>K. Tharun</strong> · Biomedical Engineering</span>
          </div>

          <div className="footer-social-icons">
            <a 
              href="https://github.com/Tonyteja369" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-circle-btn"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a 
              href="https://linkedin.com/in/tharuntej-diagnospherex" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-circle-btn"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href="https://instagram.com/diagnosphere.x" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-circle-btn"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © 2026 DiagnoSphereX. All rights reserved. Made with care in Andhra Pradesh, India.
          </p>
          <div className="footer-legal-links">
            <a href="#">Privacy Policy</a>
            <span className="dot-sep">•</span>
            <a href="#">Terms of Service</a>
            <span className="dot-sep">•</span>
            <a href="#">ICMR Compliance Notice</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
