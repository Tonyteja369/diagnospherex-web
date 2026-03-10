import { useRef, useState, useCallback, useEffect } from 'react';
import './Careers.css';

const ROLES = [
  {
    title: 'AI Research Intern',
    tags: ['Remote', 'Internship', '3–6 months'],
    gradient: 'linear-gradient(135deg, #6236FF22, #2FD3FF22)',
    overview:
      'Assist in developing AI models for clinical report interpretation and medical signal analysis.',
  },
  {
    title: 'Biomedical Engineering Intern',
    tags: ['Remote', 'Internship', '3–6 months'],
    gradient: 'linear-gradient(135deg, #2FD3FF22, #6236FF22)',
    overview:
      'Work on biosignal processing, physiological data pipelines, and clinical AI integration.',
  },
  {
    title: 'Frontend Developer Intern',
    tags: ['Remote', 'Internship', '3–6 months'],
    gradient: 'linear-gradient(135deg, #6236FF22, #a855f722)',
    overview:
      'Build premium, animation-rich React interfaces for the DiagnoSphereX AI platform.',
  },
  {
    title: 'Product Coordinator',
    tags: ['Remote', 'Part-time', '3–6 months'],
    gradient: 'linear-gradient(135deg, #22d3ee22, #6236FF22)',
    overview:
      'Coordinate product development cycles, user research, and roadmap planning for healthcare AI.',
  },
  {
    title: 'Technical Coordinator',
    tags: ['Remote', 'Part-time', '3–6 months'],
    gradient: 'linear-gradient(135deg, #6236FF22, #0ea5e922)',
    overview:
      'Manage technical documentation, sprint delivery, and cross-team AI feature coordination.',
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
      // Apply 3D tilt + magnetic shift via CSS vars
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
      <div className={`card-top-banner card-banner-${(index % 5) + 1}`}>
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

        {/* Expanded overview on hover */}
        <div className={`role-overview ${hovered ? 'visible' : ''}`}>
          <p className="overview-label">Role Overview</p>
          <p className="overview-text">{role.overview}</p>
        </div>
      </div>

      {/* Apply button */}
      <div className="card-footer">
        <button className="apply-btn">Apply Now</button>
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
      {/* Background particles canvas handled by AnimatedBackground globally */}

      <div className="container">
        <div className="careers-header">
          <p className="careers-eyebrow">We Are Hiring</p>
          <h2 className="section-title">
            Join the Future of <span className="text-gradient">Medical AI</span>
          </h2>
          <p className="careers-desc">
            DiagnoSphereX is expanding its research and development team.
            We are looking for curious minds passionate about building intelligent
            healthcare technologies that improve clinical decision-making and patient understanding.
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
