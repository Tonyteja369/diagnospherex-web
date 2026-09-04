import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cursor from '../components/Cursor';
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
      {/* Global Background: Sleek Pale Ambient Gradient Layer */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          backgroundColor: '#FAFAFE',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <Grainient
          color1="#FFFFFF"
          color2="#F3F0FE"
          color3="#EAE6FD"
          timeSpeed={0.02}
          colorBalance={0.1}
          warpStrength={0.15}
          warpFrequency={2.0}
          warpSpeed={0.1}
          warpAmplitude={3.0}
          blendAngle={135.0}
          blendSoftness={0.5}
          rotationAmount={10.0}
          noiseScale={0.0}
          grainAmount={0.01}
          grainScale={0.5}
          grainAnimated={false}
          contrast={1.0}
          gamma={1.0}
          saturation={0.5}
          centerX={0.0}
          centerY={0.0}
          zoom={1.0}
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
