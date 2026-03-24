import { Search, Bell, Home, FileText, Pill, Activity, AlertTriangle, ShieldCheck, Camera, HardDrive, BellRing, BadgeCheck } from 'lucide-react';
import '../styles/MobileAppPreview.css';

/* ---- Screen 1: Medicine Details ---- */
const ScreenMedicine = () => {
  return (
    <div className="app-screen screen-medicine">
      {/* Header */}
      <div className="med-header">
        <div className="nav-left">
          <div className="app-logo-box">
            <div className="app-logo-dot" />
            <div className="app-logo-bg" />
          </div>
          <span className="nav-brand text-lg font-bold">DiagnoSphereX</span>
        </div>
        <Bell size={16} fill="#6236FF" className="text-purple drop-shadow-glow" />
      </div>

      {/* Search Bar */}
      <div className="med-search-bar">
        <Search size={14} className="text-secondary" />
        <span className="search-placeholder">Enter medicine name or brand</span>
      </div>

      {/* Main Medicine Card */}
      <div className="med-card main-med-card">
        <div className="med-title-row">
          <span className="med-name">Augmentin 625</span>
          <span className="med-badge rx">RX ONLY</span>
        </div>
        <div className="med-subtitle">Amoxycillin (500mg) + Clavulanic Acid (125mg)</div>
        
        <div className="med-info-grid">
          <div className="med-info-box">
            <span className="info-label">COMPOSITION</span>
            <span className="info-val">Penicillin Type</span>
          </div>
          <div className="med-info-box">
            <span className="info-label">DOSAGE</span>
            <span className="info-val">Twice Daily</span>
          </div>
          <div className="med-info-box">
            <span className="info-label">CATEGORY</span>
            <span className="info-val">Antibiotic</span>
          </div>
        </div>
      </div>

      {/* Safety Section */}
      <div className="section-title mt-2">SAFETY & INTERACTIONS</div>
      <div className="med-card safety-card">
        <div className="safety-icon-wrapper">
          <AlertTriangle size={16} className="text-warning" fill="#b45309" color="#fcd34d" />
        </div>
        <div className="safety-content">
          <span className="safety-title">Moderate Interaction</span>
          <p className="safety-desc">This medicine may interact with oral contraceptives and Methotrexate. Consult your doctor if you are on blood thinners.</p>
        </div>
      </div>

      {/* Savings Section */}
      <div className="section-title mt-2 flex justify-between">
        <span>SMART SAVINGS</span>
        <span className="gov-approved-text text-success flex items-center gap-1">
          <BadgeCheck size={10} fill="#10b981" color="#fff" /> GOVT APPROVED
        </span>
      </div>
      
      <div className="med-card savings-card">
        <div className="savings-header">
          <div className="savings-left">
            <span className="jan-aushadhi-label text-success">JAN AUSHADHI ALTERNATIVE</span>
            <span className="generic-name">Amoxy-Clav 625 Generic</span>
          </div>
          <div className="savings-right text-right">
            <span className="old-price strike text-secondary">₹120.00</span>
            <span className="new-price text-success">₹24.50</span>
          </div>
        </div>
        
        <div className="savings-banner bg-success-dim text-success">
          <span className="piggy text-success">💰</span> Save ₹95.50 (79% cheaper)
        </div>
        
        <button className="med-btn btn-success mt-2">FIND NEARBY STORES</button>
      </div>

      {/* Bottom nav */}
      <div className="bottom-nav">
        {[
          { icon: <Home size={16} />, label: 'Home' },
          { icon: <FileText size={16} />, label: 'Reports' },
          { icon: <Pill size={16} />, label: 'Medicine', active: true },
          { icon: <Activity size={16} />, label: 'History' },
        ].map(n => (
          <div key={n.label} className={`nav-item ${n.active ? 'active' : ''}`}>
            {n.icon}
            <span>{n.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---- Screen 2: Language Selection ---- */
const ScreenLanguage = () => {
  return (
    <div className="app-screen screen-onboard px-4 pb-4">
      <div className="onboard-content mt-10">
        <h1 className="onboard-title">Choose your<br/>language.</h1>
        <p className="onboard-subtitle">Tailoring your health journey to your preferred dialect for precision and comfort.</p>

        <div className="lang-options mt-6">
          <div className="lang-box active">
            <div className="lang-left">
              <span className="lang-text">తెలుగు</span>
              <span className="lang-sub">TELUGU</span>
            </div>
            <div className="lang-check checked"><BadgeCheck size={18} fill="#6236FF" color="#fff" strokeWidth={1}/></div>
          </div>
          
          <div className="lang-box">
            <div className="lang-left">
              <span className="lang-text" style={{fontFamily: 'sans-serif'}}>हिन्दी</span>
              <span className="lang-sub">HINDI</span>
            </div>
            <div className="lang-check empty" />
          </div>

          <div className="lang-box">
            <div className="lang-left">
              <span className="lang-text" style={{fontFamily: 'sans-serif'}}>தமிழ்</span>
              <span className="lang-sub">TAMIL</span>
            </div>
            <div className="lang-check empty" />
          </div>
        </div>

        <div className="text-center mt-4">
          <span className="link-text text-sm hover:underline cursor-pointer">See more languages</span>
        </div>
      </div>

      <div className="onboard-footer mt-auto pt-6">
        <div className="pagination flex justify-center gap-2 mb-4">
          <div className="page-dot"></div>
          <div className="page-dot active"></div>
          <div className="page-dot"></div>
          <div className="page-dot"></div>
        </div>
        <button className="onboard-btn btn-primary w-full">Continue</button>
        <p className="footer-note text-center mt-4 text-xs">You can always change your language preference later in settings.</p>
      </div>
    </div>
  );
};

/* ---- Screen 3: Permissions ---- */
const ScreenPermissions = () => {
  return (
    <div className="app-screen screen-onboard px-4 pb-4">
      <div className="onboard-content mt-6">
        <span className="step-tag text-xs font-bold tracking-widest text-secondary mb-2 block">STEP 3 OF 3</span>
        <h1 className="onboard-title leading-tight">A few permissions to<br/>get started.</h1>
        <p className="onboard-subtitle mt-2">DiagnoSphereX uses these to provide real-time health insights and personalized care tracking.</p>

        <div className="perm-list mt-6 space-y-3">
          <div className="perm-box bg-panel rounded-xl p-3 flex items-center gap-3">
            <Camera size={20} className="text-secondary flex-shrink-0" />
            <div className="perm-info flex-1">
              <span className="perm-title block text-sm font-semibold text-white">Camera</span>
              <span className="perm-desc block text-xs text-secondary leading-snug">For scanning prescriptions and lab results.</span>
            </div>
            <div className="perm-toggle on"><div className="toggle-thumb" /></div>
          </div>

          <div className="perm-box bg-panel rounded-xl p-3 flex items-center gap-3">
            <HardDrive size={20} className="text-secondary flex-shrink-0" />
            <div className="perm-info flex-1">
              <span className="perm-title block text-sm font-semibold text-white">Storage</span>
              <span className="perm-desc block text-xs text-secondary leading-snug">For saving reports and offline access.</span>
            </div>
            <div className="perm-toggle off"><div className="toggle-thumb" /></div>
          </div>

          <div className="perm-box bg-panel rounded-xl p-3 flex items-center gap-3">
            <BellRing size={20} className="text-secondary flex-shrink-0" />
            <div className="perm-info flex-1">
              <span className="perm-title block text-sm font-semibold text-white">Notifications</span>
              <span className="perm-desc block text-xs text-secondary leading-snug">For health reminders and AI alerts.</span>
            </div>
            <div className="perm-toggle on"><div className="toggle-thumb" /></div>
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <div className="secure-badge flex items-center gap-2 bg-black-dim px-3 py-1.5 rounded-full border border-panel">
            <ShieldCheck size={12} className="text-purple" />
            <span className="text-[10px] uppercase font-bold tracking-wider text-secondary">SECURE & ENCRYPTED</span>
          </div>
        </div>
      </div>

      <div className="onboard-footer mt-auto pt-6">
        <button className="onboard-btn btn-primary w-full shadow-purple-glow">Allow All and Continue</button>
        <div className="text-center mt-4">
          <span className="link-text text-sm cursor-pointer text-secondary hover:text-white transition-colors">Skip for now</span>
        </div>
      </div>
    </div>
  );
};

/* ---- Phone Frame Wrapper ---- */
const PhoneFrame = ({ children, tilt, className = "" }: { children: React.ReactNode; tilt?: string; className?: string }) => (
  <div className={`phone-frame ${className}`} style={{ transform: tilt }}>
    <div className="phone-notch" />
    <div className="phone-screen">{children}</div>
    <div className="phone-home-bar" />
  </div>
);

/* ---- Main Export ---- */
const MobileAppPreview = () => (
  <div className="mobile-preview-container three-phones">
    <div className="preview-bg-glow"></div>
    
    <PhoneFrame className="phone-side phone-left">
      <ScreenPermissions />
    </PhoneFrame>
    
    <PhoneFrame className="phone-center z-10 shadow-center">
      <ScreenMedicine />
    </PhoneFrame>
    
    <PhoneFrame className="phone-side phone-right">
      <ScreenLanguage />
    </PhoneFrame>
  </div>
);

export default MobileAppPreview;
