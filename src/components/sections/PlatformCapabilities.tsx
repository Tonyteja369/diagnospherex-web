import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Brain, Activity, ShieldAlert } from 'lucide-react';
import '../../styles/PlatformCapabilities.css';

const PANELS = [
  {
    Icon: FileText,
    title: 'AI Medical Report Simplifier',
    desc: 'Transforms complex medical reports into clear explanations that are easier for clinicians and patients to understand.',
    accent: '#6236FF',
    accentB: '#2FD3FF',
    label: 'REPORT AI',
  },
  {
    Icon: Brain,
    title: 'Clinical Documentation Generator',
    desc: 'Automatically converts medical inputs and patient information into structured clinical documentation.',
    accent: '#2FD3FF',
    accentB: '#6236FF',
    label: 'DOC GEN',
  },
  {
    Icon: Activity,
    title: 'Symptom Intelligence Engine',
    desc: 'Analyzes symptoms and clinical indicators to support diagnostic reasoning and clinical decision-making.',
    accent: '#a855f7',
    accentB: '#2FD3FF',
    label: 'SYMPTOM AI',
  },
  {
    Icon: ShieldAlert,
    title: 'Drug Interaction Analyzer',
    desc: 'Evaluates medication combinations and flags possible interactions or contraindications in real time.',
    accent: '#2FD3FF',
    accentB: '#a855f7',
    label: 'DRUG CHECK',
  },
];

const PANEL_W = 360;
const GAP     = 60;
const STRIDE  = PANEL_W + GAP;

/* ─────────────── Single floating panel ─────────────── */
const ToolPanel = ({
  panel,
  offset,   // position relative to active (−2…+2)
  isActive,
}: {
  panel: (typeof PANELS)[number];
  offset: number;
  isActive: boolean;
}) => {
  const ref   = useRef<HTMLDivElement>(null);
  const [mx,  setMx]  = useState(50);
  const [my,  setMy]  = useState(50);
  const [lit, setLit] = useState(false);

  const absOff = Math.abs(offset);

  // 3-D depth values per offset
  const scale   = isActive ? 1   : absOff === 1 ? 0.88 : 0.80;
  const tz      = isActive ? 0   : absOff === 1 ? -80  : -120;
  const ry      = offset   > 0   ? -(10 * absOff) : (10 * absOff);
  const opacity = isActive ? 1   : absOff === 1 ? 0.62 : 0.36;
  const floatDelay = `${(Math.random() * 2).toFixed(1)}s`;

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setMx(((e.clientX - r.left) / r.width)  * 100);
    setMy(((e.clientY - r.top)  / r.height) * 100);
  }, []);

  return (
    <div
      ref={ref}
      className={`vp-panel ${isActive ? 'vp-active' : ''}`}
      style={{
        transform: `translateX(${offset * STRIDE}px) scale(${scale}) translateZ(${tz}px) rotateY(${ry}deg)`,
        opacity,
        transitionDuration: '350ms',
        animationDelay: floatDelay,
        '--accent': panel.accent,
      } as React.CSSProperties}
      onMouseMove={onMove}
      onMouseEnter={() => setLit(true)}
      onMouseLeave={() => setLit(false)}
    >
      {/* Holographic cursor reflection */}
      <div
        className="vp-sheen"
        style={{
          background: `radial-gradient(circle at ${mx}% ${my}%, rgba(255,255,255,0.22), rgba(47,211,255,0.06) 50%, transparent 70%)`,
          opacity: lit ? 0.18 : 0,
        }}
      />

      {/* Depth shadow under panel (VisionOS trick) */}
      <div className="vp-floor-shadow" />

      {/* Content */}
      <div className="vp-badge" style={{ borderColor: panel.accent + '55', color: panel.accent }}>
        {panel.label}
      </div>

      <div className="vp-icon-wrap" style={{ background: `linear-gradient(135deg, ${panel.accent}33, ${panel.accentB}22)` }}>
        <panel.Icon size={28} color={panel.accent} />
      </div>

      <h3 className="vp-title">{panel.title}</h3>
      <p  className="vp-desc">{panel.desc}</p>

      {/* Bottom gradient bar */}
      <div
        className="vp-bar"
        style={{ background: `linear-gradient(90deg, ${panel.accent}, ${panel.accentB})` }}
      />
    </div>
  );
};

/* ─────────────── Cursor energy field ─────────────── */
const EnergyField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: 0, y: 0 });
  const frameRef  = useRef(0);
  const rafRef    = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext('2d')!;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    canvas.addEventListener('mousemove', onMove);

    const draw = () => {
      frameRef.current++;
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);

      // Cursor glow energy
      const mx = mouseRef.current.x || W / 2;
      const my = mouseRef.current.y || H / 2;
      const grd = ctx.createRadialGradient(mx, my, 0, mx, my, 220);
      grd.addColorStop(0,   'rgba(98,54,255,0.12)');
      grd.addColorStop(0.5, 'rgba(47,211,255,0.05)');
      grd.addColorStop(1,   'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      // Flowing ring
      const r = 90 + 20 * Math.sin(frameRef.current * 0.025);
      ctx.beginPath();
      ctx.arc(mx, my, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(98,54,255,${0.06 + 0.04 * Math.sin(frameRef.current * 0.04)})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(rafRef.current!);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="vp-energy-canvas" />;
};

/* ─────────────── Main section ─────────────── */
const PlatformCapabilities = () => {
  const [active,  setActive]  = useState(0);
  const dragRef   = useRef({ dragging: false, startX: 0, distX: 0 });

  const goTo = useCallback((idx: number) => {
    setActive(Math.max(0, Math.min(PANELS.length - 1, idx)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { dragging: true, startX: e.clientX, distX: 0 };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.dragging) return;
    dragRef.current.distX = e.clientX - dragRef.current.startX;
  };

  const onPointerUp = () => {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    const d = dragRef.current.distX;
    if (d < -60) goTo(active + 1);
    else if (d > 60) goTo(active - 1);
  };

  return (
    <section className="capabilities-section" id="features">
      {/* Cursor energy field canvas */}
      <EnergyField />
      <div className="vp-grid-bg" />

      <div className="container">
        <div className="capabilities-header">
          <p className="vp-eyebrow">Platform Principles</p>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Security-First <span className="text-gradient">System Design</span>
          </motion.h2>
          <p className="vp-sub">
            DiagnoSphereX is being developed with privacy and security as foundational system principles.
          </p>
        </div>
      </div>

      <div
        className="vp-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div className="vp-track">
          {PANELS.map((p, i) => (
            <ToolPanel
              key={i}
              panel={p}
              offset={i - active}
              isActive={i === active}
            />
          ))}
        </div>
      </div>

      <div className="container">
        <div className="vp-dots">
          {PANELS.map((_, i) => (
            <button
              key={i}
              className={`vp-dot ${i === active ? 'vp-dot-active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to panel ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformCapabilities;
