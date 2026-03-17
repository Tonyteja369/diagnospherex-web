import { motion } from 'framer-motion';
import '../../styles/SecurityCareersAbout.css';

const CallToAction = () => {
  return (
    <section className="cta-section" style={{ padding: '80px 20px', textAlign: 'center' }}>
      <motion.div
        className="cta-content glass-panel"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 40px', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}
      >
        <div className="cta-glow" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(98,54,255,0.15) 0%, transparent 70%)', zIndex: 0 }} />
        <h2 className="cta-headline" style={{ fontSize: '2.5rem', marginBottom: '30px', position: 'relative', zIndex: 1 }}>Experience the Future of Medical Intelligence</h2>
        <button className="btn-primary ripple-btn glow-effect cta-btn" style={{ position: 'relative', zIndex: 1, padding: '15px 40px', fontSize: '1.2rem' }}>
          Join Early Access
        </button>
      </motion.div>
    </section>
  );
};

export default CallToAction;
