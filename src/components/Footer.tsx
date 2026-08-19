import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Shield, Cpu, RefreshCw, Activity } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo" style={{ marginBottom: '1.5rem', display: 'flex' }}>
              <Terminal size={20} className="logo-icon" style={{ color: 'var(--accent-cyan)' }} />
              <span>DevOps PDFMasterPro</span>
            </Link>
            <p style={{ fontStyle: 'italic', color: 'var(--accent-cyan)', marginBottom: '1rem', fontWeight: 600 }}>
              "Build. Automate. Scale. Secure."
            </p>
            <p>
              Enterprise-grade Cloud Engineering, Kubernetes Operations, Security, and Production Support.
            </p>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><Link to="/services">Cloud Engineering</Link></li>
              <li><Link to="/services">Kubernetes & Containers</Link></li>
              <li><Link to="/services">CI/CD Automation</Link></li>
              <li><Link to="/services">Infrastructure as Code</Link></li>
              <li><Link to="/services">DevSecOps & Security</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/solutions">Solutions</Link></li>
              <li><Link to="/devops-support">DevOps Support</Link></li>
              <li><Link to="/cloud-kubernetes">Cloud & Kubernetes</Link></li>
              <li><Link to="/cicd">CI/CD Pipeline</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Legal & Contact</h4>
            <ul className="footer-links">
              <li><Link to="/contact">Contact Support</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
                <span title="Infrastructure automation first"><Cpu size={16} /></span>
                <span title="Security first"><Shield size={16} /></span>
                <span title="Continuous delivery"><RefreshCw size={16} /></span>
                <span title="Observability driven"><Activity size={16} /></span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} DevOps PDFMasterPro. All rights reserved.</p>
          <p>
            Designed & Engineered for Production Reliability.
          </p>
        </div>
      </div>
    </footer>
  );
};
