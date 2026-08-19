/**
 * Google reCAPTCHA v2 server-side token verification service.
 */
export async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    throw new Error('RECAPTCHA_SECRET_KEY environment variable is not configured.');
  }

  // Never log the secret key or raw recaptcha token in logs
  const maskedKey = secretKey 
    ? `${secretKey.substring(0, 8)}...${secretKey.substring(secretKey.length - 4)}` 
    : 'undefined';
  console.log(`[API] CAPTCHA verification started. Secret Key: ${maskedKey} (length: ${secretKey?.length})`);

  try {
    const url = 'https://www.google.com/recaptcha/api/siteverify';
    const params = new URLSearchParams({
      secret: secretKey,
      response: token
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    if (!response.ok) {
      console.error(`[API] Google verification endpoint returned error status: ${response.status}`);
      return false;
    }

    const data: any = await response.json();
    
    if (data && data.success) {
      console.log('[API] CAPTCHA verification successful.');
      return true;
    } else {
      console.warn('[API] CAPTCHA verification failed. Response error-codes:', data?.['error-codes']);
      return false;
    }
  } catch (error) {
    console.error('[API] CAPTCHA verification encountered error:', error);
    return false;
  }
}
