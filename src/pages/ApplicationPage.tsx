import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ApplicationForm from '../components/forms/ApplicationForm';
import '../styles/ApplicationPage.css';

// Navbar, Footer, AnimatedBackground, and Cursor are rendered by AppLayout.
// Do NOT import them here — they would cause double-rendering.

const ApplicationPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="app-main">
      <div className="container app-container-custom">
        <button onClick={() => navigate(-1)} className="back-btn group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <ApplicationForm />
      </div>
    </main>
  );
};

export default ApplicationPage;
