import { useEffect, useState, useRef, useCallback } from 'react';
import './AIHeroPanel.css';

const STATUS_MESSAGES = [
  'Initializing neural model...',
  'Scanning biological signals...',
  'Processing ECG waveform...',
  'Mapping patient biomarkers...',
  'Generating clinical insights...',
  'Analyzing vitals...',
  'Neural pathways active...',
];

// Anatomical node positions (% of SVG viewport)
const NODES = [
  { id: 'brain',    x: 50,  y: 9,   label: 'BRAIN',   value: 'Neural Active' },
  { id: 'heart',    x: 46,  y: 36,  label: 'HEART',   value: '72 BPM' },
  { id: 'lung-l',   x: 38,  y: 38,  label: 'LUNG L',  value: '98% SpO₂' },
  { id: 'lung-r',   x: 62,  y: 38,  label: 'LUNG R',  value: '98% SpO₂' },
  { id: 'abdomen',  x: 50,  y: 54,  label: 'LIVER',   value: 'Normal' },
  { id: 'arm-l',    x: 22,  y: 52,  label: 'ARM L',   value: '120/80' },
  { id: 'arm-r',    x: 78,  y: 52,  label: 'ARM R',   value: '120/80' },
  { id: 'leg-l',    x: 40,  y: 82,  label: 'FEMUR L', value: 'Stable' },
  { id: 'leg-r',    x: 60,  y: 82,  label: 'FEMUR R', value: 'Stable' },
];

interface Ripple { x: number; y: number; t: number; }
interface NNode  { x: number; y: number; vx: number; vy: number; }

const AIHeroPanel = () => {
  const [statusIdx,   setStatusIdx]   = useState(0);
  const [progress,    setProgress]    = useState(0);
  const [scanPct,     setScanPct]     = useState(0);
  const [activeNode,  setActiveNode]  = useState(-1);
  const [ripples,     setRipples]     = useState<Ripple[]>([]);

  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const ecgCanvasRef  = useRef<HTMLCanvasElement>(null);
  const panelRef      = useRef<HTMLDivElement>(null);
  const animRef       = useRef<number>();
  const ecgAnimRef    = useRef<number>();
  const frameRef      = useRef(0);

  /* ── Status text rotation ── */
  useEffect(() => {
    const t = setInterval(() => setStatusIdx(i => (i + 1) % STATUS_MESSAGES.length), 2200);
    return () => clearInterval(t);
  }, []);

  /* ── Progress bar ── */
  useEffect(() => {
    let p = 0;
    const t = setInterval(() => { p = (p + 0.4) % 101; setProgress(p); }, 50);
    return () => clearInterval(t);
  }, []);

  /* ── Scan line + node activation ── */
  useEffect(() => {
    let pct = 0;
    const t = setInterval(() => {
      pct = (pct + 0.25) % 100;
      setScanPct(pct);
      // Activate node when scan crosses it
      const hit = NODES.findIndex(n => Math.abs(n.y - pct) < 2.5);
      setActiveNode(hit);
    }, 20);
    return () => clearInterval(t);
  }, []);

  /* ── Ripple on click/mousemove (throttled) ── */
  const throttleRef = useRef(0);
  const handlePanelInteract = useCallback((e: React.MouseEvent) => {
    const now = Date.now();
    if (now - throttleRef.current < 400) return;
    throttleRef.current = now;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    setRipples(prev => [...prev.slice(-4), { x, y, t: now }]);
  }, []);

  /* ── Neural network canvas ── */
  useEffect(() => {
    const canvas = mainCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const NUM = 28;
    const nodes: NNode[] = Array.from({ length: NUM }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));

    // pulse pairs
    let pulseIdx = 0;
    let pulseT = 0;

    const draw = () => {
      frameRef.current++;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Move nodes
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 80) {
            const a = (1 - d / 80) * 0.18;
            ctx.strokeStyle = `rgba(47,211,255,${a})`;
            ctx.lineWidth   = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Pulse travel
      pulseT += 0.018;
      if (pulseT >= 1) { pulseT = 0; pulseIdx = Math.floor(Math.random() * nodes.length); }
      const pA = nodes[pulseIdx];
      const pB = nodes[(pulseIdx + 1) % nodes.length];
      const px = pA.x + (pB.x - pA.x) * pulseT;
      const py = pA.y + (pB.y - pA.y) * pulseT;
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(47,211,255,0.9)';
      ctx.shadowColor = '#2FD3FF';
      ctx.shadowBlur  = 8;
      ctx.fill();
      ctx.shadowBlur  = 0;

      // Node dots
      nodes.forEach((n, i) => {
        const pulse = 0.6 + 0.4 * Math.sin(frameRef.current * 0.04 + i);
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(98,54,255,${pulse})`;
        ctx.shadowColor = '#6236FF';
        ctx.shadowBlur  = 6;
        ctx.fill();
        ctx.shadowBlur  = 0;
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animRef.current!);
      window.removeEventListener('resize', resize);
    };
  }, []);

  /* ── ECG canvas ── */
  useEffect(() => {
    const canvas = ecgCanvasRef.current;
    if (!canvas) return;
    const ctx    = canvas.getContext('2d');
    if (!ctx) return;
    let t = 0;
    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      ctx.beginPath();
      ctx.strokeStyle = '#2FD3FF';
      ctx.lineWidth   = 1.6;
      ctx.shadowColor = '#2FD3FF';
      ctx.shadowBlur  = 7;
      for (let x = 0; x < W; x++) {
        const phase = (x / W) * Math.PI * 7 + t;
        const m     = x % (W / 5);
        let y = H / 2;
        if (m > W / 10 - 3 && m < W / 10)       y = H * 0.2;
        else if (m > W / 10 && m < W / 10 + 5)   y = H * 0.85;
        else if (m > W / 10 + 5 && m < W / 10 + 12) y = H * 0.35;
        else y = H / 2 + Math.sin(phase) * 3;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
      t += 0.07;
      ecgAnimRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(ecgAnimRef.current!);
  }, []);

  /* Auto-clean old ripples */
  useEffect(() => {
    const t = setInterval(() => {
      const now = Date.now();
      setRipples(prev => prev.filter(r => now - r.t < 1200));
    }, 400);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      ref={panelRef}
      className="ai-hero-panel"
      onMouseMove={handlePanelInteract}
      onClick={handlePanelInteract}
    >
      {/* Corner brackets */}
      <div className="corner corner-tl" /><div className="corner corner-tr" />
      <div className="corner corner-bl" /><div className="corner corner-br" />

      {/* Grid overlay */}
      <div className="panel-grid" />

      {/* Neural network canvas (background layer) */}
      <canvas ref={mainCanvasRef} className="neural-canvas" />

      {/* Ripple effects */}
      {ripples.map((r, i) => (
        <div
          key={i}
          className="ripple-ring"
          style={{ left: `${r.x}%`, top: `${r.y}%` }}
        />
      ))}

      {/* ── Header ── */}
      <div className="panel-header">
        <div className="panel-status-dot" />
        <span className="panel-title">AI MEDICAL DIAGNOSTIC ENGINE</span>
        <span className="panel-sys-status">System Status: <span className="status-active">ACTIVE</span></span>
      </div>

      {/* ── Body Area ── */}
      <div className="panel-body-area">

        {/* Scan line */}
        <div className="scan-line" style={{ top: `${scanPct}%` }} />

        {/* ── Anatomical SVG body ── */}
        <div className="body-svg-wrapper">
          <svg
            viewBox="0 0 100 230"
            xmlns="http://www.w3.org/2000/svg"
            className="body-svg"
          >
            <defs>
              <clipPath id="bodyClip">
                {/* Full anatomical body silhouette clip */}
                <path d="
                  M50,2 C57,2 63,7 63,16 C63,25 58,29 56,31
                  C65,33 75,38 79,47 C83,56 82,67 80,77
                  C78,87 75,97 74,107 C77,107 80,110 79,115
                  C78,120 74,121 72,119 C71,129 70,140 69,152
                  C68,163 67,174 67,185 C67,190 66,193 65,196
                  L60,196 C60,193 60,190 60,185
                  C60,174 60,162 59,150
                  C57,150 50,149 43,150
                  C42,162 40,174 40,185 C40,190 40,193 40,196
                  L35,196 C34,193 33,190 33,185
                  C33,174 32,163 31,152
                  C29,140 28,129 27,119
                  C25,121 22,120 21,115 C20,110 23,107 26,107
                  C25,97 22,87 20,77 C18,67 17,56 21,47
                  C25,38 35,33 44,31 C42,29 37,25 37,16
                  C37,7 43,2 50,2 Z
                " />
              </clipPath>
              <radialGradient id="bodyGlow" cx="50%" cy="40%" r="55%">
                <stop offset="0%"   stopColor="#2FD3FF" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#6236FF" stopOpacity="0.04" />
              </radialGradient>
              <filter id="cyanGlow">
                <feGaussianBlur stdDeviation="1.2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Body fill (holographic) */}
            <path
              d="M50,2 C57,2 63,7 63,16 C63,25 58,29 56,31 C65,33 75,38 79,47 C83,56 82,67 80,77 C78,87 75,97 74,107 C77,107 80,110 79,115 C78,120 74,121 72,119 C71,129 70,140 69,152 C68,163 67,174 67,185 C67,190 66,193 65,196 L60,196 C60,193 60,190 60,185 C60,174 60,162 59,150 C57,150 50,149 43,150 C42,162 40,174 40,185 C40,190 40,193 40,196 L35,196 C34,193 33,190 33,185 C33,174 32,163 31,152 C29,140 28,129 27,119 C25,121 22,120 21,115 C20,110 23,107 26,107 C25,97 22,87 20,77 C18,67 17,56 21,47 C25,38 35,33 44,31 C42,29 37,25 37,16 C37,7 43,2 50,2 Z"
              fill="url(#bodyGlow)"
              stroke="#2FD3FF"
              strokeWidth="1.4"
              filter="url(#cyanGlow)"
              opacity="0.92"
            />

            {/* Internal bio-grid (clipped inside body) */}
            <g clipPath="url(#bodyClip)">
              {/* Horizontal scan lines */}
              {Array.from({ length: 22 }, (_, i) => (
                <line key={i}
                  x1="0" y1={10 + i * 10} x2="100" y2={10 + i * 10}
                  stroke="rgba(47,211,255,0.12)" strokeWidth="0.5"
                />
              ))}
              {/* Vertical lines */}
              {Array.from({ length: 9 }, (_, i) => (
                <line key={i}
                  x1={10 + i * 10} y1="0" x2={10 + i * 10} y2="230"
                  stroke="rgba(47,211,255,0.07)" strokeWidth="0.4"
                />
              ))}
              {/* Spine line */}
              <line x1="50" y1="31" x2="50" y2="150"
                stroke="rgba(98,54,255,0.5)" strokeWidth="0.7"
                strokeDasharray="3,3" />
              {/* Heart outline */}
              <ellipse cx="44" cy="40" rx="6" ry="7"
                stroke="rgba(47,211,255,0.25)" strokeWidth="0.6" fill="none" />
              {/* Lung outlines */}
              <ellipse cx="38" cy="42" rx="5" ry="9"
                stroke="rgba(47,211,255,0.2)" strokeWidth="0.5" fill="none" />
              <ellipse cx="62" cy="42" rx="5" ry="9"
                stroke="rgba(47,211,255,0.2)" strokeWidth="0.5" fill="none" />
            </g>

            {/* Anatomical nodes */}
            {NODES.map((n, i) => (
              <g key={n.id}>
                <circle
                  cx={n.x} cy={n.y * 2.3}
                  r={activeNode === i ? 5 : 3.5}
                  fill={activeNode === i ? '#2FD3FF' : '#6236FF'}
                  opacity="0.9"
                  className="anat-node"
                >
                  <animate
                    attributeName="r"
                    values={activeNode === i ? "4;6;4" : "3;4;3"}
                    dur="2.5s" repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.9;0.5;0.9"
                    dur="2.5s" repeatCount="indefinite"
                  />
                </circle>
                {/* Ripple ring on active node */}
                {activeNode === i && (
                  <circle cx={n.x} cy={n.y * 2.3} r="9"
                    fill="none" stroke="#2FD3FF" strokeWidth="0.8" opacity="0.5">
                    <animate attributeName="r" values="5;13" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0" dur="1s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            ))}
          </svg>

          {/* Organ label overlays */}
          {NODES.filter((_, i) => [0, 1, 2, 5].includes(i)).map((n, idx) => (
            <div
              key={idx}
              className={`organ-label ${activeNode === NODES.indexOf(n) ? 'organ-label--active' : ''}`}
              style={{
                left: n.x > 50 ? `${n.x + 6}%` : 'auto',
                right: n.x <= 50 ? `${100 - n.x + 6}%` : 'auto',
                top: `${n.y}%`,
              }}
            >
              <div className="organ-name">[ {n.label} ]</div>
              <div className="organ-value">{n.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ECG Strip ── */}
      <div className="ecg-strip">
        <span className="ecg-label">ECG</span>
        <canvas ref={ecgCanvasRef} className="ecg-canvas" width={320} height={36} />
      </div>

      {/* ── Progress Footer ── */}
      <div className="panel-footer">
        <div className="progress-header">
          <span className="ai-status-text">{STATUS_MESSAGES[statusIdx]}</span>
          <span className="progress-pct">{Math.round(progress)}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }}>
            <div className="progress-glow" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIHeroPanel;
