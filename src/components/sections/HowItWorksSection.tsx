import { motion } from 'framer-motion';
import { Upload, Cpu, Award } from 'lucide-react';
import '../../styles/HowItWorksSection.css';

const FLOW_NODES = [
  {
    Icon: Upload,
    title: 'Fluid Ingestion',
    desc: 'You feed the system clinical PDF reports. The data instantly melts into structured numerical arrays.',
    color: '#0A84FF'
  },
  {
    Icon: Cpu,
    title: 'Clinical Cross-Reference',
    desc: 'The stream blends with ICMR Indian demographic models inside a hardware-secured enclave.',
    color: '#30D158'
  },
  {
    Icon: Award,
    title: 'Etched Insights',
    desc: 'The output settles into simple plain language action plans, engraved directly onto your feed.',
    color: '#0A84FF'
  }
];

const HowItWorksSection = () => {
  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container">
        <div className="how-header">
          <p className="how-eyebrow">Engine Workflow</p>
          <h2 className="section-title">Continuous <span className="text-gradient">Liquid Pour</span></h2>
          <p className="how-sub">
            The process is not a set of disjointed boxes. It is one continuous flow—data enters, correlates, and settles into understanding.
          </p>
        </div>

        <div className="how-flow-container">
          {/* Vertical morphing liquid stream line */}
          <div className="flow-vertical-stream">
            <motion.div 
              className="flow-stream-liquid-fill"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
          </div>

          <div className="flow-nodes-list">
            {FLOW_NODES.map((n, i) => {
              const Icon = n.Icon;

              return (
                <div key={i} className="flow-node-item">
                  <div className="flow-node-marker-wrap">
                    <div 
                      className="flow-node-marker-glow"
                      style={{
                        background: `radial-gradient(circle, ${n.color}22 0%, transparent 70%)`
                      }}
                    />
                    <div className="flow-node-marker">
                      <Icon size={18} color={n.color} />
                    </div>
                  </div>

                  <div className="flow-node-info">
                    <h3 className="flow-node-title">{n.title}</h3>
                    <p className="flow-node-desc">{n.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
