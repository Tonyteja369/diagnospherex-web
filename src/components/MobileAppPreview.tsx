import { useEffect, useState } from 'react';
import { Upload, Info } from 'lucide-react';
import '../styles/MobileAppPreview.css';

/* ---- Screen 1: AI Dashboard ---- */
const Screen1Dashboard = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [barW, setBarW] = useState(0);

  useEffect(() => {
    // Count-up animation
    const dur = 1200;
    const steps = 40;
    let i = 0;
    const t = setInterval(() => {
      i++;
      const p = i / steps;
      setCount1(Math.round(1284 * p));
      setCount2(Math.round(342 * p));
      setAccuracy(parseFloat((94.2 * p).toFixed(1)));
      if (i >= steps) clearInterval(t);
    }, dur / steps);
    // Chart bar animation
    setTimeout(() => setBarW(72), 600);
    return () => { clearInterval(t); };
  }, []);

  return (
    <div className="app-screen screen1">
      {/* Header */}
      <div className="app-header">
        <div className="app-logo-dot" />
        <div>
          <div className="app-brand">DiagnoSphereX</div>
          <div className="app-greeting">Good morning, Dr. Williams</div>
        </div>
        <div className="app-avatar">DW</div>
      </div>
      <div className="app-sub">Clinical Intelligence Overview</div>

      {/* Stats grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{count1.toLocaleString()}</div>
          <div className="stat-label">Analyses</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{count2}</div>
          <div className="stat-label">Reports Today</div>
        </div>
        <div className="stat-card highlight">
          <div className="stat-value">{accuracy}%</div>
          <div className="stat-label">Accuracy</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">6.4s</div>
          <div className="stat-label">Avg. Speed</div>
        </div>
      </div>

      {/* Mini chart */}
      <div className="glass-card chart-card">
        <div className="card-title">Last 7 Days Activity</div>
        <div className="mini-chart">
          {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
            <div key={i} className="bar-wrap">
              <div className="bar" style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }} />
            </div>
          ))}
        </div>
        <div className="chart-legend">
          <span className="legend-dot purple" />Analyses
          <span className="legend-dot cyan" />Reports
        </div>
      </div>

      {/* AI Insight card */}
      <div className="glass-card insight-card">
        <div className="insight-tag">Clinical Insight</div>
        <p className="insight-text">
          Inflammatory markers detected. Elevated CRP and WBC suggest acute response.
        </p>
        <div className="confidence-bar">
          <div className="confidence-fill" style={{ width: `${barW}%` }} />
          <span className="confidence-label">Confidence: 92%</span>
        </div>
        <button className="app-btn">View Detailed Analysis</button>
      </div>

      {/* Bottom nav */}
      <div className="bottom-nav">
        {['Home', 'Reports', 'AI', 'Patients', 'More'].map(n => (
          <div key={n} className={`nav-item ${n === 'Home' ? 'active' : ''}`}>
            <div className="nav-dot" />
            <span>{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---- Screen 2: Report Analyzer ---- */
const Screen2Analyzer = () => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Animate progress
    let p = 0;
    const t = setInterval(() => {
      p = (p + 0.3) % 101;
      setProgress(p);
    }, 60);
    // Cycle stages
    const s = setInterval(() => setStage(n => (n + 1) % 4), 1500);
    return () => { clearInterval(t); clearInterval(s); };
  }, []);

  const stages = [
    'Analyzing laboratory values...',
    'Mapping medical terminology...',
    'Detecting abnormal markers...',
    'Generating clinical insights...',
  ];

  return (
    <div className="app-screen screen2">
      {/* Header */}
      <div className="app-header">
        <div className="app-logo-dot" />
        <div>
          <div className="app-brand">DiagnoSphereX</div>
          <div className="app-greeting">Report Assistant</div>
        </div>
      </div>
      <div className="app-sub">Transform clinical data into clear insights.</div>

      {/* Upload section */}
      <div className="glass-card upload-card">
        <div className="upload-icon"><Upload size={20} color="#2FD3FF" /></div>
        <div className="upload-title">Process Medical Report</div>
        <div className="upload-formats">
          {['PDF', 'DICOM', 'LAB', 'NOTES'].map(f => (
            <span key={f} className="format-tag">{f}</span>
          ))}
        </div>
        <button className="app-btn">Explore Lab Report</button>
      </div>

      {/* Processing card */}
      <div className="glass-card process-card">
        <div className="card-title">System Analysis Status</div>
        <div className="stage-list">
          {stages.map((s, i) => (
            <div key={i} className={`stage-item ${i === stage ? 'active' : i < stage ? 'done' : ''}`}>
              <div className="stage-dot" />
              <span>{s}</span>
            </div>
          ))}
        </div>
        <div className="process-progress-label">
          Progress <span className="pct">{Math.round(progress)}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }}>
            <div className="progress-glow" />
          </div>
        </div>
      </div>

      {/* Insights panel */}
      <div className="glass-card results-card">
        <div className="card-title">Clinical Summary</div>
        <p className="insight-text">
          Findings suggest mild anemia and acute inflammatory response.
        </p>
        <div className="markers">
          <span className="marker low">Hb – Low</span>
          <span className="marker high">WBC – High</span>
        </div>
        <div className="recommendation">
          <Info size={10} style={{marginRight: '4px', display: 'inline'}} />
          Consult physician for clinical correlation.
        </div>
        <button className="app-btn secondary">Generate Clinical Summary</button>
      </div>

      {/* Bottom nav */}
      <div className="bottom-nav">
        {['Home', 'Reports', 'Asst', 'Vault', 'User'].map(n => (
          <div key={n} className={`nav-item ${n === 'Reports' ? 'active' : ''}`}>
            <div className="nav-dot" />
            <span>{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
/* ---- Phone Frame Wrapper ---- */
const PhoneFrame = ({ children, tilt }: { children: React.ReactNode; tilt?: string }) => (
  <div className="phone-frame" style={{ transform: tilt }}>
    <div className="phone-notch" />
    <div className="phone-screen">{children}</div>
    <div className="phone-home-bar" />
  </div>
);

/* ---- Main Export ---- */
const MobileAppPreview = () => (
  <div className="mobile-preview-container">
    <PhoneFrame tilt="rotate(-4deg) translateY(10px)">
      <Screen1Dashboard />
    </PhoneFrame>
    <PhoneFrame tilt="rotate(3deg) translateY(-10px)">
      <Screen2Analyzer />
    </PhoneFrame>
  </div>
);

export default MobileAppPreview;
