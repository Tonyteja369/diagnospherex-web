import { useState } from 'react';
import '../../styles/TestimonialsSection.css';

const TESTIMONIALS = [
  {
    id: 't1',
    quote: '“DiagnoSphereX explained my father\'s complex diabetes panel in plain Telugu. We knew exactly what to ask our doctor in Vijayawada.”',
    author: 'Ravi Teja',
    role: 'Hyderabad'
  },
  {
    id: 't2',
    quote: '“The Family Health Vault is incredible. independent encryption per member. Independent security. A masterpiece of design.”',
    author: 'Dr. Ananya Rao',
    role: 'Bengaluru'
  },
  {
    id: 't3',
    quote: '“Zero clutter. The interface feels invisible, allowing clinical data to emerge naturally. Absolutely clinical.”',
    author: 'Kiran Kumar',
    role: 'Vizag'
  }
];

const TestimonialsSection = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="testimonials-header">
          <p className="test-eyebrow">User Trust</p>
          <h2 className="section-title">Stones in <span className="text-gradient">Still Water</span></h2>
          <p className="test-sub">
            Read what early users say about the platform, presented as smooth organic protrusions resting in still liquid depth.
          </p>
        </div>

        <div className="testimonials-fluid-pond">
          {TESTIMONIALS.map((t) => {
            const isHovered = hoveredId === t.id;

            return (
              <div
                key={t.id}
                className="testimonial-stone"
                onMouseEnter={() => setHoveredId(t.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Internal refraction shadow/light */}
                <div 
                  className="stone-internal-scatter"
                  style={{
                    background: isHovered 
                      ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.03) 0%, rgba(10,132,255,0.06) 50%, transparent 80%)'
                      : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.015) 0%, transparent 70%)'
                  }}
                />

                <div className="stone-content">
                  <p className="stone-quote">{t.quote}</p>
                  <div className="stone-meta">
                    <span className="stone-author">{t.author}</span>
                    <span className="stone-role">{t.role}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
