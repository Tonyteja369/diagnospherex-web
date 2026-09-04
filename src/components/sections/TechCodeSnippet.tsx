import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Copy, Check, Terminal, Cpu } from 'lucide-react';
import '../../styles/TechCodeSnippet.css';

const SNIPPETS = {
  icmr: {
    filename: 'icmrValidator.ts',
    lang: 'typescript',
    code: `// Deterministic ICMR Indian Reference-Range Rule Engine
// Every diagnostic marker is validated prior to AI explanation

interface ClinicalMarker {
  code: 'HGB' | 'WBC' | 'PLT' | 'GLU_FASTING' | 'HBA1C';
  value: number;
  unit: string;
  demographics: { age: number; gender: 'male' | 'female'; region?: 'IN_SOUTH' };
}

export function evaluateICMRStandards(marker: ClinicalMarker): ValidationResult {
  const guideline = ICMR_REGISTRY[marker.code];
  const { min, max } = guideline.getInterval(marker.demographics);

  if (marker.value < min) {
    return {
      status: 'LOW',
      deviation: Math.round(((min - marker.value) / min) * 100),
      icmrCutoff: \`\${min} – \${max} \${marker.unit}\`,
      urgency: marker.value < min * 0.75 ? 'URGENT_48H' : 'ROUTINE_FOLLOWUP'
    };
  }

  return { status: 'NORMAL', icmrCutoff: \`\${min} – \${max} \${marker.unit}\` };
}`,
  },
  enclave: {
    filename: 'zeroKnowledgeEnclave.ts',
    lang: 'typescript',
    code: `// Client-Side Zero-Knowledge Encryption Pipeline
// Medical records encrypted with Argon2-derived keys before network ingress

export async function encryptHealthRecord(
  payload: LabReportPayload,
  userPassphrase: string
): Promise<EncryptedEnvelope> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const derivedKey = await deriveKey(userPassphrase, salt, { iterations: 100_000 });
  
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    derivedKey,
    new TextEncoder().encode(JSON.stringify(payload))
  );

  // Server receives zero decryption keys or plaintext telemetry
  return { ciphertext, salt, iv, version: 'AES-256-GCM' };
}`,
  },
};

const TechCodeSnippet = () => {
  const [activeTab, setActiveTab] = useState<'icmr' | 'enclave'>('icmr');
  const [copied, setCopied] = useState(false);

  const currentSnippet = SNIPPETS[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="tech-snippet-section" id="technology">
      <div className="container">

        {/* Section Header */}
        <div className="section-header text-center">
          <span className="eyebrow-tag">
            <Cpu size={13} />
            Deterministic Architecture
          </span>
          <h2 className="section-title">
            Engineering Depth: <span className="text-gradient">Zero-Hallucination Pipeline</span>
          </h2>
          <p className="section-desc">
            We separate clinical extraction from linguistic reasoning. Mathematical rules calibrate ICMR baselines; the AI explains context — zero fabricated parameters.
          </p>
        </div>

        {/* Code Block Window */}
        <motion.div
          className="code-window-container"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Window Header */}
          <div className="code-window-header">
            <div className="window-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>

            {/* Tab Switches */}
            <div className="code-tabs">
              <button
                className={`code-tab-btn ${activeTab === 'icmr' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('icmr')}
              >
                <Code2 size={14} className="mr-1.5 inline" />
                icmrValidator.ts
              </button>
              <button
                className={`code-tab-btn ${activeTab === 'enclave' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('enclave')}
              >
                <Terminal size={14} className="mr-1.5 inline" />
                zeroKnowledgeEnclave.ts
              </button>
            </div>

            {/* Copy Button */}
            <button 
              className="code-copy-btn" 
              onClick={handleCopy}
              aria-label="Copy code to clipboard"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-400 inline mr-1" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} className="inline mr-1" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Syntax Highlighted Code Area */}
          <div className="code-pre-wrapper">
            <pre className="code-pre">
              <code>{currentSnippet.code}</code>
            </pre>
          </div>

          {/* Bottom Callout Bar */}
          <div className="code-bottom-bar">
            <span className="tech-badge">TypeScript 5.6</span>
            <span className="tech-badge">WebCrypto AES-GCM</span>
            <span className="tech-badge">ICMR Clinical Registry v2.4</span>
            <span className="tech-note">100% Client-Side Deterministic Integrity</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TechCodeSnippet;
