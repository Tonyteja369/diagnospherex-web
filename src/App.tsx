import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import LandingPage from './pages/LandingPage';
import ApplicationPage from './pages/ApplicationPage';
import ApplicationSuccessPage from './pages/ApplicationSuccessPage';
import './styles/App.css';
import './styles/responsive.css';

function App() {
  // Global haptic feedback on all taps
  useEffect(() => {
    const handleTap = () => {
      if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(40);
      }
    };

    document.addEventListener('pointerdown', handleTap);
    return () => document.removeEventListener('pointerdown', handleTap);
  }, []);

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/careers/apply" element={<ApplicationPage />} />
        <Route path="/apply-success" element={<ApplicationSuccessPage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
