import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Shield, RefreshCw, Activity, 
  Terminal, Server, Cloud, Layers, RefreshCcw 
} from 'lucide-react';

export const Solutions: React.FC = () => {
  const navigate = useNavigate();

  const solutionsList = [
    {
      id: 'azure-cloud',
      icon: <Cloud size={24} />,
      title: 'Azure Cloud Solutions',
      problem: 'Enterprises struggle with fragmented cloud resource management, excessive billing overheads, security gaps, and misaligned networking configurations.',
      approach: 'We architect clean, secure Azure environments leveraging Resource Groups, Azure Key Vault, Managed Identities, and Azure policies. All resources are structured for maximum logical separation and network isolation.',
      benefits: 'Reduced cloud spend via automated scaling, solid IAM boundary compliance, and predictable resource provisioning.'
    },
    {
      id: 'k8s-platform',
      icon: <Layers size={24} />,
      title: 'Kubernetes Platform Engineering',
      problem: 'Managing vanilla or cloud Kubernetes clusters manually is error-prone, resulting in routing misconfigurations, TLS certificate expirations, and poor CPU utilization.',
      approach: 'We establish production-ready AKS/EKS environments using infrastructure configurations. We package all applications in Helm charts, enforce secure Ingress controllers with auto-renewing TLS, and deploy Linkerd/Istio service meshes.',
      benefits: 'Consistent container packaging, Zero-Downtime rollouts, auto-recovering pods, and optimized compute resource overheads.'
    },
    {
      id: 'cicd-modernization',
      icon: <RefreshCw size={24} />,
      title: 'CI/CD Modernization',
      problem: 'Legacy, brittle CI/CD systems block deployment schedules, lack testing checks, and require manual developer approvals to get code to staging or production.',
      approach: 'We build fast, secure GitHub Actions and GitLab CI/CD pipelines. We integrate multi-stage testing (Unit, Integration, E2E), secure artifact storage, and enforce automated GitOps release patterns using Argo CD.',
      benefits: 'Increased deployment velocity, complete code traceability, and automated rollback triggers when failures are detected in production.'
    },
    {
      id: 'devsecops',
      icon: <Shield size={24} />,
      title: 'DevSecOps & Compliance',
      problem: 'Credentials checked into repositories, outdated packages in container images, and unsecured pipelines violate audit requirements and risk data leaks.',
      approach: 'We secure pipelines by inserting static (SonarQube) and dynamic vulnerability scanners. We integrate secret scanning tools (Gitleaks) and store API keys and certificates strictly inside Azure Key Vault.',
      benefits: 'Automated compliance validation, prevention of credential exposures, and secure, signed container deployments.'
    },
    {
      id: 'infra-automation',
      icon: <Terminal size={24} />,
      title: 'Infrastructure Automation',
      problem: 'Manual creation of servers, databases, and networks leads to configuration drift, making it impossible to reproduce environments for testing or disaster recovery.',
      approach: 'We convert all infrastructure components into modular, reusable Terraform blueprints and Ansible playbooks. All infrastructure changes are reviewed via PRs and provisioned through pipelines.',
      benefits: 'Complete elimination of configuration drift, instant replication of testing environments, and 100% auditable infrastructure changes.'
    },
    {
      id: 'cloud-migration',
      icon: <ArrowRight size={24} />,
      title: 'Cloud Migration & Modernization',
      problem: 'Migrating legacy workloads to the cloud without restructuring results in high VM run-costs and fails to leverage cloud-native scalability.',
      approach: 'We guide migrations using a container-first strategy. We assess on-premises resources, containerize web applications, and transition databases to cloud-managed servers with minimal replication downtime.',
      benefits: 'Zero VM-lock in, modern scalable architectures, and immediate cost savings through container density.'
    },
    {
      id: 'app-modernization',
      icon: <RefreshCcw size={24} />,
      title: 'Application Modernization',
      problem: 'Monolithic legacy systems are slow to compile, difficult to scale independently, and suffer from high regression rates during simple bug fixes.',
      approach: 'We refactor monolithic applications into decoupled microservices. We run these microservices inside Docker containers managed by Kubernetes, deploying lightweight API gateways for communication.',
      benefits: 'Independent service scaling, isolated failure domains, faster build speeds, and rapid feature releases.'
    },
    {
      id: 'monitoring-observability',
      icon: <Activity size={24} />,
      title: 'Monitoring & Observability',
      problem: 'Ops teams discover outages only when users complain, and finding the root cause takes hours due to missing logs and fragmented dashboard views.',
      approach: 'We build an integrated monitoring stack using Prometheus, Grafana, and ElasticSearch. We collect application traces (OpenTelemetry) and logs to build a single operational pane with alert routing.',
      benefits: 'Immediate MTTR (Mean Time to Resolution) reduction, proactive alert notification, and historical performance visibility.'
    },
    {
      id: 'production-reliability',
      icon: <Server size={24} />,
      title: 'Production Reliability',
      problem: 'Unstable systems suffer from frequent restarts, API latency spikes, database locks, and pipeline failures, draining engineering resources.',
      approach: 'We establish Site Reliability Engineering (SRE) principles: we define SLOs/SLIs, configure custom health checks, set up backup snapshots, and perform disaster recovery simulation dry-runs.',
      benefits: 'Guaranteed application uptime, resilient database failover configurations, and clean root-cause incident analysis.'
    }
  ];

  return (
    <div id="solutions-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <span style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase' }}>
            Engineering Answers
          </span>
          <h1 style={{ marginTop: '0.5rem' }}>Infrastructure & DevOps Solutions</h1>
          <p>
            Standardized technical approaches designed to resolve reliability, speed, security, and scalability bottlenecks.
          </p>
        </div>
      </div>

      {/* Solutions Grid */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {solutionsList.map((sol) => (
              <div 
                key={sol.id} 
                id={sol.id} 
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--border-radius-lg)',
                  padding: '3rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: 'var(--border-radius-md)',
                    backgroundColor: 'rgba(0, 240, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)'
                  }}>
                    {sol.icon}
                  </div>
                  <h3 style={{ fontSize: '1.75rem', margin: 0 }}>{sol.title}</h3>
                </div>

                <div className="grid-3" style={{ gap: '2rem' }}>
                  <div style={{ borderRight: '1px solid var(--border-color)', paddingRight: '1.5rem' }}>
                    <h4 style={{ color: 'var(--error)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      ● The Problem
                    </h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                      {sol.problem}
                    </p>
                  </div>

                  <div style={{ borderRight: '1px solid var(--border-color)', paddingRight: '1.5rem' }}>
                    <h4 style={{ color: 'var(--accent-cyan)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      ● Our Approach
                    </h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                      {sol.approach}
                    </p>
                  </div>

                  <div>
                    <h4 style={{ color: 'var(--success)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      ● Business Benefits
                    </h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                      {sol.benefits}
                    </p>
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
          <h2>Ready to Modernize Your Operations?</h2>
          <p>
            Schedule an architectural review with our cloud engineers and discuss a transition plan for your applications.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/contact')}>
            Schedule Review <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};
