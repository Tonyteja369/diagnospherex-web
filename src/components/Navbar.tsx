import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import GlassSurface from './reactbits/GlassSurface';
import MetallicBorderButton from './reactbits/MetallicBorderButton';
import '../styles/Navbar.css';

interface NavbarProps {
  onOpenModal?: () => void;
}

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Features', href: '#features' },
  { name: 'Demo', href: '#demo' },
  { name: 'Security', href: '#security' },
  { name: 'About', href: '#about' },
];

function useScrollDirection() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        // Always show near the top of the page
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down → hide
        setVisible(false);
      } else {
        // Scrolling up → show
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return visible;
}

const Navbar = ({ onOpenModal }: NavbarProps) => {
  const visible = useScrollDirection();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Determine active section for nav link highlighting
      const sections = navLinks.map((l) => l.href.substring(1));
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWaitlistClick = () => {
    setMobileMenuOpen(false);
    const ctaEl = document.getElementById('waitlist-stepper') || document.getElementById('cta');
    if (ctaEl) {
      ctaEl.scrollIntoView({ behavior: 'smooth' });
    } else if (onOpenModal) {
      onOpenModal();
    }
  };

  return (
    <>
      <header
        className={`navbar-wrapper liquid-glass liquid-glass-nav ${scrolled ? 'is-scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: '16px',
          left: '0',
          right: '0',
          margin: '0 auto',
          zIndex: 100,
          maxWidth: '1180px',
          width: 'calc(100% - 32px)',
          transform: visible ? 'translateY(0)' : 'translateY(-140%)',
          transition: 'transform 300ms ease, opacity 300ms ease',
        }}
      >
        <GlassSurface
          width="100%"
          height={scrolled ? 58 : 72}
          borderRadius={9999}
          backgroundOpacity={0.12}
          saturation={1.5}
          distortionScale={-70}
          redOffset={2}
          greenOffset={6}
          blueOffset={10}
          displace={1.5}
          blur={16}
          brightness={95}
          opacity={0.95}
          style={{ transition: 'height 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          <div className="navbar-container">
            <nav className="navbar-inner" style={{ height: scrolled ? '58px' : '72px', transition: 'height 0.3s ease' }}>
              {/* Logo */}
              <a
                href="#hero"
                onClick={(e) => handleNavClick(e, '#hero')}
                className="navbar-logo"
                aria-label="DiagnoSphereX Home"
              >
                <img src="/logo1.png" alt="DiagnoSphereX Logo" className="navbar-logo-img" />
                <span className="logo-brand">
                  Diagno<span className="text-gradient">Sphere</span>X
                </span>
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
                      onClick={(e) => handleNavClick(e, link.href)}
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

              {/* Actions: Metallic Border CTA & Hamburger */}
              <div className="navbar-actions">
                <MetallicBorderButton
                  size="sm"
                  variant="solid"
                  onClick={handleWaitlistClick}
                  className="cta-nav"
                >
                  <span>Join Waitlist</span>
                  <ArrowRight size={14} className="btn-icon-arrow" />
                </MetallicBorderButton>

                <button
                  className="mobile-menu-btn mobile-only"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Open navigation menu"
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </nav>
          </div>
        </GlassSurface>
      </header>

      {/* Mobile Menu: Expanding Rectangular Surface Reveal Animation */}
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

            {/* Expanding Rectangular Menu Surface */}
            <motion.div
              className="mobile-expanding-menu"
              initial={{
                opacity: 0,
                scale: 0.92,
                y: -20,
                clipPath: 'polygon(10% 0%, 90% 0%, 90% 20%, 10% 20%)',
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: -10,
                clipPath: 'polygon(10% 0%, 90% 0%, 90% 10%, 10% 10%)',
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mobile-menu-inner">
                <div className="mobile-menu-links">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className={`mobile-nav-link ${activeSection === link.href.substring(1) ? 'active-mobile-link' : ''}`}
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>

                <div className="mobile-menu-footer">
                  <MetallicBorderButton
                    size="md"
                    onClick={handleWaitlistClick}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Join Waitlist</span>
                    <ArrowRight size={16} className="btn-icon-arrow" />
                  </MetallicBorderButton>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
