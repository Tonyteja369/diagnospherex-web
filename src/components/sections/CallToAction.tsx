import { motion } from 'framer-motion';
import '../../styles/SecurityCareersAbout.css';

const CallToAction = () => {
  return (
    <section className="cta-section" style={{ padding: '60px 20px 40px', textAlign: 'center' }}>
      <motion.div
        className="cta-content glass-panel"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ maxWidth: '800px', margin: '0 auto', padding: '56px 40px 48px', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}
      >
        <div className="cta-glow" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(98,54,255,0.15) 0%, transparent 70%)', zIndex: 0 }} />
        <h2 className="cta-headline" style={{ fontSize: '2.4rem', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
          Be Among the First 500 <span style={{ background: 'linear-gradient(135deg, #6236FF, #2FD3FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Telugu Families</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', marginBottom: '32px', position: 'relative', zIndex: 1 }}>
          DiagnoSphereX — Free forever for the first 500 users on the waitlist.
        </p>
        <button className="btn-primary ripple-btn glow-effect cta-btn" style={{ position: 'relative', zIndex: 1, padding: '15px 40px', fontSize: '1.1rem' }}>
          Join the Waitlist — Free
        </button>
      </motion.div>
    </section>
  );
};

export default CallToAction;
