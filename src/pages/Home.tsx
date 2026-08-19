import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Shield, Cpu, Activity, 
  Server, Workflow, CheckCircle2, ChevronRight 
} from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleSupportCta = () => {
    navigate('/contact');
  };

  const handleServicesCta = () => {
    navigate('/services');
  };

  // Technologies list
  const technologies = [
    { name: 'Azure', type: 'cloud' },
    { name: 'AWS', type: 'cloud' },
    { name: 'Kubernetes', type: 'container' },
    { name: 'Docker', type: 'container' },
    { name: 'Terraform', type: 'iac' },
    { name: 'Ansible', type: 'iac' },
    { name: 'Jenkins', type: 'cicd' },
    { name: 'GitHub Actions', type: 'cicd' },
    { name: 'GitLab', type: 'cicd' },
    { name: 'Argo CD', type: 'cicd' },
    { name: 'Helm', type: 'container' },
    { name: 'Prometheus', type: 'obs' },
    { name: 'Grafana', type: 'obs' }
  ];

  // Pipeline flow node definition
  const pipelineSteps = [
    { num: '01', name: 'Developer', desc: 'Code commits' },
    { num: '02', name: 'Git Control', desc: 'Version tracking' },
    { num: '03', name: 'CI/CD Pipeline', desc: 'Auto trigger' },
    { num: '04', name: 'Secure Build', desc: 'Package binaries' },
    { num: '05', name: 'Containerization', desc: 'Docker images' },
    { num: '06', name: 'Orchestration', desc: 'Kubernetes (AKS/EKS)' },
    { num: '07', name: 'Cloud Deploy', desc: 'Infrastructure provision' },
    { num: '08', name: 'Observability', desc: 'Prometheus & Grafana' }
  ];

  return (
    <div id="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="badge-tech" style={{
                color: 'var(--accent-cyan)',
                border: '1px solid var(--accent-cyan)',
                borderRadius: '20px',
                padding: '0.25rem 1rem',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                fontWeight: 600,
                letterSpacing: '0.1em',
                display: 'inline-block',
                marginBottom: '1.5rem'
              }}>
                Cloud & DevOps Experts
              </span>
              <h1>Reliable DevOps & Cloud Engineering for <span>Modern Businesses</span></h1>
              <p>
                Build, automate, secure, monitor, and scale your applications with enterprise-grade DevOps and cloud engineering.
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary" onClick={handleSupportCta}>
                  Get DevOps Support <ArrowRight size={18} />
                </button>
                <button className="btn btn-secondary" onClick={handleServicesCta}>
                  Explore Services
                </button>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="visualizer-container">
                <div className="visualizer-title">Active DevOps Pipeline</div>
                <div className="pipeline-flow">
                  <div className="pipeline-connector"></div>
                  {pipelineSteps.map((step) => (
                    <div className="pipeline-node" key={step.num}>
                      <div className="pipeline-node-info">
                        <span className="pipeline-node-num">{step.num}</span>
                        <div>
                          <div className="pipeline-node-name">{step.name}</div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{step.desc}</span>
                        </div>
                      </div>
                      <div className="pipeline-node-status">online</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Tech Banner */}
      <section className="tech-banner">
        <div className="container">
          <div className="tech-banner-title">Architected with Enterprise Technologies</div>
          <div className="tech-grid">
            {technologies.map((tech) => (
              <span className="tech-item" key={tech.name}>
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why DevOps Support */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-title-wrap text-center">
            <h2>Why DevOps Support</h2>
            <p>Our foundation is built on three core pillars designed to deliver robust, high-performance infrastructures.</p>
          </div>
          <div className="grid-3">
            <div className="card">
              <div className="card-icon">
                <Cpu size={24} />
              </div>
              <h3>Automation First</h3>
              <p>
                We believe manual processes lead to inconsistencies and drift. We enforce Infrastructure as Code (IaC) and pipeline automation from day one, assuring reproducible and predictable systems.
              </p>
            </div>
            <div className="card">
              <div className="card-icon">
                <Shield size={24} />
              </div>
              <h3>Security-by-Design</h3>
              <p>
                Security is not an afterthought. We weave automated vulnerability scanning, secret management, least-privilege IAM policies, and container shielding directly into your release cycle.
              </p>
            </div>
            <div className="card">
              <div className="card-icon">
                <Activity size={24} />
              </div>
              <h3>Continuous Observability</h3>
              <p>
                A healthy infrastructure is a visible one. We deploy comprehensive logging, metric collection, and smart alerts to catch performance regressions and anomalous behavior before your users do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cloud & Kubernetes Highlight */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <h2 style={{ marginBottom: '1.5rem' }}>Cloud Infrastructure & Kubernetes Scaling</h2>
              <p>
                Leverage Azure and AWS environments configured for maximum durability, security, and cost efficiency. We design highly available Kubernetes platforms matching modern cloud-native standards.
              </p>
              <ul className="service-card-list" style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
                <li>Microsoft Azure & AWS Managed Services (AKS, EKS)</li>
                <li>Production-grade network setups with private subnets, WAF, and firewalls</li>
                <li>Autoscaling structures configured to handle organic traffic spikes</li>
                <li>Comprehensive cluster disaster recovery, backups, and secure ingress TLS</li>
              </ul>
              <button className="btn btn-secondary" onClick={() => navigate('/cloud-kubernetes')}>
                Learn About Cloud & Kubernetes <ChevronRight size={16} />
              </button>
            </div>
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius-lg)',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)' }}>
                <Server size={22} /> Infrastructure Capabilities
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600 }}>Multi-Region High Availability</span>
                    <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>Active-Active</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', margin: 0 }}>Fully redundant setups with failover capability.</p>
                </div>
                <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600 }}>Infrastructure as Code Coverage</span>
                    <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>100% Declarative</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', margin: 0 }}>Vetted Terraform and Ansible modules without manual console configurations.</p>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600 }}>Zero-Downtime Deployment</span>
                    <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>Rolling/Blue-Green</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', margin: 0 }}>Deploy web apps and microservices with absolute continuity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CI/CD & DevSecOps Showcase */}
      <section className="section section-alt">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius-lg)',
              padding: '2.5rem',
            }}>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)' }}>
                <Workflow size={22} /> Pipeline Security Controls
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <h4 style={{ fontSize: '1rem' }}>SAST & DAST Scanning</h4>
                    <p style={{ fontSize: '0.85rem', margin: 0 }}>Static analysis (SonarQube) and dynamic vulnerability scanning in pipeline steps.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <h4 style={{ fontSize: '1rem' }}>Container Vulnerability Auditing</h4>
                    <p style={{ fontSize: '0.85rem', margin: 0 }}>Scanning image layers with Trivy/Clair before promoting to public registries.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <h4 style={{ fontSize: '1rem' }}>Zero-Secret Commits</h4>
                    <p style={{ fontSize: '0.85rem', margin: 0 }}>Integrating secret detectors (Gitleaks) to restrict API keys or certificates ingestion into version control.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 style={{ marginBottom: '1.5rem' }}>Secure & Standardized Software Pipelines</h2>
              <p>
                Eliminate errors and deploy updates securely with Git-centric workflows. We construct end-to-end continuous integration and deployment pipelines built on GitHub Actions, GitLab CI/CD, and Argo CD.
              </p>
              <ul className="service-card-list" style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
                <li>Multi-stage testing verification (Unit, Integration, and E2E)</li>
                <li>Automated security gates that restrict vulnerable packages deployment</li>
                <li>GitOps based container deployments using Argo CD and Helm charts</li>
                <li>Traceable pipeline runs linked directly to commit IDs and authors</li>
              </ul>
              <button className="btn btn-secondary" onClick={() => navigate('/cicd')}>
                Explore CI/CD Pipelines <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Production Support & How We Help */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrap text-center">
            <h2>Production Reliability & Operations</h2>
            <p>We are available to maintain and debug your infrastructure when failures occur.</p>
          </div>
          <div className="grid-2">
            <div style={{
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius-lg)',
              padding: '2.5rem',
              background: 'linear-gradient(to bottom, rgba(13, 21, 39, 0.2), transparent)'
            }}>
              <h3 style={{ marginBottom: '1rem' }}>Production Support</h3>
              <p>
                Resolve infrastructure emergencies, Kubernetes system faults, network anomalies, and pipeline crashes. We provide expert engineering support to recover operations and establish root-cause postmortems.
              </p>
              <ul className="service-card-list" style={{ marginTop: '1.25rem' }}>
                <li>Kubernetes network & ingress troubleshooting</li>
                <li>Cloud database and VM outages recovery</li>
                <li>CI/CD failures and deployment blockage resolution</li>
                <li>Performance tuning and cloud cost optimizations</li>
              </ul>
            </div>
            
            <div style={{
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius-lg)',
              padding: '2.5rem',
              background: 'linear-gradient(to bottom, rgba(13, 21, 39, 0.2), transparent)'
            }}>
              <h3 style={{ marginBottom: '1rem' }}>How We Help</h3>
              <p>
                We collaborate with your existing development team, taking complete ownership of infrastructure setup, provisioning, and pipelines so your developers can focus purely on business logic.
              </p>
              <ul className="service-card-list" style={{ marginTop: '1.25rem' }}>
                <li>Co-operative architectural planning and design reviews</li>
                <li>Step-by-step legacy system modernization to containers</li>
                <li>Infrastructure auditing for security compliance and cost drift</li>
                <li>Clear knowledge transfer and comprehensive documentation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section container">
        <div className="cta-banner">
          <h2>Secure and Scale Your Infrastructure Today</h2>
          <p>
            Get professional DevOps support and cloud engineering solutions built specifically for your business requirements.
          </p>
          <button className="btn btn-primary" onClick={handleSupportCta}>
            Get DevOps Support <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};
