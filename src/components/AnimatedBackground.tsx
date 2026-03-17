import { useEffect, useRef } from 'react';
import '../styles/AnimatedBackground.css';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Heavy nebula orbs – violet, electric blue, black-white glow
    const orbs = [
      { x: 0.15, y: 0.2,  rx: 450, ry: 320, spx: 0.00018,  spy: 0.00010,  color: '98, 54, 255',    opacity: 0.22 }, // violet
      { x: 0.80, y: 0.75, rx: 500, ry: 380, spx: -0.00015, spy: -0.00008, color: '59, 130, 246',   opacity: 0.18 }, // electric blue
      { x: 0.50, y: 0.50, rx: 600, ry: 450, spx: 0.00008,  spy: 0.00012,  color: '150, 100, 255',  opacity: 0.12 }, // violet-blue blend
      { x: 0.85, y: 0.15, rx: 360, ry: 260, spx: -0.00020, spy: 0.00015,  color: '34, 211, 238',   opacity: 0.10 }, // cyan acct
      { x: 0.10, y: 0.85, rx: 420, ry: 320, spx: 0.00012,  spy: -0.00018, color: '200, 180, 255',  opacity: 0.08 }, // white-violet
      { x: 0.60, y: 0.30, rx: 300, ry: 220, spx: -0.00010, spy: 0.00020,  color: '255, 255, 255',  opacity: 0.04 }, // bright white mist
    ].map(o => ({ ...o, px: o.x, py: o.y, angle: 0 }));

    // Fine particles
    const NUM_P = 180;
    const pArr = Array.from({ length: NUM_P }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0002,
      vy: (-Math.random() * 0.0005 - 0.0001),
      sz: Math.random() * 2.2 + 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      col: Math.random() > 0.5 ? '98,54,255' : '59,130,246',
    }));

    const draw = () => {
      time += 0.003;
      const W = canvas.width, H = canvas.height;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0A0A0F';
      ctx.fillRect(0, 0, W, H);

      // Pulsing vignette from center
      const vig = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.7);
      vig.addColorStop(0,   'rgba(14, 6, 40, 0)');
      vig.addColorStop(0.6, 'rgba(10, 10, 15, 0)');
      vig.addColorStop(1,   'rgba(10, 10, 15, 0.9)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      // Draw nebula orbs
      orbs.forEach(o => {
        o.angle += o.spx;
        o.px += o.spy * Math.sin(time + o.py * 3);
        o.py += o.spx * Math.cos(time + o.px * 3);
        // clamp
        o.px = Math.max(0, Math.min(1, o.px));
        o.py = Math.max(0, Math.min(1, o.py));

        const dx = o.px * W, dy = o.py * H;
        // Inner core glow
        const g = ctx.createRadialGradient(dx, dy, 0, dx, dy, o.rx * (0.9 + 0.1 * Math.sin(time)));
        g.addColorStop(0,   `rgba(${o.color}, ${o.opacity * 1.6})`);
        g.addColorStop(0.3, `rgba(${o.color}, ${o.opacity})`);
        g.addColorStop(1,   `rgba(${o.color}, 0)`);
        ctx.fillStyle = g;
        ctx.save();
        ctx.translate(dx, dy);
        ctx.scale(1, o.ry / o.rx);
        ctx.beginPath();
        ctx.arc(0, 0, o.rx, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Subtle grid
      ctx.strokeStyle = 'rgba(98, 54, 255, 0.04)';
      ctx.lineWidth = 1;
      const gs = 90;
      for (let x = 0; x < W; x += gs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += gs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      // Scan band
      const sy = (Math.sin(time * 0.35) * 0.5 + 0.5) * H;
      const sg = ctx.createLinearGradient(0, sy - 80, 0, sy + 80);
      sg.addColorStop(0,   'rgba(98,54,255,0)');
      sg.addColorStop(0.5, 'rgba(150,100,255,0.07)');
      sg.addColorStop(1,   'rgba(98,54,255,0)');
      ctx.fillStyle = sg;
      ctx.fillRect(0, sy - 80, W, 160);

      // Particles
      pArr.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -0.01) { p.y = 1.01; p.x = Math.random(); }
        if (p.x < 0 || p.x > 1) { p.vx *= -1; }
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.col},${p.alpha * (0.7 + 0.3 * Math.sin(time*2 + p.x * 10))})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="animated-bg-canvas" />;
};

export default AnimatedBackground;
