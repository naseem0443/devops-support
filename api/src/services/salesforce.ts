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

function normalizeLocationCodes(state: string, country: string): { stateCode: string; countryCode: string } {
  const countryMap: Record<string, string> = {
    'india': 'IN',
    'united states': 'US',
    'united states of america': 'US',
    'usa': 'US',
    'united kingdom': 'GB',
    'uk': 'GB',
    'canada': 'CA',
    'australia': 'AU',
    'germany': 'DE',
    'france': 'FR'
  };

  const stateMap: Record<string, string> = {
    'delhi': 'DL',
    'new delhi': 'DL',
    'bihar': 'BR',
    'california': 'CA',
    'texas': 'TX',
    'new york': 'NY',
    'florida': 'FL',
    'washington': 'WA'
  };

  const cleanCountry = (country || '').trim().toLowerCase();
  const cleanState = (state || '').trim().toLowerCase();

  const countryCode = countryMap[cleanCountry] || (cleanCountry.length === 2 ? cleanCountry.toUpperCase() : country);
  const stateCode = stateMap[cleanState] || (cleanState.length === 2 ? cleanState.toUpperCase() : state);

  return { stateCode, countryCode };
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

    const { stateCode, countryCode } = normalizeLocationCodes(payload.state, payload.country);
    formParams.append('country_code', countryCode);
    formParams.append('state_code', stateCode);

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
