import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import Cursor from '../components/Cursor';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ApplicationForm from '../components/forms/ApplicationForm';
import '../styles/ApplicationPage.css';

const ApplicationPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="application-page">
      <AnimatedBackground />
      <Cursor />
      
      {/* We skip the modal trigger logic in Navbar for this page to keep it clean, 
          but we still render Navbar */}
      <Navbar />
      
      <main className="app-main">
        <div className="container app-container-custom">
          
          <button onClick={() => navigate(-1)} className="back-btn group">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          <ApplicationForm />

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ApplicationPage;
