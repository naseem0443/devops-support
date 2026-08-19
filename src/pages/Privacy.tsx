import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div id="privacy-page">
      <div className="page-header">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Last updated: August 20, 2026</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="prose">
            <p>
              At DevOps PDFMasterPro, we respect your privacy and are committed to protecting any personal information you provide when using our website and contacting our team.
            </p>

            <h3>1. Information Collection</h3>
            <p>
              When you submit a DevOps Support or Professional Services request through our Contact Form, we collect the information you explicitly provide:
            </p>
            <ul>
              <li>First Name and Last Name</li>
              <li>Email Address</li>
              <li>Company Name</li>
              <li>Location Details (City, Country, State/Province)</li>
              <li>The Service Required and your optional message details</li>
            </ul>

            <h3>2. Information Usage</h3>
            <p>
              The personal data collected is used solely to respond to your support request and manage our professional relationship with you. We utilize the information to:
            </p>
            <ul>
              <li>Understand your DevOps and cloud engineering needs.</li>
              <li>Provide custom project estimates and schedule support reviews.</li>
              <li>Deliver requested technical assistance.</li>
            </ul>

            <h3>3. Third-Party Integrations & Processing</h3>
            <p>
              To process your request securely and automate lead management, your information is processed as follows:
            </p>
            <ul>
              <li>
                <strong>Google reCAPTCHA v2:</strong> Submissions are verified through Google reCAPTCHA to prevent spam and denial-of-service attempts. Your interaction is subject to Google\'s privacy policies.
              </li>
              <li>
                <strong>Salesforce Web-to-Lead:</strong> Verified requests are safely forwarded to our Salesforce instance for CRM tracking. No credentials, tokens, or security keys are stored alongside your lead.
              </li>
            </ul>

            <h3>4. Security Controls</h3>
            <p>
              We implement industry-standard security measures to safeguard your submissions. Data sent between your browser and our backend is encrypted using Transport Layer Security (HTTPS). All API calls are validated, sanitized, and filtered for malicious script payloads.
            </p>

            <h3>5. Contact Information</h3>
            <p>
              If you have any questions regarding this Privacy Policy or wish to request the removal of your lead record, please submit a request through our Contact Page.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
