# DevOps PDFMasterPro - Support Portal

A completely new production-ready cloud application and website serving as a DevOps, Cloud, and Kubernetes professional services request platform.

The application uses a React + Vite + TypeScript frontend deployed to Azure Static Web Apps, and a Node.js + TypeScript backend Azure Function. It integrates with Google reCAPTCHA v2 for security and Salesforce Web-to-Lead for CRM integration.

---

## 1. Final Production Architecture

```
                         INTERNET
                            │
                            ▼
                 devops.pdfmasterpro.shop
                            │
                            ▼
                 Azure Static Web App
                            │
                     Contact Form
                            │
                     Google reCAPTCHA
                            │
                            ▼
                  Azure Function App
                            │
             ┌──────────────┴──────────────┐
             │                             │
             ▼                             ▼
       Google reCAPTCHA             Azure Key Vault
        Verification                       │
             │                      Managed Identity
             │                             │
             └──────────────┬──────────────┘
                            │
                            ▼
                  Salesforce Web-to-Lead
                            │
                            ▼
                     Salesforce Lead
```

### Deployment Flow:
```
GitHub
  │
  │ GitHub Actions + OIDC
  ▼
Microsoft Entra ID
  │
  ▼
User Assigned Managed Identity
  │
  ├──────────────────────┐
  │                      │
  ▼                      ▼
Static Web App       Azure Function App
```

---

## 2. Features

- **DevOps Pipeline Visualizer**: Custom SVG flowchart displaying active build stages.
- **Service & Solutions Guides**: Structured lists covering cloud native engineering, Kubernetes platform design, and continuous integrations.
- **Secure Lead Submission Form**: Captures contact data, performs client-side syntax checks, and verifies submissions server-side.
- **Google reCAPTCHA Verification**: Verifies tokens server-side to block form spam.
- **Deduplication Cache**: Blocks duplicate requests from the same user within a 5-minute window.
- **Salesforce CRM Integration**: Safely submits leads to Salesforce Web-to-Lead using application/x-www-form-urlencoded formatting.
- **Passwordless deployment**: GitHub Action workflows deploy resources using OpenID Connect (OIDC) authentication.

---

## 3. Technology Stack

### Frontend:
- React 18, TypeScript, Vite
- Vanilla CSS (Aesthetics optimized for dark navy/blue theme, glassmorphism headers, cyan accents)
- React Router DOM

### Backend API:
- Azure Functions Node.js v4 Programming Model
- TypeScript, ES2022
- Application Insights telemetry

### Cloud & Infrastructure:
- Azure Static Web Apps
- Azure Function App (Linux Consumption)
- Azure Key Vault (RBAC model)
- User Assigned Managed Identity (UAMI)

---

## 4. Local Development Setup

To run and test the application locally, you need the following CLI tools installed:
- [Node.js v20+](https://nodejs.org/)
- [Azure Functions Core Tools v4](https://github.com/Azure/azure-functions-core-tools)

### A. Environment Configuration

1. **Frontend Environment**:
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:7071
   VITE_RECAPTCHA_SITE_KEY=<YOUR_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY>
   ```

2. **Backend Environment**:
   Create `api/local.settings.json`:
   ```json
   {
     "IsEncrypted": false,
     "Values": {
       "FUNCTIONS_WORKER_RUNTIME": "node",
       "AzureWebJobsStorage": "UseDevelopmentStorage=true",
       "RECAPTCHA_SECRET_KEY": "<YOUR_PRIVATE_GOOGLE_RECAPTCHA_SECRET_KEY>",
       "SALESFORCE_OID": "<YOUR_SALESFORCE_ORG_ID>",
       "SALESFORCE_LEAD_SOURCE": "Website - DevOps Support",
       "SALESFORCE_RETURN_URL": "https://devops.pdfmasterpro.shop/contact",
       "SALESFORCE_WEB_TO_LEAD_URL": "https://webto.salesforce.com/servlet/servlet.WebToLead"
     },
     "Host": {
       "CORS": "http://localhost:5173"
     }
   }
   ```

### B. Execution Instructions

1. **Start the Frontend**:
   ```bash
   # Run from root directory
   npm install
   npm run dev
   ```
   The site will load at `http://localhost:5173`.

2. **Start the Backend**:
   ```bash
   # Run from api directory
   cd api
   npm install
   npm run build
   func start
   ```
   The API will listen at `http://localhost:7071/api/submitLead`.

---

## 5. Automated Unit Testing

We use **Vitest** for testing both frontend and backend projects.

### Run Frontend Tests
```bash
# In the root workspace
npm test
```

### Run Backend API Tests
```bash
# In the root workspace
npm test --prefix api
```

---

## 6. Integration Documentation

Detailed guides are located inside the `docs/` folder:
- [Azure Setup Guide](file:///e:/AI-Website/Devops-Support/docs/AZURE_SETUP.md): Provision Key Vault, Function app, Storage, CORS, and Managed Identity.
- [Salesforce Web-to-Lead Guide](file:///e:/AI-Website/Devops-Support/docs/SALESFORCE.md): Field mappings and picklist parameters.
- [Google reCAPTCHA v2 Guide](file:///e:/AI-Website/Devops-Support/docs/RECAPTCHA.md): Key generation, domain restrictions, and validation.
- [GitHub Actions OIDC Authentication](file:///e:/AI-Website/Devops-Support/docs/GITHUB_OIDC.md): Entra ID Federated Credentials mapping.
- [Production Go-Live Checklist](file:///e:/AI-Website/Devops-Support/docs/DEPLOYMENT.md): Step-by-step master checklist.
