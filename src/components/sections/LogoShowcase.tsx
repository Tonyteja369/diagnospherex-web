import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ZoomIn } from 'lucide-react';
import GlassSurface from '../reactbits/GlassSurface';
import MetallicPaint from '../reactbits/MetallicPaint';
import '../../styles/LogoShowcase.css';

interface LogoItem {
  src: string;
  alt: string;
  label: string;
  category: string;
  description: string;
  isMetallic?: boolean;
}

const LOGOS: LogoItem[] = [
  {
    src: '/logo1.png',
    alt: 'DiagnoSphereX Globe Icon',
    label: 'Icon Mark',
    category: 'Flagship Glyph',
    description: 'Dynamic neural globe with ICMR-calibrated diagnostic orbital nodes representing continuous biomedical intelligence.',
    isMetallic: true,
  },
  {
    src: '/logo3.png',
    alt: 'DiagnoSphereX Primary Logo with Icon',
    label: 'Primary Logo',
    category: 'Lockup Mark',
    description: 'The official horizontal lockup pairing the neural globe with high-legibility geometric typography.',
    isMetallic: false,
  },
  {
    src: '/logo2.png',
    alt: 'DiagnoSphereX DSX Monogram',
    label: 'Monogram',
    category: 'Compact Signature',
    description: 'Ultra-compact monogram engineered for mobile app icons, secure enclaves, and technical report headers.',
    isMetallic: false,
  },
  {
    src: '/logo4.png',
    alt: 'DiagnoSphereX Text Wordmark',
    label: 'Wordmark',
    category: 'Editorial Signature',
    description: 'Precision typographic mark crafted for clinical publications, research whitepapers, and academic citations.',
    isMetallic: false,
  },
];

const LogoShowcase: React.FC = () => {
  const [selectedLogo, setSelectedLogo] = useState<LogoItem | null>(null);

  return (
    <section className="logo-showcase-section" id="brand-identity">
      <div className="container">
        {/* Header */}
        <div className="section-header text-center" style={{ marginBottom: '48px' }}>
          <span className="eyebrow-tag">
            <Sparkles size={13} />
            Brand Identity System
          </span>
          <h2 className="section-title">
            DiagnoSphereX <span className="text-gradient">Visual Marks</span>
          </h2>
          <p className="section-desc">
            A cohesive identity designed for clinical precision, technical authority, and immediate patient trust. Tap any mark to preview.
          </p>
        </div>

        {/* 4-Tile Grid with Staggered Scroll Reveal */}
        <div className="brand-tiles-grid">
          {LOGOS.map((logo, idx) => (
            <motion.div
              key={logo.label}
              className="brand-tile-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedLogo(logo)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedLogo(logo)}
              aria-label={`Preview ${logo.label}`}
              style={{ width: '100%', maxWidth: '280px' }}
            >
              <GlassSurface
                width="100%"
                height={270}
                borderRadius={22}
                backgroundOpacity={0.14}
                saturation={1.5}
                distortionScale={-80}
                redOffset={2}
                greenOffset={5}
                blueOffset={10}
                displace={1.8}
                blur={18}
                brightness={95}
                opacity={0.96}
                className="brand-glass-tile"
              >
                <div className="brand-tile-content">
                  {/* Top Category Badge */}
                  <span className="brand-tile-cat">{logo.category}</span>

                  {/* Visual Logo Center */}
                  <div className="brand-tile-visual">
                    {logo.isMetallic ? (
                      <MetallicPaint
                        imageSrc={logo.src}
                        seed={7}
                        scale={3}
                        patternSharpness={1.2}
                        noiseScale={0.4}
                        speed={0.15}
                        liquid={0.3}
                        mouseAnimation={true}
                        brightness={1.6}
                        contrast={0.6}
                        refraction={0.008}
                        blur={0.02}
                        chromaticSpread={1}
                        fresnel={0.8}
                        lightColor="#F5F3FF"
                        darkColor="#4C1D95"
                        tintColor="#DDD6FE"
                        style={{ width: '110px', height: '110px' }}
                      />
                    ) : (
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="brand-logo-img"
                        loading="lazy"
                      />
                    )}
                  </div>

                  {/* Label Strictly Below */}
                  <div className="brand-tile-footer">
                    <span className="brand-tile-label">{logo.label}</span>
                    <span className="brand-tile-hint">
                      <ZoomIn size={12} />
                      Preview
                    </span>
                  </div>
                </div>
              </GlassSurface>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Zoom Preview Modal ── */}
      <AnimatePresence>
        {selectedLogo && (
          <>
            {/* Backdrop Scrim */}
            <motion.div
              className="logo-zoom-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedLogo(null)}
              aria-hidden="true"
            />

            {/* Modal Dialog Card */}
            <div className="logo-zoom-wrapper" onClick={() => setSelectedLogo(null)}>
              <motion.div
                className="logo-zoom-card"
                initial={{ opacity: 0, scale: 0.88, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  className="logo-zoom-close"
                  onClick={() => setSelectedLogo(null)}
                  aria-label="Close preview"
                >
                  <X size={20} />
                </button>

                {/* Metallic Frame Glow */}
                <div className="logo-zoom-frame">
                  <div className="logo-zoom-visual-box">
                    <img
                      src={selectedLogo.src}
                      alt={selectedLogo.alt}
                      className="logo-zoom-img"
                    />
                  </div>
                </div>

                {/* Metadata */}
                <div className="logo-zoom-details">
                  <span className="eyebrow-tag" style={{ marginBottom: '8px' }}>
                    {selectedLogo.category}
                  </span>
                  <h3 className="logo-zoom-title">{selectedLogo.label}</h3>
                  <p className="logo-zoom-desc">{selectedLogo.description}</p>
                  
                  <div className="logo-zoom-actions">
                    <button className="btn-secondary" onClick={() => setSelectedLogo(null)}>
                      Done
                    </button>
                    <a
                      href={selectedLogo.src}
                      download={`DiagnoSphereX-${selectedLogo.label.replace(/\s+/g, '-')}.png`}
                      className="btn-primary"
                    >
                      Download Asset
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LogoShowcase;
