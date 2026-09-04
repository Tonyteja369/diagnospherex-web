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
          color1="#FF9FFC"
          color2="#5227FF"
          color3="#B497CF"
          timeSpeed={0.25}
          colorBalance={0.0}
          warpStrength={1.0}
          warpFrequency={5.0}
          warpSpeed={2.0}
          warpAmplitude={50.0}
          blendAngle={0.0}
          blendSoftness={0.05}
          rotationAmount={500.0}
          noiseScale={2.0}
          grainAmount={0.1}
          grainScale={2.0}
          grainAnimated={false}
          contrast={1.5}
          gamma={1.0}
          saturation={1.0}
          centerX={0.0}
          centerY={0.0}
          zoom={0.9}
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
