import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Terminal } from 'lucide-react';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'DevOps Support', path: '/devops-support' },
    { name: 'Cloud & Kubernetes', path: '/cloud-kubernetes' },
    { name: 'CI/CD', path: '/cicd' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const handleCtaClick = () => {
    setIsOpen(false);
    navigate('/contact');
  };

  return (
    <header className="header" id="site-header">
      <div className="container header-container">
        <NavLink to="/" className="logo" onClick={handleNavClick}>
          <Terminal size={24} className="logo-icon" style={{ color: 'var(--accent-cyan)' }} />
          <span>DevOps PDFMasterPro</span>
        </NavLink>

        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsOpen(!isOpen)} 
          aria-label="Toggle Navigation Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
          <li className="header-cta-mobile" style={{ marginTop: '1rem', width: '100%' }}>
            <button 
              className="btn btn-primary btn-sm" 
              onClick={handleCtaClick} 
              style={{ width: '100%' }}
            >
              Get DevOps Support
            </button>
          </li>
        </ul>

        <div className="header-cta">
          <button className="btn btn-primary btn-sm" onClick={handleCtaClick}>
            Get DevOps Support
          </button>
        </div>
      </div>
    </header>
  );
};
