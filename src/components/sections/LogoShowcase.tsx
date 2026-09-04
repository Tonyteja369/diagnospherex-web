import React from 'react';
import GlassSurface from '../reactbits/GlassSurface';
import MetallicPaint from '../reactbits/MetallicPaint';
import '../../styles/LogoShowcase.css';

const logos = [
  { src: '/logo1.png', alt: 'Globe Icon', label: 'Icon Mark', isMetallic: true },
  { src: '/logo3.png', alt: 'Full Logo with Icon', label: 'Primary Logo', isMetallic: false },
  { src: '/logo2.png', alt: 'DSX Monogram', label: 'Monogram', isMetallic: false },
  { src: '/logo4.png', alt: 'Text Wordmark', label: 'Wordmark', isMetallic: false },
];

const LogoShowcase: React.FC = () => {
  return (
    <section className="logo-showcase-section" style={{ padding: '64px 24px', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <p
          className="eyebrow-tag"
          style={{
            display: 'inline-block',
            marginBottom: '12px',
            fontSize: '0.82rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: 'var(--accent-purple, #8B5CF6)',
            textTransform: 'uppercase',
          }}
        >
          Brand Identity & System
        </p>

        <h3
          style={{
            fontSize: '1.8rem',
            fontWeight: 700,
            marginBottom: '36px',
            color: 'var(--text-primary, #0F172A)',
          }}
        >
          DiagnoSphereX Visual Identity Marks
        </h3>

        <div
          className="brand-tiles-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            justifyItems: 'center',
          }}
        >
          {logos.map((logo) => (
            <GlassSurface
              key={logo.label}
              width={260}
              height={260}
              borderRadius={20}
              backgroundOpacity={0.08}
              saturation={1.4}
              distortionScale={-90}
              redOffset={2}
              greenOffset={6}
              blueOffset={12}
              displace={2}
              blur={14}
              brightness={100}
              opacity={0.95}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '160px',
                }}
              >
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
                    style={{
                      maxHeight: '100px',
                      maxWidth: '180px',
                      objectFit: 'contain',
                    }}
                    loading="lazy"
                  />
                )}
              </div>

              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary, #64748B)',
                  marginTop: '12px',
                  letterSpacing: '0.04em',
                }}
              >
                {logo.label}
              </span>
            </GlassSurface>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoShowcase;
