import { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';

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
  const [loadFailed, setLoadFailed] = useState(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (window.grecaptcha && widgetIdRef.current !== null) {
        window.grecaptcha.reset(widgetIdRef.current);
        onChangeRef.current(null);
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
          
          // Create a brand new child div to avoid "reCAPTCHA has already been rendered" error in Strict Mode
          const widgetContainer = document.createElement('div');
          containerRef.current.appendChild(widgetContainer);
          
          const widgetId = window.grecaptcha.render(widgetContainer, {
            sitekey: siteKey,
            callback: (token: string) => onChangeRef.current(token),
            'expired-callback': () => onChangeRef.current(null),
            'error-callback': () => onChangeRef.current(null),
          });
          widgetIdRef.current = widgetId;
        }
      } catch (err) {
        console.error('[reCAPTCHA] Programmatic render failed:', err);
      }
    };

    const timeoutId = setTimeout(() => {
      if (!window.grecaptcha || !window.grecaptcha.render) {
        setLoadFailed(true);
      }
    }, 3500);

    if (window.grecaptcha && window.grecaptcha.render) {
      clearTimeout(timeoutId);
      renderRecaptcha();
    } else {
      const oldCallback = window.onRecaptchaLoadCallback;
      window.onRecaptchaLoadCallback = () => {
        if (oldCallback) oldCallback();
        if (window.grecaptcha && active) {
          clearTimeout(timeoutId);
          setLoadFailed(false);
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
        const interval = setInterval(() => {
          if (window.grecaptcha && window.grecaptcha.render) {
            clearInterval(interval);
            clearTimeout(timeoutId);
            setLoadFailed(false);
            if (active) renderRecaptcha();
          }
        }, 150);
        return () => {
          clearInterval(interval);
          clearTimeout(timeoutId);
          active = false;
        };
      }
    }

    return () => {
      clearTimeout(timeoutId);
      active = false;
    };
  }, [siteKey]);

  if (loadFailed) {
    return (
      <div className="alert-box alert-error" style={{ fontSize: '0.85rem', padding: '0.75rem', marginTop: '0.5rem', borderRadius: '4px' }}>
        <div>
          <strong>Verification failed to load:</strong> It seems Google services are blocked. Please check if your browser ad-blocker or Brave Shields is blocking reCAPTCHA on `localhost`.
        </div>
      </div>
    );
  }

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
