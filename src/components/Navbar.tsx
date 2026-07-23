import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import '../styles/Navbar.css';

interface NavbarProps {
  onOpenModal?: () => void;
}

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Features', href: '#features' },
  { name: 'Technology', href: '#technology' },
  { name: 'Research', href: '#research' },
  { name: 'Demo', href: '#demo' },
  { name: 'Security', href: '#security' },
  { name: 'Careers', href: '#careers' },
  { name: 'About', href: '#about' }
];

const Navbar = ({ onOpenModal }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setIsIdle(false);
      clearTimeout(idleTimer);

      if (window.scrollY > 50) {
        idleTimer = setTimeout(() => {
          setIsIdle(true);
        }, 2500);
      }

      // Determine active section for nav link highlighting
      const sections = navLinks.map(l => l.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <motion.header
      className={`navbar-container ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className={`navbar glass-panel ${isIdle ? 'nav-idle' : ''}`}>
        <div className="navbar-logo">
          <a href="#hero" className="navbar-logo-pill">
            <img src="/logo1.png" alt="DiagnoSphereX Logo" className="navbar-logo-img" loading="lazy" />
            <span className="logo-text ml-2">DiagnoSphereX</span>
          </a>
        </div>

        <nav className="navbar-links desktop-only">
          {navLinks.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;

            return (
              <a 
                key={link.name} 
                href={link.href} 
                className={`nav-link ${isActive ? 'active-nav-link' : ''}`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    className="active-indicator"
                    layoutId="activeNavIndicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="navbar-actions desktop-only">
          <button 
            className="btn-primary ripple-btn glow-effect cta-nav"
            onClick={onOpenModal}
          >
            Join the waitlist for free
          </button>
        </div>

        <button 
          className="mobile-menu-btn mobile-only"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
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
              className={`mobile-nav-link ${activeSection === link.href.substring(1) ? 'active-mobile-link' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button 
            className="btn-primary ripple-btn glow-effect w-full mt-4"
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenModal) onOpenModal();
            }}
          >
            Join the waitlist for free
          </button>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
