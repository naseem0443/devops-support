/**
 * Request validation and sanitization utilities.
 */

export interface LeadRequest {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  city: string;
  country: string;
  state: string;
  service: string;
  message: string;
  recaptchaToken: string;
}

/**
 * Validates that all required fields are present and not empty.
 */
export function validateRequiredFields(body: any): string[] {
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'company',
    'city',
    'country',
    'state',
    'service',
    'recaptchaToken'
  ];
  
  const missing: string[] = [];
  
  for (const field of requiredFields) {
    if (!body[field] || (typeof body[field] === 'string' && !body[field].trim())) {
      missing.push(field);
    }
  }
  
  return missing;
}

/**
 * Validates syntax format of email address.
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  // Robust regex for typical RFC 5322 matching
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Sanitizes input text to prevent XSS script injection and HTML tag rendering.
 */
export function sanitizeString(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '') // Remove full script tags & blocks
    .replace(/<\/?[^>]+(>|$)/g, '')                     // Strip remaining HTML tag tags
    .replace(/[&<>"']/g, (match) => {                  // Encode HTML special characters
      switch (match) {
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#x27;';
        default: return match;
      }
    })
    .trim();
}

/**
 * Full sanitization process for the request body.
 */
export function sanitizeRequestBody(body: LeadRequest): LeadRequest {
  return {
    firstName: sanitizeString(body.firstName),
    lastName: sanitizeString(body.lastName),
    email: sanitizeString(body.email),
    company: sanitizeString(body.company),
    city: sanitizeString(body.city),
    country: sanitizeString(body.country),
    state: sanitizeString(body.state),
    service: sanitizeString(body.service),
    message: sanitizeString(body.message),
    recaptchaToken: body.recaptchaToken // Do not sanitize recaptcha token as it contains no HTML and changes value
  };
}
