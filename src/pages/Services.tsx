import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Cloud, Layers, GitBranch, Terminal, Shield, 
  Activity, LifeBuoy, ArrowUpRight, ArrowRight 
} from 'lucide-react';

export const Services: React.FC = () => {
  const navigate = useNavigate();

  const servicesList = [
    {
      id: 'cloud-engineering',
      icon: <Cloud size={24} />,
      title: 'Cloud Engineering',
      description: 'Design and manage modern, resilient public cloud infrastructures built on Azure and AWS.',
      items: [
        'Multi-region cloud architecture design',
        'Infrastructure automation & orchestration',
        'Secure networking (VPCs, VPNs, ExpressRoute)',
        'Identity & Access Management (IAM/Entra ID)',
        'Cloud migration strategy & implementation',
        'Cost optimization & governance controls'
      ],
      technologies: 'Microsoft Azure, AWS, Azure Resource Manager, AWS CloudFormation'
    },
    {
      id: 'kubernetes-containers',
      icon: <Layers size={24} />,
      title: 'Kubernetes & Containers',
      description: 'Orchestrate microservices and manage secure, highly available containerized platforms.',
      items: [
        'Production cluster deployments (AKS, EKS)',
        'Declarative application definitions via Helm',
        'Autoscaling configuration (HPA, VPA, Cluster Autoscaler)',
        'Secure cluster ingress controllers & TLS terminations',
        'Service mesh implementation (Istio, Linkerd)',
        'Non-disruptive cluster upgrades & patching'
      ],
      technologies: 'Kubernetes, Docker, AKS, EKS, Helm, Nginx Ingress, Istio'
    },
    {
      id: 'cicd-automation',
      icon: <GitBranch size={24} />,
      title: 'CI/CD Automation',
      description: 'Accelerate code delivery and streamline releases with robust, automated pipelines.',
      items: [
        'Multi-stage build & deployment automation',
        'Self-hosted runners management & orchestration',
        'GitOps integration using Argo CD & Flux',
        'Automated release strategies (Rolling, Canary, Blue-Green)',
        'Pipeline templates & reusable configurations',
        'Test integration gates (Unit, Integration, and E2E)'
      ],
      technologies: 'GitHub Actions, GitLab CI/CD, Jenkins, Argo CD, Artifactory'
    },
    {
      id: 'infrastructure-as-code',
      icon: <Terminal size={24} />,
      title: 'Infrastructure as Code (IaC)',
      description: 'Define your entire infrastructure declaratively to guarantee consistency and eliminate drift.',
      items: [
        'Modular & reusable Terraform blueprints',
        'Configuration management with Ansible',
        'Declarative state management & locking setup',
        'Automated IaC verification in pipelines',
        'Policy as Code (Sentinel, OPA) integration',
        'Drift detection & remediation workflows'
      ],
      technologies: 'Terraform, Ansible, Terraform Cloud, Terragrunt'
    },
    {
      id: 'devsecops',
      icon: <Shield size={24} />,
      title: 'DevSecOps & Pipeline Security',
      description: 'Inject security verification directly into the automated software development lifecycle.',
      items: [
        'Static & Dynamic Application Security Testing (SAST/DAST)',
        'Container vulnerability scanning (Trivy, Clair)',
        'Zero-trust secrets management (HashiCorp Vault, Key Vault)',
        'Dependency vulnerability analysis & licensing gates',
        'Infrastructure compliance verification auditing',
        'Pipeline build signing & registry security policies'
      ],
      technologies: 'Azure Key Vault, HashiCorp Vault, SonarQube, Trivy, Gitleaks'
    },
    {
      id: 'monitoring-observability',
      icon: <Activity size={24} />,
      title: 'Monitoring & Observability',
      description: 'Gain full clarity into application performance, availability, and infrastructure metrics.',
      items: [
        'Time-series metric storage with Prometheus',
        'Interactive visualization dashboards with Grafana',
        'Centralized logging aggregates (ELK / EFK, Azure Monitor)',
        'Application Performance Monitoring (APM/App Insights)',
        'Distributed request tracing (Jaeger, OpenTelemetry)',
        'Smart alert rules & incident integrations'
      ],
      technologies: 'Prometheus, Grafana, Elasticsearch, Application Insights, Logstash'
    },
    {
      id: 'production-support',
      icon: <LifeBuoy size={24} />,
      title: 'Production Support & Troubleshooting',
      description: 'Get expert engineering assistance during active incidents and operational failures.',
      items: [
        'Kubernetes pod failures & ingress routing errors resolution',
        'CI/CD pipeline breakages and deployment blockage fixes',
        'Cloud infrastructure downtime troubleshooting',
        'Performance bottlenecks & database optimization audits',
        'Incident postmortems & root-cause analyses (RCA)',
        'Reliability reviews & high-availability recommendations'
      ],
      technologies: 'Linux, Shell Scripting, Netstat, Wireshark, Cloud logs, Kube logs'
    },
    {
      id: 'cloud-migration',
      icon: <ArrowUpRight size={24} />,
      title: 'Cloud & App Migration',
      description: 'Safely transition and modernize legacy on-premises services into the cloud.',
      items: [
        'On-premises VM migrations to cloud environments',
        'Monolithic application refactoring into microservices',
        'Database migrations with minimal downtime',
        'Legacy hosting translation into Kubernetes AKS/EKS',
        'Re-hosting, re-platforming, and re-architecting assessments',
        'Post-migration performance verification and compliance validation'
      ],
      technologies: 'Azure Migrate, AWS Application Migration Service, Database Migration Service'
    }
  ];

  return (
    <div id="services-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <span style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase' }}>
            What We Do
          </span>
          <h1 style={{ marginTop: '0.5rem' }}>Enterprise DevOps Services</h1>
          <p>
            Vetted engineering services configured to automate pipelines, secure deployments, scale clusters, and run reliable cloud environments.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: '3rem' }}>
            {servicesList.map((service) => (
              <div 
                className="card" 
                key={service.id} 
                id={service.id} 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  height: '100%' 
                }}
              >
                <div>
                  <div className="card-icon">
                    {service.icon}
                  </div>
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>{service.title}</h3>
                  <p style={{ marginBottom: '1.5rem', fontSize: '1rem', color: 'var(--text-primary)' }}>
                    {service.description}
                  </p>
                  
                  <ul className="service-card-list" style={{ marginBottom: '2rem' }}>
                    {service.items.map((item, idx) => (
                      <li key={idx} style={{ color: 'var(--text-secondary)' }}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ 
                  borderTop: '1px solid var(--border-color)', 
                  paddingTop: '1.5rem', 
                  marginTop: 'auto' 
                }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', fontWeight: 600 }}>
                    Core Stack
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
                    {service.technologies}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section container">
        <div className="cta-banner">
          <h2>Need Custom DevOps Implementations?</h2>
          <p>
            Our team will architect and build a solution tailored exactly to your technological stack and delivery objectives.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/contact')}>
            Get DevOps Support <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};
