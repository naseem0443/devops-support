# Azure Cloud Architecture Setup Guide

This document explains the steps to provision and configure the production Azure cloud infrastructure for **DevOps Support**.

## Architecture Components

1. **Resource Group**: `rg-devops-support-prod`
2. **Azure Static Web App (SWA)**: `swa-devops-support-prod`
3. **Azure Function App**: `func-devops-support-prod`
4. **User Assigned Managed Identity (UAMI)**: `func-devops-support-prod-uami`
5. **Azure Key Vault**: `kv-devops-support-prod-01`
6. **Application Insights**: Combined monitoring and logging sink.

---

## 1. Azure Shell Login & Environment Variables

Open your terminal or Azure Cloud Shell and run:

```bash
# Log in to your Azure account
az login

# List subscriptions and select the production subscription
az account list --output table
az account set --subscription "<SUBSCRIPTION_ID>"

# Define configuration environment variables
export SUBSCRIPTION_ID="<SUBSCRIPTION_ID>"
export TENANT_ID="<TENANT_ID>"
export LOCATION="eastus" # Choose your closest supported region
export RESOURCE_GROUP="rg-devops-support-prod"
export KEY_VAULT="kv-devops-support-prod-01"
export MANAGED_IDENTITY="func-devops-support-prod-uami"
export FUNCTION_APP="func-devops-support-prod"
export STATIC_WEB_APP="swa-devops-support-prod"
```

---

## 2. Resource Group Creation

Create a centralized resource group to contain all the application dependencies:

```bash
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION
```

---

## 3. Provision Key Vault

Create a secure Key Vault to store reCAPTCHA secret keys and Salesforce credentials:

```bash
az keyvault create \
  --name $KEY_VAULT \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --enable-rbac-authorization true # Enforces modern Azure RBAC control
```

---

## 4. Create User Assigned Managed Identity (UAMI)

Create a dedicated identity for the Function App rather than using long-lived secrets:

```bash
# Create the identity
az identity create \
  --name $MANAGED_IDENTITY \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION

# Fetch the client ID and principal ID of the created identity
export UAMI_PRINCIPAL_ID=$(az identity show --name $MANAGED_IDENTITY --resource-group $RESOURCE_GROUP --query principalId --output tsv)
export UAMI_RESOURCE_ID=$(az identity show --name $MANAGED_IDENTITY --resource-group $RESOURCE_GROUP --query id --output tsv)
```

---

## 5. Configure Key Vault RBAC Roles

Assign the **Key Vault Secrets User** role to the Managed Identity principal to allow it to read parameters:

```bash
# Get Key Vault Scope ID
export KV_SCOPE=$(az keyvault show --name $KEY_VAULT --resource-group $RESOURCE_GROUP --query id --output tsv)

# Assign Role: Key Vault Secrets User (ID: 4633f12f-17de-408a-b874-0445c86b69e6)
az role assignment create \
  --role "Key Vault Secrets User" \
  --assignee-object-id $UAMI_PRINCIPAL_ID \
  --assignee-principal-type "ServicePrincipal" \
  --scope $KV_SCOPE
```

---

## 6. Store Application Secrets

Inject configurations securely into Key Vault:

```bash
# 1. Google reCAPTCHA Secret Key
az keyvault secret set --vault-name $KEY_VAULT --name "RECAPTCHA-SECRET-KEY" --value "<YOUR_RECAPTCHA_SECRET_KEY>"

# 2. Salesforce Organization ID
az keyvault secret set --vault-name $KEY_VAULT --name "SALESFORCE-OID" --value "<YOUR_SALESFORCE_OID>"

# 3. Salesforce Web-To-Lead Endpoint URL
az keyvault secret set --vault-name $KEY_VAULT --name "SALESFORCE-WEB-TO-LEAD-URL" --value "https://webto.salesforce.com/servlet/servlet.WebToLead"

# 4. Salesforce Lead Source
az keyvault secret set --vault-name $KEY_VAULT --name "SALESFORCE-LEAD-SOURCE" --value "Website - DevOps Support"

# 5. Salesforce Success Redirect URL
az keyvault secret set --vault-name $KEY_VAULT --name "SALESFORCE-RETURN-URL" --value "https://devops.pdfmasterpro.shop/contact"
```

---

## 7. Provision Azure Function App (Linux Node.js)

Deploy the backend Function App. Ensure it is configured with Application Insights and the Managed Identity:

```bash
# Create storage account for Function App internal states
export STORAGE_ACCOUNT="stdevopspdfmp1" # Must be globally unique, 3-24 alphanumeric
az storage account create \
  --name $STORAGE_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku Standard_LRS

# Create Application Insights resource
az monitor app-insights component create \
  --app "insights-$FUNCTION_APP" \
  --location $LOCATION \
  --resource-group $RESOURCE_GROUP \
  --kind web \
  --application-type web

export INSIGHTS_CONNECTION_STRING=$(az monitor app-insights component show --app "insights-$FUNCTION_APP" --resource-group $RESOURCE_GROUP --query connectionString --output tsv)

# Create the Function App on Linux running Node 20 with User Assigned Managed Identity
az functionapp create \
  --name $FUNCTION_APP \
  --resource-group $RESOURCE_GROUP \
  --storage-account $STORAGE_ACCOUNT \
  --consumption-plan-location $LOCATION \
  --runtime node \
  --runtime-version 20 \
  --functions-version 4 \
  --os-type Linux \
  --assign-identity $UAMI_RESOURCE_ID \
  --app-insights-key $INSIGHTS_CONNECTION_STRING
```

---

## 8. Link Key Vault References to Function App Settings

Map settings to load secret contents from Key Vault using the Managed Identity context:

```bash
# Enable the Azure Function to use the User Assigned identity for Vault reference resolution
# Note: Set credentials target to the identity resource ID
az functionapp identity set \
  --name $FUNCTION_APP \
  --resource-group $RESOURCE_GROUP \
  --user-assigned $UAMI_RESOURCE_ID

# Set Function App Configuration AppSettings pointing to Key Vault secret references
az functionapp config appsettings set --name $FUNCTION_APP --resource-group $RESOURCE_GROUP --settings \
  RECAPTCHA_SECRET_KEY="@Microsoft.KeyVault(SecretUri=https://$KEY_VAULT.vault.azure.net/secrets/RECAPTCHA-SECRET-KEY/)" \
  SALESFORCE_OID="@Microsoft.KeyVault(SecretUri=https://$KEY_VAULT.vault.azure.net/secrets/SALESFORCE-OID/)" \
  SALESFORCE_WEB_TO_LEAD_URL="@Microsoft.KeyVault(SecretUri=https://$KEY_VAULT.vault.azure.net/secrets/SALESFORCE-WEB-TO-LEAD-URL/)" \
  SALESFORCE_LEAD_SOURCE="@Microsoft.KeyVault(SecretUri=https://$KEY_VAULT.vault.azure.net/secrets/SALESFORCE-LEAD-SOURCE/)" \
  SALESFORCE_RETURN_URL="@Microsoft.KeyVault(SecretUri=https://$KEY_VAULT.vault.azure.net/secrets/SALESFORCE-RETURN-URL/)"
```

---

## 9. CORS Policy Setup

Restrict CORS access on the Azure Function to your frontend origin only:

```bash
# Remove wildcard if present
az functionapp cors remove --name $FUNCTION_APP --resource-group $RESOURCE_GROUP --allowed-origins "*"

# Add production custom domain
az functionapp cors add --name $FUNCTION_APP --resource-group $RESOURCE_GROUP --allowed-origins "https://devops.pdfmasterpro.shop"

# Add local dev domain
az functionapp cors add --name $FUNCTION_APP --resource-group $RESOURCE_GROUP --allowed-origins "http://localhost:5173"
```

---

## 10. Provision Azure Static Web App

Create the Static Web App hosting React assets:

```bash
az staticwebapp create \
  --name $STATIC_WEB_APP \
  --resource-group $RESOURCE_GROUP \
  --location "eastus2" \
  --branch "main" \
  --repo-url "https://github.com/<GITHUB_OWNER>/<GITHUB_REPOSITORY>" \
  --login-with-github
```

Copy the deployment API token returned by the command and configure it as a GitHub Repository secret: `AZURE_STATIC_WEB_APPS_API_TOKEN`.

---

## 11. Custom Domain & DNS Mapping

To link `devops.pdfmasterpro.shop` to your Static Web App:

1. In the Azure Portal, navigate to your Static Web App `swa-devops-support-prod`.
2. Under **Custom Domains**, click **Add** and select **Custom domain on other DNS**.
3. Enter `devops.pdfmasterpro.shop`.
4. Azure will output DNS mapping instructions:
   - Create a **CNAME** record pointing `devops.pdfmasterpro.shop` to the auto-generated Static Web App default domain (e.g. `*.azurestaticapps.net`).
5. Configure this record in your external Domain Name Registrar (GoDaddy, Namecheap, Cloudflare, etc.).
6. Click **Validate** in the Azure Portal. Once DNS resolves, Azure generates a free SSL certificate and enforces HTTPS automatically.
