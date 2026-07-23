import { useState } from 'react';
import { Eye, Shield, Users } from 'lucide-react';
import '../../styles/FeaturesSection.css';

const FEATURES = [
  {
    id: 'feat1',
    Icon: Eye,
    title: 'Instant Calibration',
    desc: 'Reads reports calibrated for regional Indian populations. Not general averages. Local, clinical, precise.',
    depthClass: 'depth-shallow',
    accentColor: '#30D158'
  },
  {
    id: 'feat2',
    Icon: Shield,
    title: 'Independent Encryption',
    desc: 'Independent encryption per record. Only you hold the key. Security is not an option; it is built into the material.',
    depthClass: 'depth-medium',
    accentColor: '#0A84FF'
  },
  {
    id: 'feat3',
    Icon: Users,
    title: 'Family Health Pool',
    desc: 'Brings up to 6 family members into one integrated health stream. Track correlations across histories seamlessly.',
    depthClass: 'depth-deep',
    accentColor: '#30D158'
  }
];

const FeaturesSection = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="features-header">
          <p className="feat-eyebrow">Platform Capabilities</p>
          <h2 className="section-title">Refracted <span className="text-gradient">Capabilities</span></h2>
          <p className="feat-sub">
            Zero containers. Capabilities float suspended inside the liquid medium at varying depths, organized purely by visual hierarchy.
          </p>
        </div>

        <div className="features-fluid-flow">
          {FEATURES.map((f) => {
            const Icon = f.Icon;
            const isActive = activeId === f.id;

            return (
              <div
                key={f.id}
                className={`features-suspended-item ${f.depthClass} ${isActive ? 'item-tension-shift' : ''}`}
                onMouseEnter={() => setActiveId(f.id)}
                onMouseLeave={() => setActiveId(null)}
              >
                {/* Under-surface light scattering */}
                <div 
                  className="feat-underglow" 
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${f.accentColor}18 0%, transparent 60%)`,
                    opacity: isActive ? 0.9 : 0.4
                  }}
                />

                <div className="feat-icon-wrap" style={{ color: f.accentColor }}>
                  <Icon size={24} />
                </div>

                <div className="feat-info">
                  <h3 className="feat-title">{f.title}</h3>
                  <p className="feat-desc">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
