import { useRef, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Careers.css';

const ROLES = [
  {
    title: 'AI Research Intern',
    tags: ['Remote', 'Internship', 'Exploration Phase'],
    gradient: 'linear-gradient(135deg, #6236FF22, #2FD3FF22)',
    overview:
      'Help fine-tune LLaMA 3 on biomedical datasets and ICMR reference ranges. Build the zero-hallucination validation layer. This is real ML work on a real product.',
  },
  {
    title: 'Biomedical Engineering Intern',
    tags: ['Remote', 'Internship', 'Exploration Phase'],
    gradient: 'linear-gradient(135deg, #2FD3FF22, #6236FF22)',
    overview:
      'Help build and verify the ICMR Indian clinical reference range database. Your biomedical knowledge directly makes DiagnoSphereX more accurate for Indian patients.',
  },
  {
    title: 'Frontend Development Intern',
    tags: ['Remote', 'Internship', 'Exploration Phase'],
    gradient: 'linear-gradient(135deg, #6236FF22, #a855f722)',
    overview:
      'Build the React PWA interface. The upload screen, results display, Telugu output rendering, and family vault dashboard. Real product, real users in 12 weeks.',
  },
  {
    title: 'Product Research Intern',
    tags: ['Remote', 'Internship', 'Exploration Phase'],
    gradient: 'linear-gradient(135deg, #22d3ee22, #6236FF22)',
    overview:
      'Go to hospitals and clinics in Vijayawada. Talk to real patients. Understand how Telugu families actually use health reports. Your field research shapes the product directly.',
  },
];

/* ── Single card with all effects ── */
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

  /* Neural pulse every 5–8 second offset per card */
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
      {/* Cursor liquid reflection */}
      <div
        className="card-reflection"
        style={{
          background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(255,255,255,0.22), rgba(47,211,255,0.08) 40%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Neural pulse ring */}
      {pulsing && <div className="pulse-ring" />}

      {/* Top animated motion banner */}
      <div className={`card-top-banner card-banner-${(index % 4) + 1}`}>
        <div className="banner-orb banner-orb-1" />
        <div className="banner-orb banner-orb-2" />
        <div className="banner-orb banner-orb-3" />
        <div className="banner-grid-lines" />
        <div className="banner-ring" />
      </div>


      {/* Status badge */}
      <div className="status-badge">STATUS: OPEN</div>

      {/* Content */}
      <div className="card-content">
        <h3 className="role-title">{role.title}</h3>
        <div className="role-tags">
          {role.tags.map(t => (
            <span key={t} className="role-tag">{t}</span>
          ))}
        </div>

        {/* Always-visible overview */}
        <div className={`role-overview ${hovered ? 'visible' : ''}`}>
          <p className="overview-label">Role Overview</p>
          <p className="overview-text">{role.overview}</p>
        </div>
      </div>

      {/* Apply button */}
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
const Careers = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  /* Drag scroll */
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
        <div className="careers-header">
          <p className="careers-eyebrow">JOIN THE FOUNDING TEAM</p>
          <h2 className="section-title">
            Founding Internship Program — <span className="text-gradient">DiagnoSphereX</span>
          </h2>
          <p className="careers-desc">
            DiagnoSphereX is a solo-founded startup building health intelligence for Indian families.
            We are looking for passionate students who want to build something real, not just add an
            internship certificate to their resume.
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
    </section>
  );
};

export default Careers;
