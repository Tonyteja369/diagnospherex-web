import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cursor from '../components/Cursor';
import LiquidGlassFilter from '../components/LiquidGlassFilter';
import Grainient from '../components/reactbits/Grainient';
import SmoothScroll from '../components/SmoothScroll';
import { useLiquidGlassTracking } from '../hooks/useLiquidGlassTracking';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  // Activate dynamic specular highlight tracking on all .liquid-glass surfaces
  useLiquidGlassTracking();

  return (
    <SmoothScroll>
      {/* Hidden SVG filter for true Liquid Glass refractive distortion */}
      <LiquidGlassFilter />

      {/* Global Background: Continuous WebGL Grainient fixed layer across entire site */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          opacity: 0.95,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <Grainient
          color1="#EDE9FE"
          color2="#DBEAFE"
          color3="#F5F3FF"
          timeSpeed={0.15}
          colorBalance={0.1}
          warpStrength={0.4}
          warpFrequency={4}
          warpSpeed={0.3}
          warpAmplitude={20}
          blendAngle={135}
          blendSoftness={0.4}
          rotationAmount={40}
          noiseScale={0}
          grainAmount={0.02}
          grainScale={0.3}
          grainAnimated={false}
          contrast={1.05}
          gamma={1.0}
          saturation={0.85}
          zoom={1.1}
        />
      </div>

      <div className="app-layout-root" style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        {/* Lagged follower liquid cursor */}
        <Cursor />

        {/* Persistent App-Level Floating Glass Navigation */}
        <Navbar />

        {/* Page Content */}
        <main style={{ position: 'relative', zIndex: 2 }}>
          {children}
        </main>

        {/* Persistent Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default AppLayout;
