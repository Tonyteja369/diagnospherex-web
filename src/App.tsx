import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/App.css';
import './styles/responsive.css';
import LandingPage from './pages/LandingPage';
import ApplicationPage from './pages/ApplicationPage';
import ApplicationSuccessPage from './pages/ApplicationSuccessPage';

function App() {
  // Global haptic feedback on all taps
  useEffect(() => {
    const handleTap = () => {
      // Trigger medium intensity haptic feedback (approx 40-50ms)
      if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(40);
      }
    };

    // Use pointerdown to catch taps immediately before click event fires
    document.addEventListener('pointerdown', handleTap);
    return () => document.removeEventListener('pointerdown', handleTap);
  }, []);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/careers/apply" element={<ApplicationPage />} />
        <Route path="/apply-success" element={<ApplicationSuccessPage />} />
      </Routes>
    </div>
  );
}

export default App;
