# Security Policy & Guidelines

## DevSecOps Design Standards

This repository adheres to strict security standards to protect client data, API endpoints, and cloud infrastructure:

1. **Secrets Management**: No API tokens, keys, certificates, or Salesforce credentials may be checked into Git. Use environment configurations locally (excluded via `.gitignore`) and Key Vault references in production.
2. **Access Control**: Workflows use OpenID Connect (OIDC) with Microsoft Entra ID. No long-lived service principal client secrets are generated.
3. **Least Privilege**: The User Assigned Managed Identity (UAMI) is assigned the **Key Vault Secrets User** role only on the specific production Key Vault.
4. **Input Validation**: All API arguments are validated for format (e.g., email syntax) and sanitized to strip HTML or script tags, mitigating cross-site scripting (XSS) risks.
5. **Payload Size Enforcement**: Requests exceeding 50KB are rejected to prevent memory exhaustion and denial-of-service (DoS) attempts.
6. **No Sensitive Telemetry**: Application Insights log events only track operational statuses. The Google reCAPTCHA token, Secret Key, Salesforce OID, and actual user payload elements are never written to logs.

---

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please do not open a public issue. Instead, report it directly to our security team:

1. Send an email to `security@pdfmasterpro.shop`.
2. Include a detailed description of the vulnerability, steps to reproduce, and a proof of concept if available.
3. We will acknowledge receipt of your report within 48 business hours and coordinate a fix before public disclosure.
