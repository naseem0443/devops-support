import React, { useState, useRef } from 'react';
import { Mail, Building, MapPin, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { ReCaptcha, ReCaptchaRef } from '../components/ReCaptcha';

interface FormData {
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

interface FormErrors {
  [key: string]: string;
}

export const Contact: React.FC = () => {
  const recaptchaRef = useRef<ReCaptchaRef>(null);
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';

  const initialFormState: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    city: '',
    country: '',
    state: '',
    service: '',
    message: ''
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [submitMessage, setSubmitMessage] = useState('');

  const services = [
    'Cloud Engineering',
    'Kubernetes Support',
    'CI/CD Automation',
    'Terraform / Infrastructure as Code',
    'DevSecOps',
    'Monitoring & Observability',
    'Production Support',
    'Cloud Migration',
    'Application Modernization',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    if (token) {
      setRecaptchaError(null);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.company.trim()) newErrors.company = 'Company name is required.';
    if (!formData.city.trim()) newErrors.city = 'City is required.';
    if (!formData.country.trim()) newErrors.country = 'Country is required.';
    if (!formData.state.trim()) newErrors.state = 'State/Province is required.';
    if (!formData.service) newErrors.service = 'Please select a service.';

    // Validate message length limit
    if (formData.message && formData.message.length > 2000) {
      newErrors.message = 'Message must not exceed 2000 characters.';
    }

    setErrors(newErrors);
    
    if (!recaptchaToken) {
      setRecaptchaError('Please complete the security verification.');
    }

    return Object.keys(newErrors).length === 0 && recaptchaToken !== null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);
    setSubmitMessage('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiBaseUrl}/api/submitLead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken
        }),
      });

      const result = await response.json();

      if (response.status === 200) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you for contacting us. Your request has been received and our team will contact you shortly.');
        setFormData(initialFormState);
        setRecaptchaToken(null);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      } else {
        setSubmitStatus('error');
        if (response.status === 409) {
          setSubmitMessage(result.message || 'Your request was already submitted recently.');
        } else if (response.status === 400) {
          setSubmitMessage(result.message || 'Please provide valid information.');
        } else if (response.status === 502) {
          setSubmitMessage('Unable to submit your request. Please try again later.');
        } else {
          setSubmitMessage(result.message || 'Unable to process your request. Please try again later.');
        }
        
        // Reset reCAPTCHA on failure to allow retry
        setRecaptchaToken(null);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      }
    } catch (err) {
      console.error('API submit error:', err);
      setSubmitStatus('error');
      setSubmitMessage('Network connection error. Please try again.');
      
      // Reset reCAPTCHA on network failure
      setRecaptchaToken(null);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-page">
      <div className="page-header">
        <div className="container">
          <span style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase' }}>
            Get In Touch
          </span>
          <h1 style={{ marginTop: '0.5rem' }}>Request Professional Support</h1>
          <p>
            Submit your infrastructure automation or Kubernetes support request. Our engineering team will review and respond.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            
            {/* Contact Details Column */}
            <div className="contact-info-block">
              <h3>Technical Consultation</h3>
              <p>
                Fill out the service request details. A DevOps engineer will evaluate your requirements and contact you within 24 business hours.
              </p>
              
              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <Mail size={20} />
                </div>
                <div className="contact-detail-content">
                  <h4>Email Correspondence</h4>
                  <p>sales@pdfmasterpro.shop</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <Building size={20} />
                </div>
                <div className="contact-detail-content">
                  <h4>Corporate Office</h4>
                  <p>DevOps PDFMasterPro LLC</p>
                  <p>San Francisco, CA, USA</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <MapPin size={20} />
                </div>
                <div className="contact-detail-content">
                  <h4>Global Coverage</h4>
                  <p>Distributed support teams operating in USA, Europe, and Asia Pacific timezones.</p>
                </div>
              </div>

              <div style={{
                marginTop: '1.5rem',
                padding: '1.5rem',
                backgroundColor: 'rgba(13, 21, 39, 0.4)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius-md)',
                fontSize: '0.85rem',
                color: 'var(--text-muted)'
              }}>
                <strong>Security Guard:</strong> Submission requests are authenticated through server-side reCAPTCHA token verification and stored securely inside our Salesforce CRM.
              </div>
            </div>

            {/* Form Column */}
            <div className="form-container">
              {submitStatus === 'success' && (
                <div className="alert-box alert-success" id="form-success-alert">
                  <CheckCircle size={20} style={{ flexShrink: 0 }} />
                  <div>{submitMessage}</div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="alert-box alert-error" id="form-error-alert">
                  <AlertCircle size={20} style={{ flexShrink: 0 }} />
                  <div>{submitMessage}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate id="contact-support-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="firstName">First Name <span>*</span></label>
                    <input 
                      className="form-input" 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      value={formData.firstName} 
                      onChange={handleInputChange} 
                      required
                    />
                    {errors.firstName && <span className="form-error-msg">{errors.firstName}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="lastName">Last Name <span>*</span></label>
                    <input 
                      className="form-input" 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      value={formData.lastName} 
                      onChange={handleInputChange} 
                      required
                    />
                    {errors.lastName && <span className="form-error-msg">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address <span>*</span></label>
                    <input 
                      className="form-input" 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      required
                    />
                    {errors.email && <span className="form-error-msg">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="company">Company Name <span>*</span></label>
                    <input 
                      className="form-input" 
                      type="text" 
                      id="company" 
                      name="company" 
                      value={formData.company} 
                      onChange={handleInputChange} 
                      required
                    />
                    {errors.company && <span className="form-error-msg">{errors.company}</span>}
                  </div>
                </div>

                <div className="form-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="city">City <span>*</span></label>
                    <input 
                      className="form-input" 
                      type="text" 
                      id="city" 
                      name="city" 
                      value={formData.city} 
                      onChange={handleInputChange} 
                      required
                    />
                    {errors.city && <span className="form-error-msg">{errors.city}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="state">State / Province <span>*</span></label>
                    <input 
                      className="form-input" 
                      type="text" 
                      id="state" 
                      name="state" 
                      value={formData.state} 
                      onChange={handleInputChange} 
                      required
                    />
                    {errors.state && <span className="form-error-msg">{errors.state}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="country">Country <span>*</span></label>
                    <input 
                      className="form-input" 
                      type="text" 
                      id="country" 
                      name="country" 
                      value={formData.country} 
                      onChange={handleInputChange} 
                      required
                    />
                    {errors.country && <span className="form-error-msg">{errors.country}</span>}
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" htmlFor="service">Service Required <span>*</span></label>
                  <select 
                    className="form-select" 
                    id="service" 
                    name="service" 
                    value={formData.service} 
                    onChange={handleInputChange} 
                    required
                  >
                    <option value="">-- Select Required Service --</option>
                    {services.map((svc) => (
                      <option key={svc} value={svc}>{svc}</option>
                    ))}
                  </select>
                  {errors.service && <span className="form-error-msg">{errors.service}</span>}
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" htmlFor="message">Additional Message Details</label>
                  <textarea 
                    className="form-textarea" 
                    id="message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    placeholder="Provide details about your infrastructure, timeline, or scope (max 2000 chars)"
                    maxLength={2000}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>{errors.message && <span className="form-error-msg">{errors.message}</span>}</span>
                    <span>{formData.message.length} / 2000</span>
                  </div>
                </div>

                {/* reCAPTCHA Checkbox Component */}
                <div className="recaptcha-wrapper">
                  <label className="form-label">Security Verification <span>*</span></label>
                  {siteKey ? (
                    <ReCaptcha 
                      ref={recaptchaRef}
                      siteKey={siteKey} 
                      onChange={handleRecaptchaChange} 
                    />
                  ) : (
                    <div style={{ color: 'var(--warning)', fontSize: '0.85rem' }}>
                      reCAPTCHA Site Key missing. Check configuration.
                    </div>
                  )}
                  {recaptchaError && <span className="form-error-msg">{recaptchaError}</span>}
                </div>

                <button 
                  className="btn btn-primary" 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{ width: '100%', marginTop: '1rem' }}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="spinner" size={16} style={{ animation: 'spin 1.2s linear infinite' }} />
                      Submitting Request...
                    </>
                  ) : (
                    'Submit Support Request'
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
