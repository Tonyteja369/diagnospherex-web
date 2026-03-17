import { useState } from 'react';
import '../../styles/LogoShowcase.css';

const logos = [
  { src: '/logo1.png', alt: 'Globe Icon', label: 'Icon Mark' },
  { src: '/logo3.png', alt: 'Full Logo with Icon', label: 'Primary Logo' },
  { src: '/logo2.png', alt: 'DSX Monogram', label: 'Monogram' },
  { src: '/logo4.png', alt: 'Text Wordmark', label: 'Wordmark' },
];

const LogoShowcase = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="logo-showcase-section">
      <div className="logo-showcase-inner">
        <p className="logo-section-label">DiagnoSphereX Brand Identity</p>

        <div className="logo-accordion-row">
          {logos.map((logo, i) => (
            <div
              key={i}
              className={`logo-acc-card ${hoveredIdx === i ? 'expanded' : hoveredIdx !== null ? 'collapsed' : ''}`}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="logo-acc-bg">
                <img src={logo.src} alt={logo.alt} className="logo-acc-img" loading="lazy" />
                <span className="logo-acc-label">{logo.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoShowcase;
