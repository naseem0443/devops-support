import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cloud, Layers, CheckCircle2 } from 'lucide-react';

export const CloudKubernetes: React.FC = () => {
  const navigate = useNavigate();

  const cloudPlatforms = [
    { name: 'Microsoft Azure', desc: 'Enterprise-grade cloud setups using Resource Groups, Managed Identities, Key Vault, and Application Insights.' },
    { name: 'Amazon Web Services (AWS)', desc: 'Scalable multi-account setups with VPCs, IAM policies, and RDS databases.' },
    { name: 'Google Cloud Platform (GCP)', desc: 'Data-rich applications and containerized tools utilizing Cloud Storage, IAM, and Compute Engine.' }
  ];

  const k8sPlatforms = [
    { name: 'Azure Kubernetes Service (AKS)', desc: 'Managed Azure clusters integrated with Azure CNI, Entra ID authentication, and Private endpoints.' },
    { name: 'Elastic Kubernetes Service (EKS)', desc: 'Managed AWS clusters utilizing AWS VPC CNI, IAM roles for service accounts (IRSA), and KMS keys.' },
    { name: 'Google Kubernetes Engine (GKE)', desc: 'Highly automated container clusters with Autopilot option and integrated GCP logging.' },
    { name: 'On-premises Kubernetes', desc: 'Self-managed bare-metal or VMware cluster setups using Rancher, kubeadm, MetalLB, and custom ingress.' }
  ];

  const capabilities = [
    { title: 'Cluster Deployment', desc: 'Fully automated provisioning of Kubernetes control planes and node pools using declarative IaC.' },
    { title: 'Cluster Upgrades', desc: 'Safe, rolling node updates and Kubernetes API version upgrades with zero downtime to applications.' },
    { title: 'High Availability', desc: 'Multi-AZ control planes and pod topology spread constraints to prevent failure domain outages.' },
    { title: 'Ingress & TLS', desc: 'Secure routing with Nginx/Traefik Ingress controllers and automated Let\'s Encrypt TLS certificate renewals.' },
    { title: 'Helm Charts', desc: 'Packaging applications in reusable Helm templates to manage configurations across environments.' },
    { title: 'Service Mesh', desc: 'Mutual TLS, secure pod-to-pod communication, traffic splitting, and tracing using Istio or Linkerd.' },
    { title: 'Autoscaling', desc: 'Dynamic horizontal/vertical pod scaling (HPA/VPA) and cluster compute scaling based on real-time resource loads.' },
    { title: 'Monitoring & Logs', desc: 'Deep visibility into cluster health using Prometheus scrapers, Grafana dashboards, and fluentd log shippers.' },
    { title: 'Backup & Recovery', desc: 'Disaster recovery configurations backing up cluster manifests and persistent volumes using Velero.' }
  ];

  return (
    <div id="cloud-k8s-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <span style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase' }}>
            Cloud Native Platforms
          </span>
          <h1 style={{ marginTop: '0.5rem' }}>Cloud & Kubernetes Platform Engineering</h1>
          <p>
            Standardized architectures for multi-cloud deployments and enterprise container orchestration.
          </p>
        </div>
      </div>

      {/* Cloud Platforms */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrap text-center">
            <h2>Supported Cloud Platforms</h2>
            <p>We build consistent, secure virtual environments across the leading public cloud systems.</p>
          </div>

          <div className="grid-3">
            {cloudPlatforms.map((cloud, idx) => (
              <div className="card" key={idx}>
                <div className="card-icon">
                  <Cloud size={24} />
                </div>
                <h3>{cloud.name}</h3>
                <p>{cloud.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kubernetes Environments */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-title-wrap text-center">
            <h2>Kubernetes Orchestration</h2>
            <p>Deploy microservices to reliable, managed, or self-hosted Kubernetes clusters.</p>
          </div>

          <div className="grid-4">
            {k8sPlatforms.map((k8s, idx) => (
              <div className="card" key={idx} style={{ padding: '1.5rem' }}>
                <div className="card-icon" style={{ width: '40px', height: '40px', fontSize: '1.25rem', marginBottom: '1rem' }}>
                  <Layers size={20} />
                </div>
                <h4 style={{ marginBottom: '0.5rem' }}>{k8s.name}</h4>
                <p style={{ fontSize: '0.85rem', margin: 0 }}>{k8s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrap text-center">
            <h2>Technical Capabilities</h2>
            <p>Every platform we architect includes these standard features to guarantee security, stability, and scale.</p>
          </div>

          <div className="grid-3" style={{ gap: '2.5rem' }}>
            {capabilities.map((cap, idx) => (
              <div key={idx} style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius-md)',
                padding: '2rem',
                display: 'flex',
                gap: '1rem'
              }}>
                <CheckCircle2 size={24} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{cap.title}</h4>
                  <p style={{ fontSize: '0.9rem', margin: 0, color: 'var(--text-secondary)' }}>{cap.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section container">
        <div className="cta-banner">
          <h2>Need to Migrate Workloads to Kubernetes?</h2>
          <p>
            Our cloud architects analyze your application dependencies and design a zero-downtime container transition plan.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/contact')}>
            Consult our Team
          </button>
        </div>
      </section>
    </div>
  );
};
