import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import '../styles/Navbar.css';

interface NavbarProps {
  onOpenModal?: () => void;
}

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Features', href: '#features' },
  { name: 'Demo', href: '#demo' },
  { name: 'Security', href: '#security' },
  { name: 'About', href: '#about' }
];

const Navbar = ({ onOpenModal }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section for nav link highlighting
      const sections = navLinks.map(l => l.href.substring(1));
      const scrollPos = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile drawer on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock scroll when mobile drawer open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`navbar-wrapper ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="navbar-container">
          <nav className="navbar-inner">
            {/* Logo */}
            <a href="#hero" className="navbar-logo" aria-label="DiagnoSphereX Home">
              <img src="/logo1.png" alt="DiagnoSphereX Logo" className="navbar-logo-img" />
              <span className="logo-brand">Diagno<span className="text-gradient">Sphere</span>X</span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="navbar-links desktop-only" role="menubar">
              {navLinks.map((link) => {
                const sectionId = link.href.substring(1);
                const isActive = activeSection === sectionId;

                return (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className={`nav-link ${isActive ? 'active-nav-link' : ''}`}
                    role="menuitem"
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        className="active-indicator"
                        layoutId="activeNavIndicator"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Actions: Theme Toggle, CTA & Hamburger */}
            <div className="navbar-actions">
              <ThemeToggle />

              <button 
                className="btn-primary cta-nav"
                onClick={onOpenModal}
              >
                Join the waitlist
              </button>

              <button 
                className="mobile-menu-btn mobile-only"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu size={22} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer & Scrim */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Scrim */}
            <motion.div
              className="mobile-drawer-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-in Full-Height Drawer */}
            <motion.aside
              className="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
            >
              <div className="mobile-drawer-header">
                <div className="navbar-logo">
                  <img src="/logo1.png" alt="DiagnoSphereX Logo" className="navbar-logo-img" />
                  <span className="logo-brand">Diagno<span className="text-gradient">Sphere</span>X</span>
                </div>
                <button 
                  className="mobile-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="mobile-drawer-links">
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
              </div>

              <div className="mobile-drawer-footer">
                <button 
                  className="btn-primary w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenModal) onOpenModal();
                  }}
                >
                  Join the waitlist for free
                </button>
                <p className="mobile-drawer-note">
                  AI that explains, not just analyzes.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
