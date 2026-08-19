import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Solutions } from './pages/Solutions';
import { DevOpsSupport } from './pages/DevOpsSupport';
import { CloudKubernetes } from './pages/CloudKubernetes';
import { Cicd } from './pages/Cicd';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import './styles.css';

// Scroll to top helper when route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div 
        id="app-root" 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          position: 'relative' 
        }}
      >
        <Header />
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/devops-support" element={<DevOpsSupport />} />
            <Route path="/cloud-kubernetes" element={<CloudKubernetes />} />
            <Route path="/cicd" element={<Cicd />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            {/* Fallback route redirection */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
