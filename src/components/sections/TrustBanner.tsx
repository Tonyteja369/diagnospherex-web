import { ShieldCheck, Users, Lightbulb } from 'lucide-react';

const TrustBanner = () => {
  return (
    <section className="container" style={{ padding: '80px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2 style={{ fontSize: '2rem', fontFamily: 'Outfit, sans-serif', fontWeight: 600, marginBottom: '16px' }}>
          About <span className="text-gradient">DiagnoSphere X</span>
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
          DiagnoSphere X is an early-stage AI healthcare platform focused on simplifying complex medical information for students, doctors, and general users.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        <div className="glass-panel" style={{ padding: '32px', borderRadius: '16px', textAlign: 'center' }}>
          <div style={{ background: 'rgba(98, 54, 255, 0.1)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Lightbulb size={32} color="#22D3EE" />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontFamily: 'Outfit, sans-serif' }}>Why we are building this</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
            Medical reports shouldn't require a constant translator. We're bridging the gap between raw data and understandable insights to empower faster, safer clinical intelligence and patient confidence.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '32px', borderRadius: '16px', textAlign: 'center' }}>
          <div style={{ background: 'rgba(98, 54, 255, 0.1)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Users size={32} color="#3B82F6" />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontFamily: 'Outfit, sans-serif' }}>Who it is for</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
            Designed meticulously for medical students learning diagnostics, doctors requiring instant second opinions, and everyday patients wanting clarity on their laboratory results.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '32px', borderRadius: '16px', textAlign: 'center' }}>
          <div style={{ background: 'rgba(98, 54, 255, 0.1)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <ShieldCheck size={32} color="#10B981" />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontFamily: 'Outfit, sans-serif' }}>Our Commitment</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
            We place data privacy, security, and clinical ethics as our absolute floor. Your health metrics are processed entirely anonymously with zero retention models in our exploration phase.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
