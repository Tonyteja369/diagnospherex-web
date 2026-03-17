import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, CheckCircle, RefreshCw, Activity, ArrowRight } from 'lucide-react';
import '../styles/DemoPage.css';

const DemoExperience = () => {
  const [processingState, setProcessingState] = useState<'idle' | 'uploading' | 'analyzing' | 'generating' | 'complete'>('idle');
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');

  const prompts = [
    "Analyze Blood Test Report",
    "Explain ECG Findings",
    "Interpret MRI Summary",
    "Understand Lab Results"
  ];

  const promptResults: Record<string, { summary: React.ReactNode, insight1: { title: string, content: string }, insight2: { title: string, content: string }, insight3: { title: string, content: string } }> = {
    "Analyze Blood Test Report": {
      summary: (
        <>
          <p><strong>Hemoglobin slightly below normal range.</strong></p>
          <p>Possible mild anemia detected.</p>
          <p className="mt-4"><strong>Suggested next step:</strong><br/>Iron profile test and nutritional review.</p>
          <p className="mt-4 text-cyan"><strong>Risk level: Low</strong></p>
        </>
      ),
      insight1: { title: "Key Findings", content: "Hgb: 10.9 g/dL\nMCV: 82 fL" },
      insight2: { title: "Condition Match", content: "Mild Iron-deficiency Anemia" },
      insight3: { title: "Intervention", content: "Dietary adjustments" }
    },
    "Explain ECG Findings": {
      summary: (
        <>
          <p><strong>Heart rhythm: Regular sinus rhythm.</strong></p>
          <p>Minor ST-segment variation observed.</p>
          <p className="mt-4"><strong>Clinical significance:</strong><br/>No immediate abnormality detected.</p>
          <p className="mt-4 text-cyan"><strong>Suggested follow-up: Routine monitoring recommended.</strong></p>
        </>
      ),
      insight1: { title: "Rhythm", content: "Regular Sinus, 72 bpm" },
      insight2: { title: "Abnormalities", content: "Minor ST variation" },
      insight3: { title: "Action Required", content: "None immediate" }
    },
    "Interpret MRI Summary": {
      summary: (
        <>
          <p><strong>No evidence of acute hemorrhage.</strong></p>
          <p>No structural abnormalities detected.</p>
          <p>Ventricular size within normal limits.</p>
          <p className="mt-4 text-cyan"><strong>Conclusion: Normal MRI findings.</strong></p>
        </>
      ),
      insight1: { title: "Hemorrhage", content: "Negative" },
      insight2: { title: "Structure", content: "Normal limits" },
      insight3: { title: "Ventricles", content: "Normal size" }
    },
    "Understand Lab Results": {
      summary: (
        <>
          <p><strong>Cholesterol slightly elevated.</strong></p>
          <p>LDL levels above recommended threshold.</p>
          <p className="mt-4"><strong>Suggested intervention:</strong><br/>Diet modification and follow-up lipid profile.</p>
          <p className="mt-4 text-purple"><strong>Risk indicator: Moderate.</strong></p>
        </>
      ),
      insight1: { title: "LDL Cholesterol", content: "Elevated" },
      insight2: { title: "HDL Cholesterol", content: "Normal" },
      insight3: { title: "Action Plan", content: "Diet modification" }
    }
  };

  const currentResult = promptResults[selectedPrompt] || promptResults["Analyze Blood Test Report"];

  const handlePromptClick = (prompt: string) => {
    setSelectedPrompt(prompt);
    setProcessingState('uploading');
  };

  useEffect(() => {
    if (processingState === 'uploading') {
      setTimeout(() => setProcessingState('analyzing'), 2000);
    } else if (processingState === 'analyzing') {
      setTimeout(() => setProcessingState('generating'), 2500);
    } else if (processingState === 'generating') {
      setTimeout(() => setProcessingState('complete'), 2000);
    }
  }, [processingState]);

  return (
    <section className="demo-section" id="demo">
      <div className="demo-container">
        
        <motion.div 
          className="demo-header text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="demo-title">Interact with <span className="text-gradient">DiagnoSphereX</span></h2>
          <p className="demo-subtitle">Try analyzing a sample medical report</p>
        </motion.div>

        {processingState === 'idle' && (
          <motion.div 
            className="demo-selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="search-bar glass-panel">
              <Search size={20} className="text-secondary mr-2" />
              <input type="text" placeholder="Try a sample medical report analysis..." readOnly />
            </div>

            <div className="suggestions-grid">
              {prompts.map((prompt, idx) => (
                <button 
                  key={idx} 
                  className="suggestion-btn glass-panel ripple-btn glow-effect elevation-3d"
                  onClick={() => handlePromptClick(prompt)}
                >
                  <FileText size={18} className="text-purple" />
                  <span>{prompt}</span>
                  <ArrowRight size={16} className="text-cyan ml-auto" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {processingState !== 'idle' && processingState !== 'complete' && (
          <motion.div 
            className="demo-processing glass-panel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="processing-steps">
              <div className={`processing-step ${processingState === 'uploading' ? 'active' : processingState === 'analyzing' || processingState === 'generating' ? 'done' : ''}`}>
                <div className="step-icon-wrapper">
                  {processingState === 'uploading' ? <RefreshCw className="rotating text-cyan" /> : <CheckCircle className="text-cyan" />}
                </div>
                <span>Uploading Medical Report</span>
              </div>
              
              <div className="step-connector">
                <div className={`connector-fill ${(processingState === 'analyzing' || processingState === 'generating') ? 'filled' : ''}`} />
              </div>

              <div className={`processing-step ${processingState === 'analyzing' ? 'active' : processingState === 'generating' ? 'done' : ''}`}>
                <div className="step-icon-wrapper">
                  {processingState === 'analyzing' ? <Activity className="rotating text-purple" /> : processingState === 'generating' ? <CheckCircle className="text-cyan" /> : <Activity className="text-secondary" />}
                </div>
                <span>Analyzing Clinical Data</span>
              </div>

              <div className="step-connector">
                <div className={`connector-fill ${processingState === 'generating' ? 'filled' : ''}`} />
              </div>

              <div className={`processing-step ${processingState === 'generating' ? 'active' : ''}`}>
                <div className="step-icon-wrapper">
                  {processingState === 'generating' ? <RefreshCw className="rotating text-cyan" /> : <FileText className="text-secondary" />}
                </div>
                <span>Generating Medical Explanation</span>
              </div>
            </div>

            <div className="global-scanning-bar">
              <div className="neural-particles-loader" />
              <motion.div 
                className="scanning-bar-fill"
                initial={{ width: '0%' }}
                animate={{ width: processingState === 'uploading' ? '33%' : processingState === 'analyzing' ? '66%' : '100%' }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}

        {processingState === 'complete' && (
          <motion.div 
            className="demo-result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="result-main glass-panel">
              <div className="result-header">
                <h3>Medical Report Summary</h3>
                <span className="badge normal">Analysis Complete</span>
              </div>
              
              <div className="result-content">
                <div className="report-summary-box text-start">
                  {currentResult.summary}
                </div>
              </div>
            </div>

            <div className="result-cards">
              <motion.div className="insight-card glass-panel elevation-3d" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h4>{currentResult.insight1.title}</h4>
                <p>{currentResult.insight1.content.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
              </motion.div>
              
              <motion.div className="insight-card glass-panel elevation-3d" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h4>{currentResult.insight2.title}</h4>
                <p>{currentResult.insight2.content}</p>
              </motion.div>
              
              <motion.div className="insight-card glass-panel elevation-3d" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <h4>{currentResult.insight3.title}</h4>
                <p>{currentResult.insight3.content}</p>
              </motion.div>
            </div>
            
            <div className="text-center mt-8">
              <button 
                className="btn-secondary ripple-btn glow-effect"
                onClick={() => setProcessingState('idle')}
              >
                Analyze Another Report
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DemoExperience;
