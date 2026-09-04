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

      {/* Global Background: Continuous WebGL Grainient across entire site */}
      <Grainient
        color1="#ff08f6"
        color2="#46005e"
        color3="#49008e"
        timeSpeed={0.85}
        colorBalance={0.0}
        warpStrength={1.0}
        warpFrequency={12}
        warpSpeed={2.0}
        warpAmplitude={50.0}
        blendAngle={0.0}
        blendSoftness={0.05}
        rotationAmount={500.0}
        noiseScale={0}
        grainAmount={0}
        grainScale={0.2}
        grainAnimated={false}
        contrast={1.5}
        gamma={1.0}
        saturation={1.0}
        centerX={0.0}
        centerY={0.0}
        zoom={0.9}
      />

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
