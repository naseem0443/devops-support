import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Github, Settings, CheckSquare, ShieldCheck, 
  Box, Database, Globe, Activity, ArrowRight 
} from 'lucide-react';

export const Cicd: React.FC = () => {
  const navigate = useNavigate();

  const flowSteps = [
    { name: 'Developer', icon: <User size={20} />, color: '#3b82f6' },
    { name: 'Github/GitLab', icon: <Github size={20} />, color: '#00f0ff' },
    { name: 'Build', icon: <Settings size={20} />, color: '#0066ff' },
    { name: 'Test', icon: <CheckSquare size={20} />, color: '#10b981' },
    { name: 'Security Scan', icon: <ShieldCheck size={20} />, color: '#ef4444' },
    { name: 'Container Image', icon: <Box size={20} />, color: '#f59e0b' },
    { name: 'Registry', icon: <Database size={20} />, color: '#a855f7' },
    { name: 'Deployment', icon: <Github size={20} />, color: '#00f0ff' },
    { name: 'Kubernetes/Cloud', icon: <Globe size={20} />, color: '#3b82f6' },
    { name: 'Monitoring', icon: <Activity size={20} />, color: '#10b981' }
  ];

  const details = [
    {
      title: 'Automated Test Gates',
      desc: 'Inject unit, integration, and interface tests directly into the build pipeline. Builds are aborted automatically on any check failures, protecting staging environments.'
    },
    {
      title: 'Security Scanning & Gates',
      desc: 'Verify packages and container layers for known vulnerabilities (CVEs) before compiling. Scan repositories for API keys and trigger build failures if leaks are detected.'
    },
    {
      title: 'GitOps Continuous Deployment',
      desc: 'Sync cluster states directly with version control files using Argo CD. Eliminate manual deployments and enable immediate sync controls.'
    },
    {
      title: 'Safe Release Strategies',
      desc: 'Configure blue-green configurations or incremental canary routing to verify updates on live servers before complete traffic transitions.'
    }
  ];

  const technologies = [
    { name: 'GitHub Actions', desc: 'Native workspace workflows for build automation.' },
    { name: 'GitLab CI/CD', desc: 'Secure repository pipelines with integrated runners.' },
    { name: 'Jenkins', desc: 'Customizable, legacy pipeline servers for complex orchestrations.' },
    { name: 'Argo CD', desc: 'GitOps controller tracking manifest changes in Kubernetes.' },
    { name: 'Docker', desc: 'Standard runtime packaging applications into image layers.' },
    { name: 'Kubernetes', desc: 'Container orchestration engine managing scale and routing.' },
    { name: 'Helm', desc: 'Package manager deploying templated Kubernetes manifests.' },
    { name: 'Terraform', desc: 'Provision cloud resources supporting the pipeline applications.' }
  ];

  return (
    <div id="cicd-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <span style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase' }}>
            Continuous Delivery
          </span>
          <h1 style={{ marginTop: '0.5rem' }}>Automate Software Delivery from Code to Production</h1>
          <p>
            Eliminate manual errors and release features safely with automated, multi-stage pipelines.
          </p>
        </div>
      </div>

      {/* Interactive Flowchart */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrap text-center">
            <h2>The Delivery Lifecycle</h2>
            <p>From a developer\'s local commit to active customer traffic and monitoring.</p>
          </div>

          <div className="flow-diagram-container">
            <div className="flow-steps">
              {flowSteps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="flow-step">
                    <div className="flow-icon-circle" style={{ borderColor: step.color, color: step.color }}>
                      {step.icon}
                    </div>
                    <span>{step.name}</span>
                  </div>
                  {idx < flowSteps.length - 1 && (
                    <div className="flow-arrow">
                      <ArrowRight size={16} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Controls */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-title-wrap text-center">
            <h2>Pipeline Controls & Quality Gates</h2>
            <p>Integrate automated quality controls to ensure code stability and environment security.</p>
          </div>

          <div className="grid-2" style={{ gap: '2.5rem' }}>
            {details.map((item, idx) => (
              <div className="card" key={idx}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--accent-cyan)' }}>{item.title}</h3>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline Tech Stack */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrap text-center">
            <h2>Core Pipeline Technologies</h2>
            <p>We build pipelines utilizing industry-standard automation and hosting packages.</p>
          </div>

          <div className="grid-4">
            {technologies.map((tech, idx) => (
              <div key={idx} style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius-md)',
                padding: '1.5rem',
                height: '100%'
              }}>
                <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem', fontFamily: 'var(--font-title)' }}>
                  {tech.name}
                </h4>
                <p style={{ fontSize: '0.85rem', margin: 0, color: 'var(--text-secondary)' }}>
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section container">
        <div className="cta-banner">
          <h2>Ready to Accelerate Your Deployments?</h2>
          <p>
            Contact us to modernize your build pipelines and transition to a fully automated GitOps delivery workflow.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/contact')}>
            Optimize Pipelines
          </button>
        </div>
      </section>
    </div>
  );
};
