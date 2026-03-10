import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './ErrorBoundary.tsx'

const sendError = (err: any) => {
  fetch('http://localhost:9999', { method: 'POST', body: String(err) }).catch(console.error);
};
window.addEventListener('error', (e) => sendError(e.error?.stack || e.message));
window.addEventListener('unhandledrejection', (e) => sendError(e.reason?.stack || e.reason));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
