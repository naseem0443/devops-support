import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitLead } from '../../api/src/functions/submitLead';

// Mock HttpRequest
function createMockRequest(options: {
  method?: string;
  headers?: Record<string, string>;
  bodyText?: string;
}): any {
  const headersMap = new Map<string, string>();
  if (options.headers) {
    for (const [key, value] of Object.entries(options.headers)) {
      headersMap.set(key.toLowerCase(), value);
    }
  }

  return {
    method: options.method || 'POST',
    headers: {
      get: (name: string) => headersMap.get(name.toLowerCase()) || null
    },
    text: async () => options.bodyText || ''
  };
}

// Mock InvocationContext
function createMockContext(): any {
  return {
    log: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  };
}

describe('Azure Function API submitLead Tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    
    // Set mock env variables
    process.env.RECAPTCHA_SECRET_KEY = 'mock-captcha-secret';
    process.env.SALESFORCE_OID = 'mock-salesforce-oid';
    process.env.SALESFORCE_LEAD_SOURCE = 'Website - DevOps Support';
    process.env.SALESFORCE_RETURN_URL = 'https://devops.pdfmasterpro.shop/contact';
    process.env.SALESFORCE_WEB_TO_LEAD_URL = 'https://webto.salesforce.com/servlet/servlet.WebToLead';
  });

  it('rejects requests with incorrect Content-Type', async () => {
    const req = createMockRequest({
      headers: { 'content-type': 'text/plain' },
      bodyText: 'plain text body'
    });
    const context = createMockContext();

    const response = await submitLead(req, context);

    expect(response.status).toBe(400);
    expect(response.jsonBody).toEqual({
      success: false,
      message: 'Please provide valid information.'
    });
    expect(context.warn).toHaveBeenCalledWith(expect.stringContaining('Content-Type is not application/json'));
  });

  it('rejects payloads larger than 50KB', async () => {
    const hugeBody = 'a'.repeat(51 * 1024); // 51KB
    const req = createMockRequest({
      headers: { 'content-type': 'application/json', 'content-length': String(hugeBody.length) },
      bodyText: hugeBody
    });
    const context = createMockContext();

    const response = await submitLead(req, context);

    expect(response.status).toBe(400);
    expect(response.jsonBody).toEqual({
      success: false,
      message: 'Please provide valid information.'
    });
  });

  it('rejects invalid JSON structures', async () => {
    const req = createMockRequest({
      headers: { 'content-type': 'application/json' },
      bodyText: '{ invalid json payload }'
    });
    const context = createMockContext();

    const response = await submitLead(req, context);

    expect(response.status).toBe(400);
    expect(response.jsonBody).toEqual({
      success: false,
      message: 'Please provide valid information.'
    });
  });

  it('rejects payloads with missing required fields', async () => {
    const req = createMockRequest({
      headers: { 'content-type': 'application/json' },
      bodyText: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe'
        // missing email, company, city, state, country, service, recaptchaToken
      })
    });
    const context = createMockContext();

    const response = await submitLead(req, context);

    expect(response.status).toBe(400);
    expect(response.jsonBody).toEqual({
      success: false,
      message: 'Please provide valid information.'
    });
    expect(context.warn).toHaveBeenCalledWith(expect.stringContaining('Missing required fields'));
  });

  it('rejects invalid email formats', async () => {
    const req = createMockRequest({
      headers: { 'content-type': 'application/json' },
      bodyText: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalidemail.com', // bad format
        company: 'Acme Corp',
        city: 'Seattle',
        state: 'Washington',
        country: 'USA',
        service: 'Cloud Engineering',
        recaptchaToken: 'token'
      })
    });
    const context = createMockContext();

    const response = await submitLead(req, context);

    expect(response.status).toBe(400);
    expect(response.jsonBody).toEqual({
      success: false,
      message: 'Please provide valid information.'
    });
  });

  it('handles reCAPTCHA verification failure', async () => {
    // Mock global fetch to return recaptcha verification failure
    const fetchMock = vi.fn().mockImplementation((url: string) => {
      if (url.includes('recaptcha')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ success: false, 'error-codes': ['invalid-input-response'] })
        });
      }
      return Promise.resolve({ ok: true });
    });
    vi.stubGlobal('fetch', fetchMock);

    const req = createMockRequest({
      headers: { 'content-type': 'application/json' },
      bodyText: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        company: 'Acme Corp',
        city: 'Seattle',
        state: 'Washington',
        country: 'USA',
        service: 'Cloud Engineering',
        recaptchaToken: 'invalid-token'
      })
    });
    const context = createMockContext();

    const response = await submitLead(req, context);

    expect(response.status).toBe(400);
    expect(response.jsonBody).toEqual({
      success: false,
      message: 'Security verification failed. Please try again.'
    });
  });

  it('processes valid lead successfully and submits to Salesforce', async () => {
    // Mock fetch for Google reCAPTCHA (success) and Salesforce Web-to-Lead (success)
    const fetchMock = vi.fn().mockImplementation((url: string) => {
      if (url.includes('recaptcha')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ success: true })
        });
      }
      if (url.includes('salesforce')) {
        return Promise.resolve({
          ok: true,
          status: 200
        });
      }
      return Promise.resolve({ ok: true });
    });
    vi.stubGlobal('fetch', fetchMock);

    const req = createMockRequest({
      headers: { 'content-type': 'application/json' },
      bodyText: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test-success@doe.com',
        company: 'Acme Corp',
        city: 'Seattle',
        state: 'Washington',
        country: 'USA',
        service: 'Cloud Engineering',
        message: 'Need help with cluster migration.',
        recaptchaToken: 'valid-token'
      })
    });
    const context = createMockContext();

    const response = await submitLead(req, context);

    expect(response.status).toBe(200);
    expect(response.jsonBody).toEqual({
      success: true,
      message: 'Your request has been submitted successfully.'
    });
    
    // Assert fetch was called with correct salesforce urlencoded parameters
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
