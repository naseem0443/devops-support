# Production Go-Live Deployment Checklist

Follow this step-by-step master checklist to deploy **DevOps Support** from scratch to production.

---

## Stage A: Code Base & Verification

- [ ] **Step 1**: Create a private GitHub repository named `<GITHUB_REPOSITORY>` under organization or owner `<GITHUB_OWNER>`.
- [ ] **Step 2**: Clone the repository locally and run the verify command on the frontend and backend workspaces:
  ```bash
  # Check frontend
  npm ci
  npm test
  npm run build

  # Check backend API
  cd api
  npm ci
  npm run build
  cd ..
  ```
- [ ] **Step 3**: Verify no secrets or configuration values are committed in `.env` files. Confirm that `.gitignore` successfully excludes `node_modules`, `.env`, and local settings files.

---

## Stage B: External Integration Registrations

- [ ] **Step 4**: Set up Google reCAPTCHA v2 (Checkbox) in the Google admin panel. Register the domain `devops.pdfmasterpro.shop` and retrieve the Site Key and Secret Key. (See [RECAPTCHA.md](file:///e:/AI-Website/Devops-Support/docs/RECAPTCHA.md)).
- [ ] **Step 5**: Set up Salesforce Web-to-Lead. Retrieve the 15-character Organization ID (OID) and set up Picklist values for the Lead object. (See [SALESFORCE.md](file:///e:/AI-Website/Devops-Support/docs/SALESFORCE.md)).

---

## Stage C: Cloud Infrastructure Provisioning

- [ ] **Step 6**: Log in to the Azure CLI and select the correct subscription:
  ```bash
  az login
  az account set --subscription "<SUBSCRIPTION_ID>"
  ```
- [ ] **Step 7**: Create the Resource Group `rg-devops-support-prod`.
- [ ] **Step 8**: Create the Azure Key Vault `kv-devops-support-prod-01` with RBAC authorization enabled.
- [ ] **Step 9**: Create the User Assigned Managed Identity (UAMI) `func-devops-support-prod-uami`.
- [ ] **Step 10**: Assign the **Key Vault Secrets User** role to the Managed Identity principal at the Key Vault scope. (See [AZURE_SETUP.md](file:///e:/AI-Website/Devops-Support/docs/AZURE_SETUP.md)).
- [ ] **Step 11**: Store the sensitive integration parameters inside Key Vault:
  - `RECAPTCHA-SECRET-KEY`
  - `SALESFORCE-OID`
  - `SALESFORCE-LEAD-SOURCE`
  - `SALESFORCE-WEB-TO-LEAD-URL`
  - `SALESFORCE-RETURN-URL`
- [ ] **Step 12**: Create a Storage Account for the Function App internal state and configure an Application Insights resource.
- [ ] **Step 13**: Create the Linux Node.js Azure Function App `func-devops-support-prod`.
- [ ] **Step 14**: Attach the Managed Identity `func-devops-support-prod-uami` to the Function App.
- [ ] **Step 15**: Configure the Function App Settings. Inject the `@Microsoft.KeyVault(...)` secret references for:
  - `RECAPTCHA_SECRET_KEY`
  - `SALESFORCE_OID`
  - `SALESFORCE_LEAD_SOURCE`
  - `SALESFORCE_WEB_TO_LEAD_URL`
  - `SALESFORCE_RETURN_URL`
- [ ] **Step 16**: Configure CORS policies on the Function App. Allow `https://devops.pdfmasterpro.shop` and restrict wildcard access.

---

## Stage D: CI/CD Pipeline Configuration

- [ ] **Step 17**: Register an Entra ID Application and configure **Federated Credentials** mapping GitHub OIDC tokens for the `main` branch. (See [GITHUB_OIDC.md](file:///e:/AI-Website/Devops-Support/docs/GITHUB_OIDC.md)).
- [ ] **Step 18**: Assign the service principal the **Contributor** role on the Resource Group scope.
- [ ] **Step 19**: Create the Static Web App `swa-devops-support-prod` and retrieve the API token.
- [ ] **Step 20**: In your GitHub repository, configure the deployment secrets:
  - `AZURE_CLIENT_ID`
  - `AZURE_TENANT_ID`
  - `AZURE_SUBSCRIPTION_ID`
  - `AZURE_STATIC_WEB_APPS_API_TOKEN`

---

## Stage E: Deploy & DNS Routing

- [ ] **Step 21**: Push code to the `main` branch. This triggers the Static Web App and Azure Function Action workflows. Verify that both pipelines execute successfully.
- [ ] **Step 22**: Map the custom domain `devops.pdfmasterpro.shop` to your Static Web App. Configure the CNAME pointer at your DNS provider and wait for SSL generation. (See [AZURE_SETUP.md](file:///e:/AI-Website/Devops-Support/docs/AZURE_SETUP.md)).
- [ ] **Step 23**: Configure the frontend environment variable in your Static Web App setting in the Azure portal (under Configuration):
  - `VITE_API_BASE_URL` -> `https://func-devops-support-prod.azurewebsites.net`
  - `VITE_RECAPTCHA_SITE_KEY` -> `<YOUR_RECAPTCHA_SITE_KEY>`

---

## Stage F: Verification & Launch

- [ ] **Step 24**: Navigate to the production URL: `https://devops.pdfmasterpro.shop/contact`.
- [ ] **Step 25**: Execute an end-to-end form test:
  - Fill out name, email, company, city, state, country, service, and message details.
  - Complete the reCAPTCHA checkbox.
  - Submit the form.
  - Assert that the success message appears.
  - Log in to Salesforce and confirm the new Lead record is created with matching fields and Lead Source parameter.
  - Review Azure Application Insights and confirm telemetry logs record safe events (e.g. CAPTCHA verified, Salesforce submission started) without secret leaks.
