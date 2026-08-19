/**
 * Salesforce Web-to-Lead integration service.
 */

interface LeadPayload {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  city: string;
  country: string;
  state: string;
  service: string;
  message: string;
}

export async function submitToSalesforce(payload: LeadPayload): Promise<boolean> {
  const oid = process.env.SALESFORCE_OID;
  const webToLeadUrl = process.env.SALESFORCE_WEB_TO_LEAD_URL || 'https://webto.salesforce.com/servlet/servlet.WebToLead';
  const leadSource = process.env.SALESFORCE_LEAD_SOURCE;
  const returnUrl = process.env.SALESFORCE_RETURN_URL;
  
  // Custom field mappings configurable via environment variables (with sensible defaults)
  const serviceFieldName = process.env.SALESFORCE_SERVICE_FIELD_NAME || 'service';
  const descriptionFieldName = process.env.SALESFORCE_DESCRIPTION_FIELD_NAME || 'description';

  // Check required configurations
  if (!oid) {
    console.error('[API] Configuration Error: SALESFORCE_OID is missing.');
    return false;
  }
  if (!leadSource) {
    console.error('[API] Configuration Error: SALESFORCE_LEAD_SOURCE is missing.');
    return false;
  }
  if (!returnUrl) {
    console.error('[API] Configuration Error: SALESFORCE_RETURN_URL is missing.');
    return false;
  }

  console.log('[API] Salesforce submission started.');

  try {
    // Construct url-encoded form body parameters
    const formParams = new URLSearchParams();
    
    // Config parameters
    formParams.append('oid', oid);
    formParams.append('retURL', returnUrl);
    formParams.append('lead_source', leadSource);

    // Standard Salesforce field mapping
    formParams.append('first_name', payload.firstName);
    formParams.append('last_name', payload.lastName);
    formParams.append('email', payload.email);
    formParams.append('company', payload.company);
    formParams.append('city', payload.city);
    formParams.append('country_code', payload.country);
    formParams.append('state_code', payload.state);

    // Map service and message to the specified target Salesforce fields
    formParams.append(serviceFieldName, payload.service);
    formParams.append(descriptionFieldName, payload.message);

    const response = await fetch(webToLeadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formParams.toString()
    });

    // Web-to-Lead endpoints typically return 200 or 302 redirects.
    // If the server returns a 4xx or 5xx, we consider it a failure.
    if (response.ok || (response.status >= 300 && response.status < 400)) {
      console.log('[API] Salesforce submission successful.');
      return true;
    } else {
      console.error(`[API] Salesforce endpoint returned error status: ${response.status}`);
      console.log('[API] Salesforce submission failed.');
      return false;
    }
  } catch (error) {
    console.error('[API] Salesforce submission encountered connection error:', error);
    console.log('[API] Salesforce submission failed.');
    return false;
  }
}
