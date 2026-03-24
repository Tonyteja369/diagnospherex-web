import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, FileText, Brain, FlaskConical, AlertTriangle, CheckCircle, Info, Stethoscope, Users } from 'lucide-react';
import '../../styles/InteractiveReport.css';

const DEMOS = [
  {
    id: 0,
    tab: 'Blood Test',
    Icon: FlaskConical,
    title: 'Analyze Blood Test in Telugu',
    input: {
      heading: 'Complete Blood Count (CBC)',
      rows: [
        { label: 'Haemoglobin',  value: '9.6 g/dL',      status: 'low' },
        { label: 'WBC',         value: '13,800 /µL',     status: 'high' },
        { label: 'Platelets',   value: '220,000 /µL',    status: 'normal' },
        { label: 'CRP',         value: '28 mg/L',        status: 'high' },
      ],
      note: 'ICMR Reference Range applied. Patient reports fatigue and mild fever for three days.',
    },
    explanation: {
      summary: 'మీ రక్త పరీక్ష రెండు ముఖ్యమైన విషయాలను చూపిస్తుంది.',
      points: [
        { Icon: AlertTriangle, color: '#f59e0b', text: 'Haemoglobin తక్కువగా ఉంది — ICMR Indian range 12–16 g/dL. ఇది అలసట మరియు బలహీనతను వివరిస్తుంది.' },
        { Icon: Activity, color: '#ef4444', text: 'White blood cell count మరియు CRP పెరిగాయి. ఇవి శరీరం ఇన్ఫెక్షన్‌తో పోరాడుతున్నట్టు చూపిస్తాయి.' },
      ],
      meaning: 'ఫలితాలు రక్తహీనత మరియు తేలికపాటి ఇన్ఫెక్షన్‌ను సూచిస్తున్నాయి.',
      next:    'మీ డాక్టర్‌ను 48 గంటలలోపు కలవండి. Iron మరియు antibiotic చికిత్స అవసరం కావచ్చు.',
    },
  },
  {
    id: 1,
    tab: 'Pre-Surgery',
    Icon: Activity,
    title: 'ICMR Reference Ranges Check',
    input: {
      heading: 'Pre-Operative Blood Panel',
      rows: [
        { label: 'Blood Glucose (Fasting)', value: '118 mg/dL',  status: 'high' },
        { label: 'HbA1c',                  value: '6.1%',        status: 'high' },
        { label: 'Creatinine',             value: '1.1 mg/dL',   status: 'normal' },
        { label: 'PT/INR',                 value: '1.2',         status: 'normal' },
        { label: 'Haemoglobin',            value: '11.8 g/dL',   status: 'low' },
      ],
      note: 'ICMR Indian reference ranges applied. Pre-surgery fitness evaluation.',
    },
    explanation: {
      summary: 'Your pre-surgery panel shows two items your surgeon should know about.',
      points: [
        { Icon: AlertTriangle, color: '#f59e0b', text: 'Fasting glucose is borderline high by ICMR standards. Surgery teams routinely manage blood sugar levels — inform your anaesthetist.' },
        { Icon: Info, color: '#3b82f6', text: 'Haemoglobin is slightly low. Your surgeon may discuss pre-op iron supplementation to reduce transfusion risk.' },
        { Icon: CheckCircle, color: '#10b981', text: 'Creatinine and PT/INR are within ICMR normal range — kidney function and clotting look stable.' },
      ],
      meaning: 'Fit for surgery with the glucose and haemoglobin noted for your care team.',
      next:    'Share these results with your surgeon and anaesthetist before your procedure date.',
    },
  },
  {
    id: 2,
    tab: 'Multi-Report',
    Icon: Brain,
    title: 'Upload Family Member Report',
    input: {
      heading: 'Cross-Document Analysis — 2 Reports',
      rows: [
        { label: 'Vitamin D (Report 1)',  value: '14 ng/mL',       status: 'low' },
        { label: 'Calcium (Report 1)',    value: '8.1 mg/dL',      status: 'low' },
        { label: 'Thyroid TSH (Rep 2)',   value: '5.8 mIU/L',      status: 'high' },
        { label: 'Cholesterol (Rep 2)',   value: '228 mg/dL',      status: 'high' },
        { label: 'Ferritin (Rep 1)',      value: '8 ng/mL',        status: 'low' },
      ],
      note: 'DiagnoSphereX Cross-Reference AI reading two reports simultaneously.',
    },
    explanation: {
      summary: 'Reading both reports together reveals a connected pattern.',
      points: [
        { Icon: AlertTriangle, color: '#f59e0b', text: 'Vitamin D deficiency (ICMR cutoff: 20 ng/mL) is suppressing Calcium absorption — these two values are directly linked.' },
        { Icon: AlertTriangle, color: '#f59e0b', text: 'Low Ferritin combined with high TSH is a known pattern — thyroid function often suffers when iron stores are depleted.' },
        { Icon: Activity, color: '#ef4444', text: 'Cholesterol at 228 mg/dL exceeds ICMR Indian guidance. Combined with thyroid stress, this warrants immediate cardiologist review.' },
      ],
      meaning: 'Three inter-connected deficiencies identified across two reports.',
      next:    'Ask your doctor about Vitamin D + Iron supplementation together, and a thyroid ultrasound within 2 weeks.',
    },
  },
  {
    id: 3,
    tab: 'Family Vault',
    Icon: Users,
    title: 'Understand Lab Results in Telugu',
    input: {
      heading: 'Family Vault — Mother\'s Diabetes Panel',
      rows: [
        { label: 'Blood Glucose (PP)',  value: '198 mg/dL',    status: 'high' },
        { label: 'HbA1c',              value: '7.4%',          status: 'high' },
        { label: 'Creatinine',         value: '1.3 mg/dL',     status: 'high' },
        { label: 'Urine Microalbumin', value: '42 mg/g',       status: 'high' },
        { label: 'Sodium',             value: '139 mmol/L',    status: 'normal' },
      ],
      note: 'Family Vault: Encrypted per-member record. ICMR Indian diabetic reference ranges applied.',
    },
    explanation: {
      summary: 'అమ్మ రక్త పరీక్ష నాలుగు విషయాలను వెల్లడిస్తుంది.',
      points: [
        { Icon: AlertTriangle, color: '#ef4444', text: 'Post-prandial glucose 198 మరియు HbA1c 7.4% — ICMR ప్రకారం మధుమేహం నియంత్రణలో లేదు.' },
        { Icon: AlertTriangle, color: '#f59e0b', text: 'Creatinine మరియు Microalbumin — ఇవి కలిసి కిడ్నీ ప్రారంభ సంకేతాలు చూపిస్తున్నాయి.' },
        { Icon: CheckCircle, color: '#10b981', text: 'Sodium సాధారణంగా ఉంది — ఎలక్ట్రోలైట్ బ్యాలెన్స్ స్థిరంగా ఉంది.' },
      ],
      meaning: 'మధుమేహం మేనేజ్‌మెంట్ మారాలి మరియు కిడ్నీ పర్యవేక్షణ అవసరం.',
      next:    '48 గంటలలో నెఫ్రాలజిస్ట్‌ను కలవండి. Metformin మోతాదు సమీక్ష అడగండి.',
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
      <div className="container">
        <div className="report-header">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Clinical Demo: <span className="text-gradient">Telugu Report Analysis</span>
        </motion.h2>
        <p className="section-subtitle">
          Select a sample below to see how DiagnoSphereX explains real Indian blood test values using ICMR reference ranges — in plain English and Telugu.
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
              <p className="next-label">Your 48-Hour Action Plan</p>
              <p className="next-text">{demo.explanation.next}</p>
            </div>
            <p className="disclaimer">
              <Stethoscope size={12} style={{ marginRight: '6px', display: 'inline' }} />
              DiagnoSphereX provides ICMR-calibrated insights only. Always consult a licensed physician.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractiveReport;
