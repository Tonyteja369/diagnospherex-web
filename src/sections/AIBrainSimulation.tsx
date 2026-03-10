import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './AIBrainSimulation.css';

const HEALTH_WORDS = [
  'Neural', 'Synapse', 'Cortex', 'Hemoglobin', 'Diagnosis',
  'ECG', 'MRI', 'AI', 'Clinical', 'Pathology',
  'Cells', 'Genome', 'Cardio', 'Neuro', 'Immunity',
  'Protein', 'Enzyme', 'Plasma', 'Anemia', 'Insulin',
  'Antibody', 'Receptor', 'DNA', 'Biomarker', 'Cholesterol',
];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  word: string;
  fontSize: number;
  alpha: number;
  life: number;
  maxLife: number;
  hue: string;
}

const AIBrainSimulation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener('mousemove', onMouseMove);

    const NUM_PARTICLES = 90;
    const hues = ['98,54,255', '59,130,246', '34,211,238', '190,140,255', '255,255,255'];

    const mkParticle = (W: number, H: number): Particle => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      word: HEALTH_WORDS[Math.floor(Math.random() * HEALTH_WORDS.length)],
      fontSize: 10 + Math.random() * 18,
      alpha: 0,
      life: 0,
      maxLife: 200 + Math.random() * 300,
      hue: hues[Math.floor(Math.random() * hues.length)],
    });

    let particles: Particle[] = Array.from({ length: NUM_PARTICLES }, () =>
      mkParticle(canvas.width, canvas.height)
    );

    // Spawn them at random times
    particles.forEach(p => { p.life = Math.floor(Math.random() * p.maxLife); });

    // Node points for the brain mesh — dense cluster of points
    const NUM_NODES = 300;
    const nodes = Array.from({ length: NUM_NODES }, () => {
      // Cluster around center-ish
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random();
      const dist = r * r * 0.38; // more toward center
      return {
        bx: 0.5 + Math.cos(angle) * dist,
        by: 0.5 + Math.sin(angle) * dist * 0.75,
        phase: Math.random() * Math.PI * 2,
        speed: 0.003 + Math.random() * 0.01,
        wobble: Math.random() * 0.015,
        hue: hues[Math.floor(Math.random() * 3)],
        size: 1.5 + Math.random() * 3,
      };
    });

    const draw = () => {
      t += 1;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Background glow – central brain mass
      const cx = W * 0.5, cy = H * 0.5;
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.5);
      bg.addColorStop(0,   'rgba(98,54,255,0.18)');
      bg.addColorStop(0.4, 'rgba(59,130,246,0.10)');
      bg.addColorStop(0.7, 'rgba(34,211,238,0.05)');
      bg.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Pulsing glow ring
      const ringR = Math.min(W, H) * (0.30 + 0.02 * Math.sin(t * 0.04));
      const ring = ctx.createRadialGradient(cx, cy, ringR * 0.7, cx, cy, ringR);
      ring.addColorStop(0, 'rgba(98,54,255,0)');
      ring.addColorStop(0.9, 'rgba(98,54,255,0.15)');
      ring.addColorStop(1,  'rgba(98,54,255,0)');
      ctx.fillStyle = ring;
      ctx.beginPath();
      ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
      ctx.fill();

      // Draw nodes
      const actualNodes = nodes.map(n => {
        const x = n.bx * W + Math.sin(t * n.speed + n.phase) * n.wobble * W;
        const y = n.by * H + Math.cos(t * n.speed * 0.7 + n.phase) * n.wobble * H;
        return { x, y, hue: n.hue, size: n.size };
      });

      // Connections
      ctx.lineWidth = 0.6;
      for (let i = 0; i < actualNodes.length; i++) {
        for (let j = i + 1; j < actualNodes.length; j++) {
          const dx = actualNodes[i].x - actualNodes[j].x;
          const dy = actualNodes[i].y - actualNodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            const alpha = (1 - dist / 60) * 0.25;
            ctx.strokeStyle = `rgba(98,54,255,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(actualNodes[i].x, actualNodes[i].y);
            ctx.lineTo(actualNodes[j].x, actualNodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw node dots
      actualNodes.forEach(n => {
        // Mouse repel
        const mx = mouseRef.current.x, my = mouseRef.current.y;
        const mdx = n.x - mx, mdy = n.y - my;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        let rx = n.x, ry = n.y;
        if (md < 80 && md > 0) {
          rx += (mdx / md) * (80 - md) * 0.4;
          ry += (mdy / md) * (80 - md) * 0.4;
        }
        ctx.beginPath();
        ctx.arc(rx, ry, n.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.hue}, 0.85)`;
        ctx.fill();
      });

      // Word particles
      particles.forEach((p, i) => {
        p.life++;
        if (p.life >= p.maxLife) {
          particles[i] = mkParticle(W, H);
          return;
        }

        const fade = p.life / p.maxLife;
        p.alpha = fade < 0.1 ? fade * 10 : (fade > 0.85 ? (1 - fade) * 6.67 : 0.85);

        // Mouse repel for words
        const mx = mouseRef.current.x, my = mouseRef.current.y;
        const mdx = p.x - mx, mdy = p.y - my;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 100 && md > 0) {
          p.vx += (mdx / md) * 0.5;
          p.vy += (mdy / md) * 0.5;
        }

        // Slow friction
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        // Soft gravity toward glow center
        const cgx = p.x - cx, cgy = p.y - cy;
        const cd = Math.sqrt(cgx * cgx + cgy * cgy);
        if (cd > Math.min(W, H) * 0.35) {
          p.vx -= cgx / cd * 0.08;
          p.vy -= cgy / cd * 0.08;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.font = `${p.fontSize}px 'Outfit', sans-serif`;
        ctx.fillStyle = `rgba(${p.hue}, 1)`;
        ctx.shadowColor = `rgba(${p.hue}, 0.8)`;
        ctx.shadowBlur = 10;
        ctx.fillText(p.word, p.x, p.y);
        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section className="brain-section" id="technology">
      <div className="brain-content">
        <motion.div
          className="brain-text"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            Visual AI <span className="text-gradient">Neural Engine</span>
          </h2>
          <p className="brain-description">
            Watch thousands of neural signals and medical keywords process clinical reasoning in real-time.
            Move your cursor through the simulation to interact with the field.
          </p>
        </motion.div>

        <div className="brain-3d-container" style={{ position: 'relative' }}>
          <canvas ref={canvasRef} className="brain-canvas" />
          <div className="brain-glow" />
        </div>
      </div>
    </section>
  );
};

export default AIBrainSimulation;
