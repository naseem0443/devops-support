import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Shield, Cpu, RefreshCw, Activity, Layers, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  const navigate = useNavigate();

  const principles = [
    {
      title: 'Automation First',
      icon: <Cpu size={20} />,
      desc: 'Eliminating manual steps ensures consistency, speed, and auditability. We design every cloud system to be constructed, configured, and updated via pipelines rather than manual click-ops.'
    },
    {
      title: 'Security First',
      icon: <Shield size={20} />,
      desc: 'Security checks and vulnerability testing are woven directly into pipeline gates. Secrets are isolated in secure vaults, and infrastructure access strictly adheres to least-privilege models.'
    },
    {
      title: 'Reliability First',
      icon: <Activity size={20} />,
      desc: 'Designing configurations with high availability, database redundancy, auto-recovery pools, and health checks guarantees continuous operation and limits service impact.'
    },
    {
      title: 'Cloud-Native Engineering',
      icon: <Layers size={20} />,
      desc: 'Leveraging containerization, dynamic resource allocation, and cloud-managed services permits rapid scaling and limits long-term provider-lock boundaries.'
    },
    {
      title: 'Infrastructure as Code (IaC)',
      icon: <Terminal size={20} />,
      desc: 'All virtual machines, database instances, and network subnets are declared in code configurations (Terraform, Ansible), ensuring complete reproducibility and drift control.'
    },
    {
      title: 'Continuous Delivery',
      icon: <RefreshCw size={20} />,
      desc: 'Frequent, minor code integrations reduce deployment risk and speed up release cycles. Git-centric pipelines deliver updates securely and automatically.'
    }
  ];

  return (
    <div id="about-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <span style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase' }}>
            Who We Are
          </span>
          <h1 style={{ marginTop: '0.5rem' }}>Cloud & DevOps Engineering Philosophy</h1>
          <p>
            We help modern software organizations establish secure, automated, and observable delivery platforms.
          </p>
        </div>
      </div>

      {/* Main Philosophy Text */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: '4rem', alignItems: 'center', marginBottom: '5rem' }}>
            <div>
              <h2 style={{ marginBottom: '1.5rem' }}>Engineering Reliable Platforms</h2>
              <p>
                At DevOps Support, our mission is to simplify software deployment and optimize system reliability. Modern application hosting environments require high coordination between developer requirements and cloud operations.
              </p>
              <p>
                We collaborate with development teams to configure pipelines that build, test, and release container images seamlessly, while provisioning underling cloud infrastructure with consistent security controls.
              </p>
              <p>
                By treating infrastructure as code and treating operational logs as core feedback loops, we enable businesses to scale their services without sacrificing system stability.
              </p>
            </div>
            
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius-lg)',
              padding: '2.5rem',
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--accent-cyan)' }}>Our core goal</h3>
              <p style={{ fontStyle: 'italic', fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--text-primary)' }}>
                "Build. Automate. Scale. Secure."
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                To design platforms that reduce developer overhead, prevent configuration drift, audit and block security vulnerabilities in real-time, and run stably across both Azure and AWS cloud environments.
              </p>
            </div>
          </div>

          {/* Pillars List */}
          <div className="section-title-wrap text-center" style={{ marginTop: '6rem' }}>
            <h2>Core Engineering Principles</h2>
            <p>Every implementation recommendation and cloud setup we deliver follows these engineering guidelines.</p>
          </div>

          <div className="grid-3">
            {principles.map((pr, idx) => (
              <div className="card" key={idx}>
                <div className="card-icon" style={{ width: '40px', height: '40px', fontSize: '1.25rem', marginBottom: '1rem' }}>
                  {pr.icon}
                </div>
                <h3>{pr.title}</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{pr.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section container">
        <div className="cta-banner">
          <h2>Discuss Your Infrastructure Architecture</h2>
          <p>
            Consult with our engineering team to assess your current pipelines and explore modernization strategies.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/contact')}>
            Consult an Engineer <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};
