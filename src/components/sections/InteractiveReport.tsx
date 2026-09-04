import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Brain, FlaskConical, AlertTriangle, CheckCircle, Info, Stethoscope, Users, Activity, Sparkles } from 'lucide-react';
import '../../styles/InteractiveReport.css';

const DEMOS = [
  {
    id: 0,
    tab: 'Blood Test',
    Icon: FlaskConical,
    title: 'Complete Blood Count (CBC)',
    badge: 'Routine Health Check',
    input: {
      heading: 'Haematology Lab Report · Vijayawada Diagnostics',
      rows: [
        { label: 'Haemoglobin',  value: '9.6 g/dL',      status: 'low',    ref: '12.0 – 16.0 g/dL' },
        { label: 'WBC Count',    value: '13,800 /µL',    status: 'high',   ref: '4,000 – 11,000 /µL' },
        { label: 'Platelets',    value: '220,000 /µL',   status: 'normal', ref: '150k – 450k /µL' },
        { label: 'CRP',          value: '28 mg/L',       status: 'high',   ref: '< 6.0 mg/L' },
      ],
      note: 'ICMR Reference Range applied. Patient reports persistent fatigue and low fever for 3 days.',
    },
    explanation: {
      summary: 'మీ రక్త పరీక్ష రెండు ముఖ్యమైన విషయాలను చూపిస్తుంది (Your blood test highlights two key clinical findings).',
      points: [
        { Icon: AlertTriangle, color: 'warning', text: 'Haemoglobin 9.6 g/dL తక్కువగా ఉంది (ICMR standard 12–16 g/dL). ఇది అలసట మరియు బలహీనతను వివరిస్తుంది.' },
        { Icon: Activity, color: 'danger', text: 'WBC (13,800) మరియు CRP (28 mg/L) పెరిగాయి. శరీరం ఇన్ఫెక్షన్‌తో పోరాడుతున్న సంకేతం.' },
        { Icon: CheckCircle, color: 'success', text: 'Platelets సాధారణ పరిధిలో ఉన్నాయి (No clotting risk detected).' },
      ],
      meaning: 'Mild microcytic anaemia coupled with an acute inflammatory response.',
      next: '48 గంటలలోపు మీ వైద్యుడిని సంప్రదించండి. Iron profile మరియు antibiotic సమీక్ష అవసరం కావచ్చు.',
    },
  },
  {
    id: 1,
    tab: 'Pre-Surgery',
    Icon: Activity,
    title: 'Pre-Operative Fitness Panel',
    badge: 'Surgical Clearance',
    input: {
      heading: 'Pre-Operative Assessment · Hyderabad Clinical Lab',
      rows: [
        { label: 'Fasting Glucose', value: '118 mg/dL',  status: 'high',   ref: '70 – 100 mg/dL' },
        { label: 'HbA1c',           value: '6.1%',        status: 'high',   ref: '< 5.7%' },
        { label: 'Creatinine',      value: '1.0 mg/dL',   status: 'normal', ref: '0.7 – 1.2 mg/dL' },
        { label: 'PT / INR',        value: '1.1',         status: 'normal', ref: '0.8 – 1.2' },
        { label: 'Haemoglobin',     value: '11.8 g/dL',   status: 'low',    ref: '12.0 – 16.0 g/dL' },
      ],
      note: 'Elective laparoscopic cholecystectomy scheduled in 5 days. ICMR surgical clearance checklist.',
    },
    explanation: {
      summary: 'Your pre-surgery panel is overall viable with two parameters for anaesthesia management.',
      points: [
        { Icon: AlertTriangle, color: 'warning', text: 'Fasting glucose is borderline elevated (118 mg/dL). Surgery teams routinely manage glycemic control.' },
        { Icon: Info, color: 'info', text: 'Haemoglobin at 11.8 g/dL is mildly low. Pre-op iron supplementation may be discussed.' },
        { Icon: CheckCircle, color: 'success', text: 'Renal function (Creatinine 1.0) and blood coagulation (INR 1.1) are completely optimal.' },
      ],
      meaning: 'Fit for scheduled procedure with perioperative glycemic monitoring recommended.',
      next: 'Share these results with your surgeon and anaesthetist at your pre-op consultation.',
    },
  },
  {
    id: 2,
    tab: 'Multi-Report',
    Icon: Brain,
    title: 'Cross-Document Longitudinal Analysis',
    badge: 'Multi-Document AI',
    input: {
      heading: 'Simultaneous Ingestion: 2 Reports (Biochemistry + Endocrinology)',
      rows: [
        { label: 'Vitamin D (Doc 1)',  value: '14 ng/mL',    status: 'low',    ref: '20 – 50 ng/mL' },
        { label: 'Serum Calcium',      value: '8.1 mg/dL',   status: 'low',    ref: '8.5 – 10.5 mg/dL' },
        { label: 'Thyroid TSH (Doc 2)',value: '5.8 mIU/L',   status: 'high',   ref: '0.4 – 4.2 mIU/L' },
        { label: 'Total Cholesterol',  value: '228 mg/dL',   status: 'high',   ref: '< 200 mg/dL' },
        { label: 'Serum Ferritin',     value: '8 ng/mL',     status: 'low',    ref: '15 – 150 ng/mL' },
      ],
      note: 'Cross-Reference Engine correlated records across different diagnostic laboratories.',
    },
    explanation: {
      summary: 'Correlating both documents simultaneously uncovers an interconnected deficiency pattern.',
      points: [
        { Icon: AlertTriangle, color: 'warning', text: 'Vitamin D deficiency (14 ng/mL) is suppressing Calcium absorption — direct metabolic link.' },
        { Icon: AlertTriangle, color: 'warning', text: 'Depleted iron stores (Ferritin 8 ng/mL) coupled with elevated TSH indicates thyroid stress.' },
        { Icon: Activity, color: 'danger', text: 'Cholesterol at 228 mg/dL exceeds ICMR guidance, warranting lipid review.' },
      ],
      meaning: 'Synergistic endocrine and micronutrient deficiency identified across independent tests.',
      next: 'Request combined Vitamin D + Iron therapeutics and an endocrine ultrasound within 2 weeks.',
    },
  },
  {
    id: 3,
    tab: 'Family Vault',
    Icon: Users,
    title: "Mother's Chronic Health Timeline",
    badge: 'AES-256 Vault',
    input: {
      heading: 'Encrypted Vault Record · Patient Age 53',
      rows: [
        { label: 'Post-Prandial Glucose', value: '198 mg/dL', status: 'high',   ref: '< 140 mg/dL' },
        { label: 'HbA1c',                 value: '7.4%',      status: 'high',   ref: '< 6.5%' },
        { label: 'Serum Creatinine',       value: '1.3 mg/dL', status: 'high',   ref: '0.6 – 1.1 mg/dL' },
        { label: 'Urine Microalbumin',    value: '42 mg/g',   status: 'high',   ref: '< 30 mg/g' },
        { label: 'Serum Sodium',          value: '139 mmol/L',status: 'normal', ref: '135 – 145 mmol/L' },
      ],
      note: 'Decrypted locally with user-derived key. Calibrated to Indian diabetic epidemiological ranges.',
    },
    explanation: {
      summary: 'అమ్మ రక్త పరీక్ష మధుమేహం మరియు కిడ్నీ పర్యవేక్షణ అవసరాన్ని సూచిస్తుంది.',
      points: [
        { Icon: Activity, color: 'danger', text: 'PP Glucose 198 మరియు HbA1c 7.4% — ICMR మార్గదర్శకాల ప్రకారం గ్లూకోజ్ నియంత్రణ తప్పింది.' },
        { Icon: AlertTriangle, color: 'warning', text: 'Creatinine (1.3) మరియు Microalbumin (42) ప్రారంభ డయాబెటిక్ నెఫ్రోపతిని సూచిస్తున్నాయి.' },
        { Icon: CheckCircle, color: 'success', text: 'ఎలక్ట్రోలైట్ స్థాయిలు (Sodium 139) సాధారణంగా ఉన్నాయి.' },
      ],
      meaning: 'Uncontrolled diabetes with early renal stress markers identified.',
      next: '48 గంటల్లో నెఫ్రాలజిస్ట్‌ని సంప్రదించండి. మధుమేహ మందుల మోతాదు సమీక్షించండి.',
    },
  },
];

const CHECKLIST_STEPS = [
  { label: 'Extract values', sub: 'OCR & PDF parser active', done: true },
  { label: 'ICMR lookup', sub: 'Indian reference calibrated', done: true },
  { label: 'Cross-referencing', sub: 'Connecting historical records', done: true },
  { label: 'Generate insight', sub: 'Clinical reasoning explained', done: true },
];

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { label: string; className: string }> = {
    high: { label: 'High', className: 'badge-high' },
    low: { label: 'Low', className: 'badge-low' },
    normal: { label: 'Normal', className: 'badge-normal' },
  };
  const item = map[status] || { label: status, className: 'badge-normal' };
  return <span className={`param-status ${item.className}`}>{item.label}</span>;
};

const InteractiveReport = () => {
  const [active, setActive] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const demo = DEMOS[active];

  // Auto-cycle live checklist every 1.6s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % CHECKLIST_STEPS.length);
    }, 1600);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="demo-section" id="demo">
      <div className="container">

        {/* Section Header */}
        <div className="section-header text-center">
          <span className="eyebrow-tag">
            <Sparkles size={13} />
            Live Interactive Demo
          </span>
          <h2 className="section-title">
            Explainable AI in Action: <span className="text-gradient">Indian Clinical Context</span>
          </h2>
          <p className="section-desc">
            Select a clinical sample below to see how DiagnoSphereX interprets real medical values using ICMR Indian standards — in plain English and Telugu.
          </p>
        </div>

        {/* Live Processing Pipeline Bar */}
        <div className="demo-pipeline-bar">
          <div className="pipeline-title">
            <span className="live-dot" />
            <span>AI Reasoning Engine</span>
          </div>
          <div className="pipeline-steps">
            {CHECKLIST_STEPS.map((step, idx) => {
              const isPast = idx < currentStep;
              const isCurrent = idx === currentStep;
              return (
                <div 
                  key={step.label} 
                  className={`pipeline-step ${isPast ? 'is-done' : isCurrent ? 'is-active' : 'is-pending'}`}
                >
                  <div className="step-circle">
                    {isPast ? '✓' : isCurrent ? '●' : idx + 1}
                  </div>
                  <div className="step-text">
                    <span className="step-name">{step.label}</span>
                    <span className="step-sub">{step.sub}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Horizontally Scrollable Tab Chips (Mobile-First) */}
        <div className="demo-tabs-container">
          <div className="demo-tabs-track" role="tablist">
            {DEMOS.map((d) => {
              const isSelected = active === d.id;
              return (
                <button
                  key={d.id}
                  role="tab"
                  aria-selected={isSelected}
                  className={`demo-tab-chip ${isSelected ? 'active-chip' : ''}`}
                  onClick={() => setActive(d.id)}
                >
                  <d.Icon size={16} className="chip-icon" />
                  <span>{d.tab}</span>
                  {isSelected && (
                    <motion.div 
                      className="chip-indicator" 
                      layoutId="activeChipIndicator"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Panel Layout (Stacks vertically on Mobile!) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="demo-two-panel"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
          >
            {/* Panel 1: Original Report */}
            <div className="demo-panel panel-original saas-card">
              <div className="panel-top-bar">
                <div className="panel-badge-group">
                  <FileText size={15} className="text-muted" />
                  <span className="panel-kind">Source Medical Report</span>
                </div>
                <span className="panel-context-badge">{demo.badge}</span>
              </div>

              <div className="panel-body">
                <h3 className="panel-main-title">{demo.title}</h3>
                <p className="panel-origin-text">{demo.input.heading}</p>

                <div className="report-table-wrapper">
                  <table className="report-table">
                    <thead>
                      <tr>
                        <th>Parameter</th>
                        <th>Observed</th>
                        <th>ICMR Standard</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {demo.input.rows.map((row, idx) => (
                        <tr key={idx}>
                          <td className="font-semibold">{row.label}</td>
                          <td className="observed-val">{row.value}</td>
                          <td className="ref-range">{row.ref}</td>
                          <td><StatusBadge status={row.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="clinical-meta-box">
                  <span className="meta-label">Clinical Context & ICMR Standard:</span>
                  <p className="meta-text">{demo.input.note}</p>
                </div>
              </div>
            </div>

            {/* Panel 2: AI Clinical Insight */}
            <div className="demo-panel panel-insight saas-card">
              <div className="panel-top-bar">
                <div className="panel-badge-group">
                  <Brain size={15} style={{ color: 'var(--accent-purple)' }} />
                  <span className="panel-kind text-purple font-semibold">DiagnoSphereX Clinical Insight</span>
                </div>
                {/* Animated Confidence Bar */}
                <div className="confidence-pill">
                  <span>Confidence: <strong>92%</strong></span>
                  <div className="conf-bar-track">
                    <motion.div 
                      className="conf-bar-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: '92%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              </div>

              <div className="panel-body">
                <div className="ai-summary-card">
                  <p className="summary-quote">“{demo.explanation.summary}”</p>
                </div>

                <div className="ai-findings-list">
                  {demo.explanation.points.map((p, idx) => {
                    const colorClass = p.color === 'danger' ? 'icon-danger' : p.color === 'warning' ? 'icon-warning' : p.color === 'info' ? 'icon-info' : 'icon-success';
                    return (
                      <div key={idx} className="finding-item">
                        <div className={`finding-icon-wrap ${colorClass}`}>
                          <p.Icon size={16} />
                        </div>
                        <p className="finding-text">{p.text}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="action-plan-box">
                  <div className="ap-header">
                    <Stethoscope size={16} className="text-purple" />
                    <h4>Recommended 48-Hour Action Plan</h4>
                  </div>
                  <p className="ap-content">{demo.explanation.next}</p>
                </div>

                <div className="demo-disclaimer">
                  <span>* Calibrated to ICMR population baselines. AI reasoning for patient empowerment — not a replacement for clinical consultation.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default InteractiveReport;
