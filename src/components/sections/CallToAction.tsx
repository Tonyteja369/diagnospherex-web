import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import '../../styles/CallToAction.css';

interface CallToActionProps {
  onOpenModal?: () => void;
}

const CallToAction = ({ onOpenModal }: CallToActionProps) => {
  return (
    <section className="cta-section">
      <div className="container">
        <motion.div
          className="cta-card saas-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient soft glow background inside card */}
          <div className="cta-ambient-glow" aria-hidden="true" />

          <div className="cta-content">
            <span className="eyebrow-tag">
              <Sparkles size={13} />
              Early Access Initiative
            </span>

            <h2 className="cta-headline">
              Be Among the First 500 <span className="text-gradient">Indian Families</span>
            </h2>

            <p className="cta-subtitle">
              Join the priority access cohort. Experience zero-knowledge encrypted report analysis calibrated to ICMR standards — completely free for our early community.
            </p>

            <div className="cta-button-group">
              <button
                className="btn-primary cta-main-btn"
                onClick={onOpenModal}
              >
                Join the Waitlist — It’s Free
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="cta-guarantees">
              <div className="guarantee-item">
                <CheckCircle2 size={15} className="text-success" />
                <span>Zero spam, guaranteed</span>
              </div>
              <div className="guarantee-item">
                <CheckCircle2 size={15} className="text-success" />
                <span>AES-256 client-side privacy</span>
              </div>
              <div className="guarantee-item">
                <CheckCircle2 size={15} className="text-success" />
                <span>Early beta access in 12 weeks</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
