import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import '../../styles/QuotesSection.css';

const QUOTES = [
  {
    quote:
      'The single hardest moment in healthcare is receiving a lab report you cannot read, alone on a Friday evening. We exist to ensure no Indian family ever feels that helplessness again.',
    author: 'K. Tharun',
    role: 'Founder & Biomedical Engineer',
    affiliation: 'DiagnoSphereX',
  },
  {
    quote:
      "Understanding your own biology should not require a medical degree. Explainable AI calibrated to Indian ICMR population standards is the missing link in preventative medicine.",
    author: 'Clinical Advisory Perspective',
    role: 'Biomedical Signal & Clinical Intelligence',
    affiliation: 'Vijayawada, AP',
  },
  {
    quote:
      'Correlating longitudinal family records in vernacular languages like Telugu directly bridges the generational divide in chronic disease and diabetic management.',
    author: 'Early Healthcare Innovator',
    role: 'Clinical Evaluation Cohort',
    affiliation: 'Andhra Pradesh',
  },
];

const QuotesSection = () => {
  return (
    <section className="quotes-section">
      <div className="container">
        
        <div className="quotes-grid">
          {QUOTES.map((item, idx) => (
            <motion.div
              key={idx}
              className="quote-item"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="quote-mark-wrap">
                <Quote size={28} className="quote-mark" />
              </div>
              <blockquote className="quote-text">
                “{item.quote}”
              </blockquote>
              <div className="quote-author-info">
                <span className="author-name">{item.author}</span>
                <span className="author-role">{item.role} · {item.affiliation}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default QuotesSection;
