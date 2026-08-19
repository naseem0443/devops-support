import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ShieldAlert, Clock, Phone } from 'lucide-react';

export const DevOpsSupport: React.FC = () => {
  const navigate = useNavigate();

  const handleCta = () => {
    navigate('/contact');
  };

  const supportedTech = [
    'Kubernetes (AKS/EKS/GKE)',
    'Microsoft Azure',
    'Amazon Web Services (AWS)',
    'Docker Containers',
    'Terraform Infrastructure',
    'Ansible Configuration',
    'CI/CD Workflows',
    'Jenkins Automation',
    'GitHub Actions',
    'GitLab Pipelines',
    'Nginx & Ingress Routing',
    'Prometheus & Grafana',
    'Production Outages',
    'Cloud Migrations'
  ];

  const tiers = [
    {
      name: 'Basic Support',
      desc: 'Essential support for small teams and static environments needing occasional operations backup.',
      features: [
        'Business hours email response (Next Business Day)',
        'CI/CD pipeline troubleshooting assistance',
        'Basic cloud resource configuration auditing',
        'Standard backup verification audits',
        'Access to our technical documentation library'
      ]
    },
    {
      name: 'Professional Support',
      desc: 'Comprehensive infrastructure support for active production environments with SLA guarantees.',
      popular: true,
      features: [
        'Priority response SLA (4-hour for critical items)',
        'Kubernetes ingress & cluster configuration support',
        'IaC (Terraform) drift diagnostics & module updates',
        'Basic monitoring dashboard configuration (Prometheus)',
        'Scheduled monthly infrastructure health checks',
        'Security patch audits and deployment advisories'
      ]
    },
    {
      name: 'Enterprise Support',
      desc: 'Dedicated architectural engineering and 24/7 incident response for high-traffic mission-critical systems.',
      features: [
        '24/7 emergency pager coverage for production downtime',
        '1-hour response SLA for high-severity incidents',
        'Dedicated DevOps architect assignment',
        'Custom monitoring setup & on-call pager configurations',
        'Architectural design reviews & cloud modernization audits',
        'Post-incident root-cause analysis (RCA) audits'
      ]
    }
  ];

  return (
    <div id="support-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <span style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase' }}>
            Operations & Support
          </span>
          <h1 style={{ marginTop: '0.5rem' }}>DevOps Support When You Need It</h1>
          <p>
            On-demand technical assistance and architectural expertise to keep your deployment pipelines fast, your clusters secure, and your systems online.
          </p>
        </div>
      </div>

      {/* Main Support Info */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: '4rem', alignItems: 'center', marginBottom: '5rem' }}>
            <div>
              <h2 style={{ marginBottom: '1.5rem' }}>Full-Stack Support Across Your Ecosystem</h2>
              <p>
                Infrastructure errors and pipeline failures can block deployments and disrupt customer service. We provide direct access to senior cloud and DevOps engineers who troubleshoot, diagnose, and resolve bottlenecks rapidly.
              </p>
              <p>
                Whether you are managing complex AKS workloads in Azure, scaling EC2 instances in AWS, or debugging Ansible playbooks, we are here to support your operations.
              </p>
              
              <div style={{ marginTop: '2.5rem' }}>
                <button className="btn btn-primary" onClick={handleCta}>
                  Request DevOps Support
                </button>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius-lg)',
              padding: '2.5rem',
            }}>
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>Supported Platforms & Technologies</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
              }}>
                {supportedTech.map((tech, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <Check size={16} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="section-title-wrap text-center" style={{ marginTop: '6rem' }}>
            <h2>Support Packages</h2>
            <p>Select the support tier that matches your operations, release cadence, and uptime requirements.</p>
          </div>

          <div className="pricing-grid">
            {tiers.map((tier, idx) => (
              <div key={idx} className={`pricing-card ${tier.popular ? 'popular' : ''}`}>
                {tier.popular && <span className="pricing-badge">Popular</span>}
                <h3>{tier.name}</h3>
                <p className="pricing-desc">{tier.desc}</p>
                <div className="pricing-cost">
                  Contact us for pricing
                </div>
                <ul className="pricing-features">
                  {tier.features.map((feat, fidx) => (
                    <li key={fidx}>
                      <Check size={18} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`btn ${tier.popular ? 'btn-primary' : 'btn-secondary'}`} 
                  onClick={handleCta}
                  style={{ width: '100%' }}
                >
                  Request {tier.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Highlights Details */}
      <section className="section section-alt">
        <div className="container">
          <div className="grid-3">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <Clock size={36} style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }} />
              <h4>Rapid Response SLAs</h4>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Guaranteed response timelines for critical production incidents, preventing prolonged application outages.
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <ShieldAlert size={36} style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }} />
              <h4>Security Focused Code</h4>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                All support recommendations and infrastructure fixes strictly align with cloud-native security controls and CIS benchmarks.
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <Phone size={36} style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }} />
              <h4>Direct Engineer Access</h4>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                No first-level support scripts. Talk directly with senior engineers who understand your actual infrastructure setups.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
