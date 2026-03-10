import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  onNavigate?: (page: 'landing' | 'demo') => void;
}

const Navbar = ({ onNavigate }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#features' },
    { name: 'Technology', href: '#technology' },
    { name: 'Demo', href: '#demo' },
    { name: 'Security', href: '#security' },
    { name: 'Careers', href: '#careers' },
    { name: 'About', href: '#about' }
  ];

  return (
    <motion.header
      className={`navbar-container ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="navbar glass-panel">
        <div className="navbar-logo">
          <div className="navbar-logo-pill">
            <img src="/logo1.png" alt="DiagnoSphereX Logo" className="navbar-logo-img" />
          </div>
        </div>

        <nav className="navbar-links desktop-only">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.name === 'Demo' ? '#' : link.href} 
              className="nav-link"
              onClick={(e) => {
                if(link.name === 'Demo' || link.name === 'Home') {
                  e.preventDefault();
                  if(onNavigate) onNavigate(link.name === 'Demo' ? 'demo' : 'landing');
                }
              }}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="navbar-actions desktop-only">
          <button className="btn-primary ripple-btn glow-effect cta-nav">
            Get Early Access
          </button>
        </div>

        <button 
          className="mobile-menu-btn mobile-only"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="mobile-menu glass-panel"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className="btn-primary ripple-btn glow-effect w-full mt-4">
            Get Early Access
          </button>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
