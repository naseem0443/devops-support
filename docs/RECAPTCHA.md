# Google reCAPTCHA v2 Configuration Guide

To protect the contact form from spam, bots, and automated submission flooding, **DevOps PDFMasterPro** utilizes **Google reCAPTCHA v2 Checkbox ("I'm not a robot")**.

---

## 1. Register with Google reCAPTCHA

To obtain keys:

1. Open the [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin).
2. Log in with a Google Workspace or Gmail account.
3. Click the **Register new site** (+) button.
4. Fill in the registration form:
   - **Label**: `DevOps PDFMasterPro Production`
   - **reCAPTCHA type**: Select **reCAPTCHA v2** and then **"I'm not a robot" Checkbox**.
   - **Domains**: Add the following domains (do not include paths or protocols):
     - `devops.pdfmasterpro.shop` (Production domain)
     - `localhost` (Local development environment testing)
     * *Note: Avoid wildcard domain structures for security purposes.*
5. Accept the Terms of Service.
6. Click **Submit**.

---

## 2. Obtain Credentials

After submission, Google will output:

1. **Site Key** (Public): Used in the React frontend.
2. **Secret Key** (Private): Used securely by the Azure Function.

---

## 3. Environment Variable Injection

### A. Frontend Setup (Public)
Add the Site Key to your frontend environment configuration:
- Local development `.env` file:
  ```env
  VITE_RECAPTCHA_SITE_KEY=<YOUR_RECAPTCHA_SITE_KEY>
  ```
- Make sure to load this key into the build environment when deploying to Azure Static Web Apps.

### B. Backend Setup (Protected Key Vault)
The Secret Key must **never** be checked into version control or rendered in client-side code.
1. Save the key in your **Azure Key Vault**:
   - Secret Name: `RECAPTCHA-SECRET-KEY`
   - Value: `<YOUR_RECAPTCHA_SECRET_KEY>`
2. The Azure Function loads this key via Key Vault references under the AppSettings variable name: `RECAPTCHA_SECRET_KEY`.

---

## 4. How Verification Works

1. The visitor clicks the reCAPTCHA checkbox.
2. Google generates a verification token (`recaptchaToken`) on success.
3. The frontend submits the token inside the JSON payload to the Azure Function.
4. The Azure Function posts the token to Google's server:
   - Endpoint: `https://www.google.com/recaptcha/api/siteverify`
   - Body Parameters: `secret=<RECAPTCHA_SECRET_KEY>&response=<recaptchaToken>`
5. Google returns a JSON validation score. If successful, our function proceeds to Salesforce Web-to-Lead submission.
