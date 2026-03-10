import { Github, Linkedin, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer glass-panel">
      <div className="footer-content">
        {/* Left Side: Brand and Description */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-text">Diagno<span className="text-gradient">Sphere</span>X</span>
          </div>
          <p className="footer-tagline">
            AI-powered tools designed to simplify medical information and assist healthcare decision-making.
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
              <span className="contact-label"><Phone size={14} className="mr-2 inline" /> Phone</span>
              <span className="contact-value text-white">+91 7036834428</span>
            </div>
            
            <div className="contact-item">
              <span className="contact-label"><Mail size={14} className="mr-2 inline" /> Email</span>
              <a href="mailto:diagnospherex@gmail.com" className="contact-value link text-cyan">diagnospherex@gmail.com</a>
            </div>
            
            <div className="contact-item">
              <span className="contact-label"><MapPin size={14} className="mr-2 inline" /> Location</span>
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
        <p className="footer-message mt-4 max-w-2xl mx-auto">
          Stay connected for updates on AI-powered healthcare tools, research progress, and development of the DiagnoSphereX platform.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
