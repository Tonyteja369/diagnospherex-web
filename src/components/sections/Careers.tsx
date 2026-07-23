import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Cpu, 
  Code, 
  Dna, 
  Terminal, 
  Microscope, 
  LayoutDashboard, 
  BrainCircuit, 
  CheckCircle2, 
  Sparkles,
  GraduationCap
} from 'lucide-react';
import '../../styles/Careers.css';

const ROLES = [
  {
    title: 'AI Research Intern',
    tags: ['Remote', 'Internship', 'Research'],
    gradient: 'linear-gradient(135deg, #6236FF22, #2FD3FF22)',
    overview:
      'Help fine-tune biomedical foundation models and clinical datasets. Build zero-hallucination validation layers for explainable AI reasoning.',
  },
  {
    title: 'Biomedical Engineering Intern',
    tags: ['Remote', 'Internship', 'Signal Intelligence'],
    gradient: 'linear-gradient(135deg, #2FD3FF22, #6236FF22)',
    overview:
      'Analyze ECG/EEG signal processing pipelines and reference datasets. Your biomedical engineering expertise directly shapes explainable signal intelligence.',
  },
  {
    title: 'Frontend Development Intern',
    tags: ['Remote', 'Internship', 'Web Architecture'],
    gradient: 'linear-gradient(135deg, #6236FF22, #a855f722)',
    overview:
      'Build performant, glassmorphic React interfaces, visualization canvases, and high-frequency real-time signal monitoring dashboards.',
  },
  {
    title: 'Agentic AI Intern',
    tags: ['Remote', 'Internship', 'AI Agents'],
    gradient: 'linear-gradient(135deg, #22d3ee22, #6236FF22)',
    overview:
      'Research multi-agent orchestration for clinical decision support, autonomous research workflows, and multimodal data verification.',
  },
];

const INTERNSHIP_ROLES = [
  { title: 'AI/ML Intern', icon: Cpu },
  { title: 'Full Stack Developer Intern', icon: Code },
  { title: 'Biomedical Engineering Intern', icon: Dna },
  { title: 'Python Developer Intern', icon: Terminal },
  { title: 'Research Intern', icon: Microscope },
  { title: 'UI/UX Design Intern', icon: LayoutDashboard },
  { title: 'Agentic AI Intern', icon: BrainCircuit },
];

const RESEARCH_DISCIPLINES = [
  'AI Research',
  'Biomedical Engineering',
  'Neuroscience',
  'Machine Learning',
  'Healthcare AI',
  'Signal Processing',
  'Computational Medicine',
];

const BENEFITS = [
  'Research Experience',
  'Startup Experience',
  'AI Development',
  'Biomedical Innovation',
  'Flexible Remote Collaboration',
  'Performance-Based Recommendation Letter',
  'Internship Certificate',
  'Opportunity to contribute to research publications and open-source projects where applicable',
];

/* ── Single card ── */
const RoleCard = ({
  role,
  index,
  activeIdx,
  setActiveIdx,
}: {
  role: (typeof ROLES)[number];
  index: number;
  activeIdx: number | null;
  setActiveIdx: (i: number | null) => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const rafRef = useRef<number>();
  const navigate = useNavigate();

  useEffect(() => {
    const delay = 3000 + index * 1200;
    const interval = 5000 + index * 700;
    const t = setTimeout(() => {
      const pulse = setInterval(() => {
        setPulsing(true);
        setTimeout(() => setPulsing(false), 1400);
      }, interval);
      return () => clearInterval(pulse);
    }, delay);
    return () => clearTimeout(t);
  }, [index]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current!.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMouse({ x, y });
      const rotX = ((y - 50) / 50) * -6;
      const rotY = ((x - 50) / 50) * 6;
      const shiftX = ((x - 50) / 50) * 8;
      const shiftY = ((y - 50) / 50) * 8;
      cardRef.current!.style.setProperty('--rot-x', `${rotX}deg`);
      cardRef.current!.style.setProperty('--rot-y', `${rotY}deg`);
      cardRef.current!.style.setProperty('--shift-x', `${shiftX}px`);
      cardRef.current!.style.setProperty('--shift-y', `${shiftY}px`);
      cardRef.current!.style.setProperty('--mouse-x', `${x}%`);
      cardRef.current!.style.setProperty('--mouse-y', `${y}%`);
    });
  }, []);

  const handleMouseEnter = () => {
    setHovered(true);
    setActiveIdx(index);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setActiveIdx(null);
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--rot-x', '0deg');
    cardRef.current.style.setProperty('--rot-y', '0deg');
    cardRef.current.style.setProperty('--shift-x', '0px');
    cardRef.current.style.setProperty('--shift-y', '0px');
  };

  const isNeighbour =
    activeIdx !== null && activeIdx !== index && Math.abs(activeIdx - index) === 1;

  return (
    <div
      ref={cardRef}
      className={`role-card ${hovered ? 'hovered' : ''} ${pulsing ? 'pulsing' : ''} ${isNeighbour ? 'neighbour-glow' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="card-reflection"
        style={{
          background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(255,255,255,0.22), rgba(47,211,255,0.08) 40%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {pulsing && <div className="pulse-ring" />}

      <div className={`card-top-banner card-banner-${(index % 4) + 1}`}>
        <div className="banner-orb banner-orb-1" />
        <div className="banner-orb banner-orb-2" />
        <div className="banner-orb banner-orb-3" />
        <div className="banner-grid-lines" />
        <div className="banner-ring" />
      </div>

      <div className="status-badge">STATUS: OPEN</div>

      <div className="card-content">
        <h3 className="role-title">{role.title}</h3>
        <div className="role-tags">
          {role.tags.map(t => (
            <span key={t} className="role-tag">{t}</span>
          ))}
        </div>

        <div className={`role-overview ${hovered ? 'visible' : ''}`}>
          <p className="overview-label">Role Overview</p>
          <p className="overview-text">{role.overview}</p>
        </div>
      </div>

      <div className="card-footer">
        <button
          className="apply-btn"
          onClick={() => navigate('/careers/apply')}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

/* ── Main Section ── */
const Careers: React.FC = () => {
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ dragging: false, startX: 0, scrollLeft: 0 });

  const onDragStart = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    dragRef.current = {
      dragging: true,
      startX: e.pageX - trackRef.current.offsetLeft,
      scrollLeft: trackRef.current.scrollLeft,
    };
    trackRef.current.style.cursor = 'grabbing';
  };

  const onDragMove = (e: React.MouseEvent) => {
    if (!dragRef.current.dragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - dragRef.current.startX) * 1.4;
    trackRef.current.scrollLeft = dragRef.current.scrollLeft - walk;
  };

  const onDragEnd = () => {
    dragRef.current.dragging = false;
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };

  return (
    <section className="careers-section" id="careers">
      <div className="container">
        <div className="careers-header text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-semibold uppercase mb-3">
            <GraduationCap size={14} />
            <span>Join the Research Team</span>
          </div>
          <h2 className="section-title">
            Research & Engineering <span className="text-gradient">Internship Program</span>
          </h2>
          <p className="careers-desc">
            Help build the next generation of biomedical intelligence. Work alongside DiagnoSphereX on AI, neuroscience, biomedical engineering, healthcare technology, and computational medicine.
          </p>
        </div>
      </div>

      {/* Cards track */}
      <div className="careers-track-wrapper">
        <div
          ref={trackRef}
          className="careers-track"
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
        >
          {ROLES.map((role, i) => (
            <RoleCard
              key={i}
              role={role}
              index={i}
              activeIdx={activeIdx}
              setActiveIdx={setActiveIdx}
            />
          ))}
        </div>
        <div className="track-fade-left" />
        <div className="track-fade-right" />
      </div>

      <p className="drag-hint">← drag to explore →</p>

      {/* ── Internship Program Details ── */}
      <div className="internship-program container mt-12">
        <div className="ip-header">
          <h3 className="section-title ip-title">
            Available <span className="text-gradient">Research Roles</span>
          </h3>
          <div className="disciplines-pills flex flex-wrap justify-center gap-2 mt-4 max-w-2xl mx-auto">
            {RESEARCH_DISCIPLINES.map((d, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-dim">
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Available Roles Grid with Lucide Icons */}
        <div className="ip-roles-grid mt-6">
          {INTERNSHIP_ROLES.map((role, i) => {
            const Icon = role.icon;
            return (
              <div key={i} className="ip-role-chip glass-panel">
                <div className="ip-role-icon-box text-cyan">
                  <Icon size={20} />
                </div>
                <span className="ip-role-title">{role.title}</span>
                <span className="ip-role-badge">Open</span>
              </div>
            );
          })}
        </div>

        {/* Benefits */}
        <div className="ip-benefits mt-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles size={16} className="text-purple" />
            <h4 className="ip-benefits-title m-0">Program Benefits & Exposure</h4>
          </div>
          <div className="ip-benefits-grid">
            {BENEFITS.map((b, i) => (
              <div key={i} className="ip-benefit-item">
                <CheckCircle2 size={16} className="text-cyan flex-shrink-0 mt-0.5" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          className="btn-primary ripple-btn glow-effect ip-apply-btn mt-8"
          onClick={() => navigate('/careers/apply')}
        >
          Apply for Internship
        </button>
      </div>
    </section>
  );
};

export default Careers;
