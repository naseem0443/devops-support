import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div id="terms-page">
      <div className="page-header">
        <div className="container">
          <h1>Terms of Service</h1>
          <p>Last updated: August 20, 2026</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="prose">
            <div className="alert-box alert-error" style={{ marginBottom: '2rem' }}>
              <div>
                <strong>Legal Notice for Site Owner:</strong> These terms are standard placeholders for template guidance. They must be reviewed and audited by your legal advisor prior to launching this website to production.
              </div>
            </div>

            <p>
              Welcome to the website of DevOps PDFMasterPro ("we", "us", "our"). By accessing or using our website located at https://devops.pdfmasterpro.shop and submitting service requests, you agree to comply with and be bound by the following Terms of Service.
            </p>

            <h3>1. Use of the Site</h3>
            <p>
              You agree to use this site strictly for lawful purposes. You must not use this website to submit spam, transmit malicious files (including viruses or scripts), attempt SQL or JSON injections, or attempt unauthorized access to our backend Azure Functions or Key Vault systems.
            </p>

            <h3>2. Service Requests & Accuracy</h3>
            <p>
              By submitting a service or support request, you agree that:
            </p>
            <ul>
              <li>The information provided in the contact form is accurate, complete, and active.</li>
              <li>You are authorized to request technical support on behalf of your named organization.</li>
              <li>You will not submit duplicate requests within a short timeframe (our system filters duplicate submissions).</li>
            </ul>

            <h3>3. Limitations of Liability</h3>
            <p>
              All general information, diagrams, configurations, and technology options described on this website (such as CI/CD visualizers or Kubernetes diagrams) are provided for illustrative purposes only. They do not constitute formal architectural binding contracts.
            </p>
            <p>
              DevOps PDFMasterPro is not liable for errors in third-party integrations (including Google reCAPTCHA and Salesforce Web-to-Lead), nor are we responsible for configuration changes executed outside a signed Statement of Work.
            </p>

            <h3>4. Governing Law</h3>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which the business resides, without regard to conflict of law principles.
            </p>

            <h3>5. Updates to Terms</h3>
            <p>
              We reserve the right to modify these terms at any time. Changes will be posted to this page with an updated modification date. Your continued use of the site implies acceptance of the revised terms.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
