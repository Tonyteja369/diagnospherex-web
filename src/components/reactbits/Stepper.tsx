import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

export interface StepProps {
  children: React.ReactNode;
}

export const Step: React.FC<StepProps> = ({ children }) => {
  return <div className="stepper-step-content">{children}</div>;
};

export interface StepperProps {
  initialStep?: number;
  backButtonText?: string;
  nextButtonText?: string;
  activeColor?: string;
  children: React.ReactElement<StepProps>[];
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  initialStep = 1,
  backButtonText = 'Back',
  nextButtonText = 'Next',
  activeColor = '#8B5CF6',
  children,
  className = '',
}) => {
  const steps = React.Children.toArray(children) as React.ReactElement<StepProps>[];
  const [currentStep, setCurrentStep] = useState(
    Math.min(Math.max(0, initialStep - 1), steps.length - 1)
  );

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className={`react-bits-stepper ${className}`} style={{ width: '100%', maxWidth: '720px', margin: '0 auto' }}>
      {/* Step Header Pills */}
      <div
        className="stepper-header-track"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px',
          position: 'relative',
        }}
      >
        {/* Connecting progress line */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '10%',
            right: '10%',
            height: '2px',
            background: 'var(--border-subtle, #EAEAF2)',
            zIndex: 1,
          }}
        >
          <motion.div
            style={{
              height: '100%',
              background: activeColor,
            }}
            initial={{ width: '0%' }}
            animate={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {steps.map((_, idx) => {
          const isDone = idx < currentStep;
          const isActive = idx === currentStep;

          return (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: isActive ? `2px solid ${activeColor}` : isDone ? `2px solid ${activeColor}` : '2px solid var(--border-medium, #DCDCE8)',
                background: isActive ? activeColor : isDone ? activeColor : 'var(--bg-card, #FFFFFF)',
                color: isActive || isDone ? '#FFFFFF' : 'var(--text-secondary, #64748B)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: isActive ? `0 0 16px rgba(139, 92, 246, 0.4)` : 'none',
              }}
              aria-label={`Step ${idx + 1}`}
            >
              {isDone ? <Check size={18} /> : idx + 1}
            </button>
          );
        })}
      </div>

      {/* Animated Step Panel */}
      <div
        className="stepper-body-card"
        style={{
          background: 'var(--bg-card, #FFFFFF)',
          borderRadius: '16px',
          padding: '32px',
          border: '1px solid var(--border-subtle, #EAEAF2)',
          boxShadow: '0 8px 32px rgba(20, 20, 31, 0.04)',
          minHeight: '160px',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
          >
            {steps[currentStep]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stepper Navigation Controls */}
      <div
        className="stepper-controls"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '24px',
        }}
      >
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 20px',
            borderRadius: '10px',
            border: '1px solid var(--border-medium, #DCDCE8)',
            background: 'transparent',
            color: 'var(--text-primary, #0F172A)',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
            opacity: currentStep === 0 ? 0.4 : 1,
            transition: 'all 0.2s ease',
          }}
        >
          <ChevronLeft size={16} />
          {backButtonText}
        </button>

        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 20px',
            borderRadius: '10px',
            border: 'none',
            background: activeColor,
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: currentStep === steps.length - 1 ? 'not-allowed' : 'pointer',
            opacity: currentStep === steps.length - 1 ? 0.5 : 1,
            transition: 'all 0.2s ease',
          }}
        >
          {nextButtonText}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Stepper;
