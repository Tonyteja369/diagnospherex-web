import { useState } from 'react';
import { Activity, Heart, Shield, Droplet } from 'lucide-react';
import '../../styles/DashboardSection.css';

const METRICS = [
  { id: 'hb', name: 'Haemoglobin', value: '12.8', unit: 'g/dL', status: 'Stable', range: 'ICMR: 12.0 - 15.0', color: '#30D158', Icon: Droplet },
  { id: 'wbc', name: 'WBC Count', value: '7,400', unit: '/µL', status: 'Stable', range: 'ICMR: 4,000 - 10,000', color: '#30D158', Icon: Activity },
  { id: 'plt', name: 'Platelets', value: '240k', unit: '/µL', status: 'Stable', range: 'ICMR: 150k - 450k', color: '#30D158', Icon: Heart },
  { id: 'crp', name: 'CRP Index', value: '1.2', unit: 'mg/L', status: 'Stable', range: 'ICMR: < 3.0', color: '#30D158', Icon: Shield },
];

const DashboardSection = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="dashboard-section" id="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <p className="dash-eyebrow">Interactive Engine</p>
          <h2 className="section-title">Suspended Clinical <span className="text-gradient">Intelligence</span></h2>
          <p className="dash-sub">
            Your patient records are no longer stacked on top of a screen. They exist deep within the liquid material, processed inside a secure, encrypted enclave.
          </p>
        </div>

        <div className="dash-surface">
          {/* Ambient light scatter deep in the material */}
          <div className="dash-ambient-glow-1" />
          <div className="dash-ambient-glow-2" />

          {/* Suspended Dashboard Elements */}
          <div className="dash-metrics-grid">
            {METRICS.map((m) => {
              const Icon = m.Icon;
              const isHovered = hoveredId === m.id;

              return (
                <div
                  key={m.id}
                  className="dash-metric-suspended"
                  onMouseEnter={() => setHoveredId(m.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Internal material light scatter */}
                  <div 
                    className="metric-scatter-light" 
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${m.color}25 0%, transparent 70%)`,
                      transform: isHovered ? 'scale(1.3) translate(-5%, -5%)' : 'scale(1)',
                      opacity: isHovered ? 0.95 : 0.6
                    }}
                  />

                  <div className="metric-icon-wrap">
                    <Icon size={20} color={m.color} />
                  </div>

                  <div className="metric-info">
                    <span className="metric-name">{m.name}</span>
                    <div className="metric-value-row">
                      <span className="metric-val">{m.value}</span>
                      <span className="metric-unit">{m.unit}</span>
                    </div>
                    <span className="metric-status" style={{ color: m.color }}>
                      ● {m.status}
                    </span>
                    <span className="metric-range">{m.range}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Suspended Analysis Panel */}
          <div className="dash-analysis-suspended">
            <div className="analysis-scatter-light" />
            <div className="analysis-content">
              <span className="analysis-label">AI Diagnostic Output</span>
              <p className="analysis-statement">
                All clinical values are within the normal reference range calibrated for Indian demographics. No immediate intervention is required.
              </p>
              <div className="analysis-confidence">
                <span>Confidence Index</span>
                <div className="confidence-track">
                  <div className="confidence-fill" />
                </div>
                <span className="confidence-pct">99.8%</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
