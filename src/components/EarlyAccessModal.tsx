import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import EarlyAccessForm from './forms/EarlyAccessForm';
import '../styles/EarlyAccessModal.css';

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EarlyAccessModal = ({ isOpen, onClose }: EarlyAccessModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="modal-wrapper">
            <motion.div 
              className="early-access-modal glass-panel"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <button className="modal-close" onClick={onClose}>
                <X size={20} />
              </button>

              <EarlyAccessForm onSuccessClose={onClose} />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EarlyAccessModal;
