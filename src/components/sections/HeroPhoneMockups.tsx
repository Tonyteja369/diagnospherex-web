import { useEffect, useRef } from 'react';
import '../../styles/HeroPhoneMockups.css';

/* ─── Shared status bar ─── */
const StatusBar = () => (
  <div className="pm-statusbar">
    <span className="pm-time">9:41</span>
    <div className="pm-dynamic-island" />
    <div className="pm-status-icons">
      {/* Signal bars */}
      <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
        <rect x="0" y="5" width="3" height="4" rx="1" fill="white" opacity="0.4"/>
        <rect x="4" y="3" width="3" height="6" rx="1" fill="white" opacity="0.6"/>
        <rect x="8" y="1" width="3" height="8" rx="1" fill="white" opacity="0.8"/>
        <rect x="12" y="0" width="2" height="9" rx="1" fill="white"/>
      </svg>
      {/* Battery */}
      <div className="pm-battery">
        <div className="pm-battery-fill" />
        <div className="pm-battery-tip" />
      </div>
    </div>
  </div>
);

/* ─── LEFT: Blood Test Result ─── */
const LeftScreen = () => (
  <div className="pm-screen-content">
    <StatusBar />
    <div className="pm-app-chrome">
      <span className="pm-back-btn">‹ Reports</span>
      <span className="pm-app-title">Analysis</span>
      <span className="pm-app-action">Share</span>
    </div>
    <div className="pm-body">
      {/* Main result card */}
      <div className="pm-card">
        <div className="pm-result-label">Haemoglobin</div>
        <div className="pm-result-value">
          <span className="pm-val-big">10.2</span>
          <span className="pm-val-unit">g/dL</span>
        </div>
        <div className="pm-badge pm-badge-red">⚠ LOW</div>
        <div className="pm-bar-label">ICMR Indian range: 13–17 g/dL</div>
        <div className="pm-bar-track">
          <div className="pm-bar-fill pm-fill-red" />
        </div>
      </div>

      {/* Two mini cards */}
      <div className="pm-two-col">
        <div className="pm-card">
          <div className="pm-mini-label">WBC Count</div>
          <div className="pm-mini-val pm-mini-red">High</div>
        </div>
        <div className="pm-card">
          <div className="pm-mini-label">Platelets</div>
          <div className="pm-mini-val pm-mini-green">Normal</div>
        </div>
      </div>

      {/* Insight */}
      <div className="pm-insight-card">
        <span className="pm-insight-icon">🧠</span>
        <span>Low haemoglobin + high WBC suggests anaemia with mild infection. Consult in 48 hrs.</span>
      </div>

      <div className="pm-action-pill">View Full Report →</div>
    </div>
  </div>
);

/* ─── CENTER: AI Engine ─── */
const CenterScreen = () => {
  const fillRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let pct = 0;
    const id = setInterval(() => {
      pct = pct >= 100 ? 0 : pct + 1;
      if (fillRef.current)  fillRef.current.style.width = `${pct}%`;
      if (labelRef.current) labelRef.current.textContent = `${pct}%`;
    }, 60);
    return () => clearInterval(id);
  }, []);

  const steps = [
    { label: 'Extract values',    sub: 'PDF parsed · 11 markers', state: 'done'    },
    { label: 'ICMR lookup',       sub: 'Indian ranges applied',   state: 'done'    },
    { label: 'Cross-referencing', sub: 'Correlating 3 docs…',     state: 'active'  },
    { label: 'Generate insight',  sub: 'Queued',                  state: 'pending' },
  ] as const;

  return (
    <div className="pm-screen-content">
      <StatusBar />
      <div className="pm-app-chrome">
        <span className="pm-back-btn" />
        <span className="pm-app-title">DiagnoSphereX</span>
        <span className="pm-app-action" />
      </div>
      <div className="pm-body">
        {/* Engine status */}
        <div className="pm-card">
          <div className="pm-engine-row">
            <div className="pm-engine-dot" />
            <span className="pm-engine-title">AI Engine — Running</span>
          </div>
          <div className="pm-progress-header">
            <span>Analysis Progress</span>
            <span className="pm-progress-pct" ref={labelRef}>73%</span>
          </div>
          <div className="pm-progress-track">
            <div className="pm-progress-fill" ref={fillRef} style={{ width: '73%' }} />
          </div>
        </div>

        {/* Steps */}
        <div className="pm-card">
          {steps.map(s => (
            <div key={s.label} className={`pm-step pm-step-${s.state}`}>
              <div className={`pm-step-dot pm-step-dot-${s.state}`}>
                {s.state === 'done' ? '✓' : s.state === 'active' ? '●' : '○'}
              </div>
              <div className="pm-step-info">
                <div className="pm-step-name">{s.label}</div>
                <div className="pm-step-sub">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="pm-footer-row">
          <div className="pm-engine-dot" style={{ width: 6, height: 6 }} />
          <span>Processing in secure enclave</span>
        </div>
      </div>
    </div>
  );
};

/* ─── RIGHT: Family Vault ─── */
const RightScreen = () => {
  const members = [
    { initial: 'N', name: 'Nanna',  role: 'Father · 58', status: 'Stable',   statusClass: 'pm-ms-green', time: '2 days ago', av: 'pm-av-green' },
    { initial: 'A', name: 'Amma',   role: 'Mother · 53', status: 'Review',   statusClass: 'pm-ms-amber', time: '1 week ago', av: 'pm-av-amber' },
    { initial: 'Y', name: 'You',    role: 'Self · 28',   status: 'Attention',statusClass: 'pm-ms-red',   time: 'Today',      av: 'pm-av-red'   },
    { initial: '+', name: 'Spouse', role: 'Add member',  status: 'Tap to add',statusClass:'pm-ms-grey',  time: '',           av: 'pm-av-grey'  },
  ];

  return (
    <div className="pm-screen-content">
      <StatusBar />
      <div className="pm-app-chrome">
        <span className="pm-back-btn">‹ Home</span>
        <span className="pm-app-title">Family Vault</span>
        <span className="pm-app-action">+ Add</span>
      </div>
      <div className="pm-body">
        {/* Summary stats */}
        <div className="pm-stats-row">
          <div className="pm-stat-card">
            <span className="pm-stat-num">3</span>
            <span className="pm-stat-lbl">Members</span>
          </div>
          <div className="pm-stat-card alert-card">
            <span className="pm-stat-num">1</span>
            <span className="pm-stat-lbl">Alert</span>
          </div>
          <div className="pm-stat-card">
            <span className="pm-stat-num">8</span>
            <span className="pm-stat-lbl">Reports</span>
          </div>
        </div>

        {/* Member list */}
        <div className="pm-card pm-member-list">
          {members.map(m => (
            <div key={m.name} className="pm-member-row">
              <div className={`pm-avatar ${m.av}`}>{m.initial}</div>
              <div className="pm-member-info">
                <div className="pm-member-name">{m.name}</div>
                <div className="pm-member-role">{m.role}</div>
              </div>
              <div className="pm-member-right">
                <span className={`pm-member-status ${m.statusClass}`}>{m.status}</span>
                {m.time && <span className="pm-member-time">{m.time}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Phone Frame ─── */
const PhoneFrame = ({ children, size = 'normal' }: { children: React.ReactNode; size?: 'large' | 'small' | 'normal' }) => (
  <div className={`pm-frame pm-frame-${size}`}>
    <div className="pm-frame-inner">
      <div className="pm-side-btn pm-side-btn-vol1" />
      <div className="pm-side-btn pm-side-btn-vol2" />
      <div className="pm-side-btn pm-side-btn-power" />
      <div className="pm-screen">{children}</div>
      <div className="pm-home-indicator" />
    </div>
  </div>
);

/* ─── Main Export ─── */
const HeroPhoneMockups = () => (
  <div className="hpm-phones-row">
    <div className="hpm-phone-wrap hpm-left">
      <PhoneFrame size="small"><LeftScreen /></PhoneFrame>
    </div>
    <div className="hpm-phone-wrap hpm-center">
      <PhoneFrame size="large"><CenterScreen /></PhoneFrame>
    </div>
    <div className="hpm-phone-wrap hpm-right">
      <PhoneFrame size="small"><RightScreen /></PhoneFrame>
    </div>
  </div>
);

export default HeroPhoneMockups;
