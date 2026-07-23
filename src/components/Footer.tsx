import React from 'react';
import { Github, Linkedin, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer glass-panel">
      <div className="footer-content">
        {/* Left Side: Brand and Description */}
        <div className="footer-brand">
          <div className="footer-logo flex items-center gap-2">
            <span className="logo-text text-xl">Diagno<span className="text-gradient">Sphere</span>X</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan font-medium">Research</span>
          </div>
          <p className="footer-tagline mt-3">
            Building Explainable Biomedical Intelligence systems through research, signal processing, neuroscience, and responsible AI.
          </p>
        </div>
        
        <div className="footer-links">
          {/* Middle: Contact Info */}
          <div className="link-group">
            <h4 className="link-title">Connect with DiagnoSphereX</h4>
            
            <div className="contact-item mt-2">
              <span className="contact-label">Founder</span>
              <span className="contact-value text-white">Tharun Tej</span>
            </div>
            
            <div className="contact-item">
              <span className="contact-label"><Phone size={14} className="mr-2 inline text-cyan" /> Phone</span>
              <span className="contact-value text-white">+91 7036834428</span>
            </div>
            
            <div className="contact-item">
              <span className="contact-label"><Mail size={14} className="mr-2 inline text-cyan" /> Email</span>
              <a href="mailto:diagnospherex@gmail.com" className="contact-value link text-cyan">diagnospherex@gmail.com</a>
            </div>
            
            <div className="contact-item">
              <span className="contact-label"><MapPin size={14} className="mr-2 inline text-cyan" /> Location</span>
              <span className="contact-value text-white">Andhra Pradesh, India</span>
            </div>
          </div>
          
          {/* Right: Profiles */}
          <div className="link-group">
            <h4 className="link-title">Professional Profiles</h4>
            <div className="social-links mt-2">
              <a href="https://github.com/Tonyteja369" target="_blank" rel="noopener noreferrer" className="profile-link">
                <Github size={18} />
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/tharuntej-diagnospherex" target="_blank" rel="noopener noreferrer" className="profile-link">
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>
              <a href="https://instagram.com/diagnosphere.x" target="_blank" rel="noopener noreferrer" className="profile-link">
                <Instagram size={18} />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="founder-badge">
          Built and led by <span className="text-white font-semibold">Tharun Tej</span> <span className="separator mx-2 opacity-50">•</span> Founder – DiagnoSphereX
        </div>
        
        <div className="footer-research-line mt-4">
          <span className="frl-title font-semibold text-white">DiagnoSphereX Research</span>
          <span className="frl-sub text-dim">Building Explainable Biomedical Intelligence.</span>
          <div className="frl-projects flex items-center justify-center gap-2 mt-2 text-xs text-cyan">
            <span>Human Intelligence Engine (HIE)</span>
            <span>•</span>
            <span>NeuroSenseX</span>
            <span>•</span>
            <span>MedQuantum-NIN</span>
          </div>
          <div className="frl-tags flex items-center justify-center gap-2 mt-2 text-xs text-dim opacity-70">
            <span>Research</span>
            <span>•</span>
            <span>Engineering</span>
            <span>•</span>
            <span>Healthcare</span>
            <span>•</span>
            <span>Innovation</span>
          </div>
        </div>

        <div className="flex gap-4 justify-center mt-4 text-xs text-dim">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <span className="opacity-50">•</span>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>

        <p className="footer-copyright mt-4 text-xs text-dim opacity-60">
          © 2026 DiagnoSphereX Research. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
