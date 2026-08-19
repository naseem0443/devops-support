import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

export interface ReCaptchaRef {
  reset: () => void;
}

interface ReCaptchaProps {
  siteKey: string;
  onChange: (token: string | null) => void;
}

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoadCallback?: () => void;
  }
}

export const ReCaptcha = forwardRef<ReCaptchaRef, ReCaptchaProps>(({ siteKey, onChange }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (window.grecaptcha && widgetIdRef.current !== null) {
        window.grecaptcha.reset(widgetIdRef.current);
        onChange(null);
      }
    }
  }));

  useEffect(() => {
    let active = true;

    const renderRecaptcha = () => {
      if (!active || !containerRef.current) return;
      try {
        if (window.grecaptcha && window.grecaptcha.render) {
          // Clear any existing children to prevent double renders in DevMode strict
          containerRef.current.innerHTML = '';
          
          const widgetId = window.grecaptcha.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => onChange(token),
            'expired-callback': () => onChange(null),
            'error-callback': () => onChange(null),
          });
          widgetIdRef.current = widgetId;
        }
      } catch (err) {
        console.error('[reCAPTCHA] Programmatic render failed:', err);
      }
    };

    if (window.grecaptcha && window.grecaptcha.render) {
      renderRecaptcha();
    } else {
      // Check if global callback is already registered
      const oldCallback = window.onRecaptchaLoadCallback;
      window.onRecaptchaLoadCallback = () => {
        if (oldCallback) oldCallback();
        if (window.grecaptcha && active) {
          renderRecaptcha();
        }
      };

      if (!document.getElementById('recaptcha-script-tag')) {
        const script = document.createElement('script');
        script.id = 'recaptcha-script-tag';
        script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoadCallback&render=explicit';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      } else {
        // Script already exists but grecaptcha might not be fully initialized yet
        const interval = setInterval(() => {
          if (window.grecaptcha && window.grecaptcha.render) {
            clearInterval(interval);
            if (active) renderRecaptcha();
          }
        }, 150);
        return () => {
          clearInterval(interval);
          active = false;
        };
      }
    }

    return () => {
      active = false;
    };
  }, [siteKey, onChange]);

  return (
    <div 
      ref={containerRef} 
      className="g-recaptcha-container" 
      id="recaptcha-box"
      style={{ minHeight: '78px', display: 'flex', alignItems: 'center' }}
    />
  );
});

ReCaptcha.displayName = 'ReCaptcha';
