# Salesforce Web-to-Lead Configuration Guide

This guide explains how to configure **Salesforce Web-to-Lead** to securely capture service and support requests submitted from **DevOps Support**.

---

## 1. Enable Web-to-Lead in Salesforce

Ask your Salesforce Administrator to perform these steps in your Salesforce production org:

1. Log in to Salesforce with admin credentials.
2. In the top-right corner, click the gear icon and select **Setup**.
3. In the Quick Find search box, search for and select **Web-to-Lead**.
4. Click **Edit** and verify that **Web-to-Lead Enabled** is checked.
5. Click **Save**.

---

## 2. Obtain Required Salesforce Values

### A. Salesforce Organization ID (OID)
To find the unique ID of your organization:
1. In Setup, search for **Company Information** in the Quick Find box.
2. Locate the **Salesforce.com Organization ID** field (15-character string starting with `00D...`).
3. Store this value as `SALESFORCE_OID` in Azure Key Vault.

### B. Web-to-Lead Endpoint URL
* **Default Endpoint**: `https://webto.salesforce.com/servlet/servlet.WebToLead`
* Store this value as `SALESFORCE_WEB_TO_LEAD_URL` in Azure Key Vault.

### C. Lead Source
* Set up a Lead Source value matching `Website - DevOps Support` inside the Lead Picklist settings.
* Store this value as `SALESFORCE_LEAD_SOURCE` in Azure Key Vault.

### D. Return URL (retURL)
* The default contact form redirect address: `https://devops.pdfmasterpro.shop/contact`
* Store this value as `SALESFORCE_RETURN_URL` in Azure Key Vault.

---

## 3. Field Mapping Details

Our Azure Function translates the JSON request received from the React frontend into standard Salesforce form fields:

| React Input Field | Salesforce Target Name | Description / Values |
| :--- | :--- | :--- |
| `firstName` | `first_name` | Contact first name |
| `lastName` | `last_name` | Contact last name |
| `email` | `email` | Standard email address validation format |
| `company` | `company` | Organization name |
| `city` | `city` | Location city |
| `state` | `state_code` | State / Province code |
| `country` | `country_code` | Country |
| `service` | Configurable (e.g. `service`) | Target field representing requested services |
| `message` | `description` | Additional request details or project context |

---

## 4. Custom Field Mappings (Important)

If your Salesforce administrator wants to capture the **Service Required** value in a custom field:

1. Create a custom picklist field on the **Lead** object (e.g., `Service_Required__c`).
2. Add picklist values matching:
   - `Cloud Engineering`
   - `Kubernetes Support`
   - `CI/CD Automation`
   - `Terraform / Infrastructure as Code`
   - `DevSecOps`
   - `Monitoring & Observability`
   - `Production Support`
   - `Cloud Migration`
   - `Application Modernization`
   - `Other`
3. Map the custom field API name in the Azure Function Application settings by adding:
   - Name: `SALESFORCE_SERVICE_FIELD_NAME`
   - Value: `<YOUR_CUSTOM_FIELD_ID>` (e.g. `Service_Required__c`)

---

## 5. Troubleshooting & Validation

Web-to-Lead submissions are silent. If leads are not appearing:

1. **Check Lead Queue Rules**: Verify if active lead assignment rules are routing incoming leads to a queue instead of your standard dashboard view.
2. **Review Validation Rules**: Ensure there are no validation rules on the Lead object that require fields not supplied by our API (e.g., Phone number required).
3. **Debug Logs**: Search Salesforce **Setup -> Debug Logs** to trace if the API user or system triggers are rejecting incoming payloads.
