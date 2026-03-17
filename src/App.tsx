import { Routes, Route } from 'react-router-dom';
import './styles/App.css';
import './styles/responsive.css';
import LandingPage from './pages/LandingPage';
import ApplicationPage from './pages/ApplicationPage';
import ApplicationSuccessPage from './pages/ApplicationSuccessPage';

function App() {
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
