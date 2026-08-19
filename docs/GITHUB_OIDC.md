# GitHub Actions OIDC Authentication Setup Guide

This guide explains how to configure passwordless deployment authentication using **GitHub OpenID Connect (OIDC)** and **Microsoft Entra ID Federated Credentials**. This secures deployment pipelines by removing the need for long-lived Azure service principal passwords.

---

## Architecture Flow

```
GitHub Actions Pipeline
  │
  ├─► 1. Requests OIDC token from GitHub Token Service
  │
  ├─► 2. Authenticates to Entra ID using OIDC JWT
  │
  ├─► 3. Entra ID matches Federated Credential Rule
  │
  └─► 4. Grants short-lived access token mapping User Assigned Managed Identity permissions
```

---

## 1. Register Entra ID Application & Service Principal

Run the following commands in the Azure CLI to register a deployment service principal:

```bash
# 1. Create an Entra ID Application Registration
export APP_NAME="github-actions-devops-pdfmasterpro"
export APP_ID=$(az ad app create --display-name $APP_NAME --query appId --output tsv)

# 2. Create a Service Principal associated with the App
az ad sp create --id $APP_ID
```

---

## 2. Configure Federated Credential

Link your GitHub repository's main branch to the Entra ID application registration by creating a federated credential.

### Federated Credential Values
- **Issuer**: `https://token.actions.githubusercontent.com`
- **Audience**: `api://AzureADTokenExchange`
- **Subject Identifier**: `repo:<GITHUB_OWNER>/<GITHUB_REPOSITORY>:ref:refs/heads/main`
- **Name**: `github-actions-main-deploy`

```bash
# Create federated credential json template
cat <<EOF > federated-credential.json
{
  "name": "github-actions-main-deploy",
  "issuer": "https://token.actions.githubusercontent.com",
  "subject": "repo:<GITHUB_OWNER>/<GITHUB_REPOSITORY>:ref:refs/heads/main",
  "description": "Federated credential for GitHub deployment workflows running on main branch",
  "audiences": [
    "api://AzureADTokenExchange"
  ]
}
EOF

# Create the credential inside the app registration
# Note: Replace GITHUB_OWNER and GITHUB_REPOSITORY in the JSON file with your actual repository owner and repository names first.
az ad app federated-credential create \
  --id $APP_ID \
  --parameters federated-credential.json
```

---

## 3. Assign Deployment Role Permissions (Least Privilege)

Assign the service principal permissions to deploy to your Azure Function and Static Web App:

```bash
# Get resource group scope ID
export RG_ID=$(az group show --name rg-devops-pdfmasterpro-prod --query id --output tsv)

# Assign 'Contributor' role on the Resource Group scope
# This allows the pipeline to update and deploy Function App packages and swap domains
az role assignment create \
  --role "Contributor" \
  --assignee $APP_ID \
  --scope $RG_ID
```

---

## 4. Configure GitHub Action Secrets

In your GitHub repository settings, navigate to **Settings -> Secrets and variables -> Actions**, and add the following repository secrets:

1. `AZURE_CLIENT_ID`: The Entra ID Application Client ID (`$APP_ID` output value).
2. `AZURE_TENANT_ID`: Your Azure Active Directory Tenant ID.
3. `AZURE_SUBSCRIPTION_ID`: Your Azure Subscription ID.
4. `AZURE_STATIC_WEB_APPS_API_TOKEN`: The API deployment token retrieved during SWA creation.

---

## 5. Workflow Verification

Your workflows utilize `azure/login@v2` with OIDC values. The GitHub Action runner verifies identity using:

```yaml
permissions:
  id-token: write # Required for requesting OIDC JWT
  contents: read  # Required for checkout

steps:
  - name: Azure Login
    uses: azure/login@v2
    with:
      client-id: ${{ secrets.AZURE_CLIENT_ID }}
      tenant-id: ${{ secrets.AZURE_TENANT_ID }}
      subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
```
This grants the runner Contributor access to the resource group for deployment operations.
