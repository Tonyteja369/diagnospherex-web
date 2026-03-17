import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, FileText, Brain, FlaskConical, AlertTriangle, CheckCircle, Info, Stethoscope, Microscope } from 'lucide-react';
import '../../styles/InteractiveReport.css';

const DEMOS = [
  {
    id: 0,
    tab: 'Blood Test',
    Icon: FlaskConical,
    title: 'Analyze Blood Test Report',
    input: {
      heading: 'Complete Blood Count (CBC)',
      rows: [
        { label: 'Hemoglobin',  value: '9.6 g/dL',      status: 'low' },
        { label: 'WBC',         value: '13,800 /µL',     status: 'high' },
        { label: 'Platelets',   value: '220,000 /µL',    status: 'normal' },
        { label: 'CRP',         value: '28 mg/L',        status: 'high' },
      ],
      note: 'Patient reports fatigue and mild fever for three days.',
    },
    explanation: {
      summary: 'Your blood test shows two important findings.',
      points: [
        { Icon: AlertTriangle, color: '#f59e0b', text: 'Hemoglobin is lower than normal. This protein carries oxygen in the blood — a low level may explain tiredness and weakness.' },
        { Icon: Activity, color: '#ef4444', text: 'White blood cell count and CRP are elevated. These markers typically rise when the body is fighting an infection or inflammation.' },
      ],
      meaning: 'The results may indicate a mild infection along with anemia.',
      next:    'A doctor may suggest further evaluation and possibly treatment for the infection.',
    },
  },
  {
    id: 1,
    tab: 'ECG',
    Icon: Activity,
    title: 'Explain ECG Findings',
    input: {
      heading: 'ECG Report Summary',
      rows: [
        { label: 'Heart Rate',   value: '108 bpm',           status: 'high' },
        { label: 'Rhythm',       value: 'Sinus Tachycardia', status: 'high' },
        { label: 'ST Segment',   value: 'Mild elevation L2/3', status: 'high' },
      ],
      note: 'Patient reports chest discomfort and palpitations.',
    },
    explanation: {
      summary: 'Your ECG shows the heart is beating faster than normal — called sinus tachycardia.',
      points: [
        { Icon: AlertTriangle, color: '#f59e0b', text: 'A faster heart rate can occur due to stress, fever, dehydration, or other conditions.' },
        { Icon: Activity, color: '#ef4444', text: 'A small ST elevation was detected. This can appear when the heart muscle is under extra stress.' },
      ],
      meaning: 'This ECG pattern suggests the heart may be working harder than usual.',
      next:    'A doctor may review symptoms and possibly perform additional tests to rule out heart-related issues.',
    },
  },
  {
    id: 2,
    tab: 'MRI',
    Icon: Brain,
    title: 'Interpret MRI Summary',
    input: {
      heading: 'MRI Brain Report',
      rows: [
        { label: 'Finding',       value: 'Hyperintense lesion, left frontal WM', status: 'high' },
        { label: 'Mass Effect',   value: 'None observed', status: 'normal' },
        { label: 'Hemorrhage',    value: 'No evidence', status: 'normal' },
        { label: 'Impression',    value: 'Nonspecific white matter change', status: 'neutral' },
      ],
      note: 'Radiology impression: Likely nonspecific white matter change.',
    },
    explanation: {
      summary: 'Your MRI shows a very small change in a specific area of the brain\'s white matter.',
      points: [
        { Icon: CheckCircle, color: '#10b981', text: 'There is NO evidence of bleeding or a brain tumor — this is an important reassuring finding.' },
        { Icon: Info, color: '#3b82f6', text: 'Small white matter changes can occur due to aging, migraines, or minor blood vessel changes and are often not concerning.' },
      ],
      meaning: 'The change is usually considered mild and often does not cause symptoms.',
      next:    'A doctor may correlate MRI findings with your symptoms before deciding if further evaluation is needed.',
    },
  },
  {
    id: 3,
    tab: 'Metabolic',
    Icon: Microscope,
    title: 'Understand Lab Results',
    input: {
      heading: 'Metabolic Panel & Urinalysis',
      rows: [
        { label: 'Blood Glucose', value: '152 mg/dL',     status: 'high' },
        { label: 'Creatinine',    value: '1.4 mg/dL',     status: 'high' },
        { label: 'Sodium',        value: '138 mmol/L',    status: 'normal' },
        { label: 'Potassium',     value: '4.2 mmol/L',    status: 'normal' },
        { label: 'Urine Protein', value: 'Trace',         status: 'neutral' },
        { label: 'Urine Glucose', value: 'Negative',      status: 'normal' },
      ],
      note: 'Urinalysis: Protein trace, Glucose negative.',
    },
    explanation: {
      summary: 'Your metabolic panel shows two values slightly outside the normal range.',
      points: [
        { Icon: Activity, color: '#ef4444', text: 'Blood glucose is higher than normal. Persistently elevated values may suggest problems with blood sugar regulation.' },
        { Icon: AlertTriangle, color: '#f59e0b', text: 'Creatinine is slightly elevated. This marker helps doctors understand how well the kidneys are functioning.' },
        { Icon: CheckCircle, color: '#10b981', text: 'Sodium and potassium levels are within normal range — electrolyte balance looks stable.' },
      ],
      meaning: 'Results may suggest early blood sugar imbalance and mild kidney stress.',
      next:    'A doctor may recommend monitoring blood sugar levels and repeating kidney function tests.',
    },
  },
];

const StatusPill = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    high:    'pill-high',
    low:     'pill-low',
    normal:  'pill-normal',
    neutral: 'pill-neutral',
  };
  const labels: Record<string, string> = { high: 'High', low: 'Low', normal: 'Normal', neutral: 'Note' };
  return <span className={`status-pill ${styles[status] ?? 'pill-neutral'}`}>{labels[status] ?? status}</span>;
};

const InteractiveReport = () => {
  const [active, setActive] = useState(0);
  const demo = DEMOS[active];

  return (
    <section className="interactive-report-section" id="demo">
      <div className="report-header">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Clinical Demo: <span className="text-gradient">Professional Analysis</span>
        </motion.h2>
        <p className="section-subtitle">
          Select a sample below to see how DiagnoSphereX provides clinical insights from complex medical data.
        </p>
      </div>

      {/* Tab selector */}
      <div className="demo-tabs">
        {DEMOS.map(d => (
          <button
            key={d.id}
            className={`demo-tab ${active === d.id ? 'demo-tab-active' : ''}`}
            onClick={() => setActive(d.id)}
          >
            <d.Icon className="tab-icon" size={16} style={{ marginRight: '8px' }} /> {d.tab}
          </button>
        ))}
      </div>

      {/* Split panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="split-panel"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
        >
          {/* LEFT — original report */}
          <div className="split-left glass-panel">
            <div className="panel-label">
              <FileText size={14} style={{ marginRight: '6px' }} /> Original Medical Report
            </div>
            <h3 className="split-heading">{demo.title}</h3>
            <p className="report-sub">{demo.input.heading}</p>
            <div className="report-rows">
              {demo.input.rows.map((r, i) => (
                <div key={i} className="report-row">
                  <span className="row-label">{r.label}</span>
                  <span className="row-value">{r.value}</span>
                  <StatusPill status={r.status} />
                </div>
              ))}
            </div>
            {demo.input.note && (
              <div className="clinical-note">
                <span className="note-label">Clinical Note</span>
                <p>{demo.input.note}</p>
              </div>
            )}
          </div>

          {/* RIGHT — AI explanation */}
          <div className="split-right glass-panel">
            <div className="panel-label ai-label">
              <Brain size={14} style={{ marginRight: '6px' }} /> DiagnoSphereX Insight
            </div>
            <div className="ai-confidence">Confidence Score: 92%<div className="conf-bar"><div className="conf-fill" /></div></div>
            <p className="ai-summary">{demo.explanation.summary}</p>
            <div className="ai-points">
              {demo.explanation.points.map((p, i) => (
                <div key={i} className="ai-point">
                  <span className="point-icon">
                    <p.Icon size={18} color={p.color} />
                  </span>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
            <div className="meaning-block">
              <p className="meaning-label">Clinical Interpretation</p>
              <p className="meaning-text">{demo.explanation.meaning}</p>
            </div>
            <div className="next-block">
              <p className="next-label">Clinical Recommendation</p>
              <p className="next-text">{demo.explanation.next}</p>
            </div>
            <p className="disclaimer">
              <Stethoscope size={12} style={{ marginRight: '6px', display: 'inline' }} />
              DiagnoSphereX provides clinical decision support insights only. This is not a diagnosis. Always consult a licensed physician.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default InteractiveReport;
