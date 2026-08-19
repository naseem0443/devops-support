import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { verifyRecaptcha } from '../services/recaptcha';
import { submitToSalesforce } from '../services/salesforce';
import { validateRequiredFields, isValidEmail, sanitizeRequestBody, LeadRequest } from '../utils/validation';
import { isDuplicateSubmission, registerSubmission } from '../utils/cache';

export async function submitLead(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log('[API] Processing lead submission request.');

  try {
    // 1. Validate Content-Type
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      context.warn('[API] Validation failed: Content-Type is not application/json');
      return {
        status: 400,
        jsonBody: {
          success: false,
          message: 'Please provide valid information.'
        }
      };
    }

    // 2. Validate request size limit (50KB)
    const contentLengthHeader = request.headers.get('content-length');
    if (contentLengthHeader) {
      const length = parseInt(contentLengthHeader, 10);
      if (isNaN(length) || length > 50 * 1024) {
        context.warn(`[API] Validation failed: Request size ${length} exceeds 50KB limit`);
        return {
          status: 400,
          jsonBody: {
            success: false,
            message: 'Please provide valid information.'
          }
        };
      }
    }

    // Read body text first to verify actual character length
    const rawBody = await request.text();
    if (rawBody.length > 50 * 1024) {
      context.warn(`[API] Validation failed: Parsed body character length exceeds 50KB limit`);
      return {
        status: 400,
        jsonBody: {
          success: false,
          message: 'Please provide valid information.'
        }
      };
    }

    // 3. Validate JSON structure
    let body: any;
    try {
      body = JSON.parse(rawBody);
    } catch (parseError) {
      context.warn('[API] Validation failed: JSON parse error');
      return {
        status: 400,
        jsonBody: {
          success: false,
          message: 'Please provide valid information.'
        }
      };
    }

    // 4. Validate required fields
    const missingFields = validateRequiredFields(body);
    if (missingFields.length > 0) {
      context.warn(`[API] Validation failed: Missing required fields: ${missingFields.join(', ')}`);
      return {
        status: 400,
        jsonBody: {
          success: false,
          message: 'Please provide valid information.'
        }
      };
    }

    const leadReq = body as LeadRequest;

    // 5. Validate email syntax format
    if (!isValidEmail(leadReq.email)) {
      context.warn(`[API] Validation failed: Email format invalid: ${leadReq.email}`);
      return {
        status: 400,
        jsonBody: {
          success: false,
          message: 'Please provide valid information.'
        }
      };
    }

    // 6. Sanitize inputs
    const sanitizedPayload = sanitizeRequestBody(leadReq);

    // 7. Validate reCAPTCHA token server-side
    const isCaptchaValid = await verifyRecaptcha(sanitizedPayload.recaptchaToken);
    if (!isCaptchaValid) {
      context.warn('[API] Security verification failed: Invalid Google reCAPTCHA');
      return {
        status: 400,
        jsonBody: {
          success: false,
          message: 'Security verification failed. Please try again.'
        }
      };
    }

    // 8. Check duplicate submission (composite key email + company, 5-minute window)
    const isDuplicate = isDuplicateSubmission(sanitizedPayload.email, sanitizedPayload.company);
    if (isDuplicate) {
      return {
        status: 409,
        jsonBody: {
          success: false,
          message: 'Your request was already submitted recently.'
        }
      };
    }

    // 9. Submit to Salesforce Web-to-Lead
    const salesforceSuccess = await submitToSalesforce(sanitizedPayload);
    if (!salesforceSuccess) {
      return {
        status: 502,
        jsonBody: {
          success: false,
          message: 'Unable to submit your request. Please try again later.'
        }
      };
    }

    // 10. Register successfully processed lead to duplicate cache
    registerSubmission(sanitizedPayload.email, sanitizedPayload.company);

    // 11. Return safe response
    return {
      status: 200,
      jsonBody: {
        success: true,
        message: 'Your request has been submitted successfully.'
      }
    };

  } catch (error) {
    context.error('[API] Server Error encountered during submitLead process:', error);
    return {
      status: 500,
      jsonBody: {
        success: false,
        message: 'Unable to process your request. Please try again later.'
      }
    };
  }
}

// Register the HTTP trigger
app.http('submitLead', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'submitLead',
  handler: submitLead
});
