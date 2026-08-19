import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Contact } from '../../src/pages/Contact';

// Mock environment variables
vi.stubEnv('VITE_RECAPTCHA_SITE_KEY', 'mock-site-key-123');
vi.stubEnv('VITE_API_BASE_URL', 'http://localhost:7071');

// Mock the ReCaptcha component so we can control token generation in tests
vi.mock('../../src/components/ReCaptcha', () => {
  return {
    ReCaptcha: React.forwardRef(({ onChange }: any, ref: any) => {
      React.useImperativeHandle(ref, () => ({
        reset: vi.fn()
      }));
      return (
        <button
          type="button"
          data-testid="mock-recaptcha"
          onClick={() => onChange('mock-valid-token')}
        >
          Simulate CAPTCHA Verify
        </button>
      );
    })
  };
});

describe('Contact Form Page Tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    window.scrollTo = vi.fn();
  });

  const renderContactPage = () => {
    return render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );
  };

  it('renders contact page form fields', () => {
    renderContactPage();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Service Required/i)).toBeInTheDocument();
  });

  it('shows validation errors when fields are empty', async () => {
    renderContactPage();
    const submitButton = screen.getByRole('button', { name: /Submit Support Request/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText('First name is required.')).toBeInTheDocument();
    expect(screen.getByText('Last name is required.')).toBeInTheDocument();
    expect(screen.getByText('Email address is required.')).toBeInTheDocument();
    expect(screen.getByText('Please complete the security verification.')).toBeInTheDocument();
  });

  it('shows email syntax validation error', async () => {
    renderContactPage();
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'invalidemail' } });
    
    const submitButton = screen.getByRole('button', { name: /Submit Support Request/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  it('submits form successfully on HTTP 200', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      status: 200,
      json: async () => ({ success: true, message: 'Your request has been submitted successfully.' })
    });
    vi.stubGlobal('fetch', fetchMock);

    renderContactPage();

    // Fill form
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'jane@company.com' } });
    fireEvent.change(screen.getByLabelText(/Company Name/i), { target: { value: 'Vandelay Industries' } });
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText(/State \/ Province/i), { target: { value: 'NY' } });
    fireEvent.change(screen.getByLabelText(/Country/i), { target: { value: 'USA' } });
    fireEvent.change(screen.getByLabelText(/Service Required/i), { target: { value: 'Kubernetes Support' } });

    // Solve CAPTCHA
    fireEvent.click(screen.getByTestId('mock-recaptcha'));

    // Submit
    const submitButton = screen.getByRole('button', { name: /Submit Support Request/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Thank you for contacting us/i)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalled();
  });

  it('shows error message on duplicate submission (HTTP 409)', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      status: 409,
      json: async () => ({ success: false, message: 'Your request was already submitted recently.' })
    });
    vi.stubGlobal('fetch', fetchMock);

    renderContactPage();

    // Fill form
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'jane@company.com' } });
    fireEvent.change(screen.getByLabelText(/Company Name/i), { target: { value: 'Vandelay Industries' } });
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText(/State \/ Province/i), { target: { value: 'NY' } });
    fireEvent.change(screen.getByLabelText(/Country/i), { target: { value: 'USA' } });
    fireEvent.change(screen.getByLabelText(/Service Required/i), { target: { value: 'Kubernetes Support' } });

    // Solve CAPTCHA
    fireEvent.click(screen.getByTestId('mock-recaptcha'));

    // Submit
    const submitButton = screen.getByRole('button', { name: /Submit Support Request/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText('Your request was already submitted recently.')).toBeInTheDocument();
  });

  it('shows safe error message on integration/Salesforce failures (HTTP 502)', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      status: 502,
      json: async () => ({ success: false, message: 'Unable to submit your request. Please try again later.' })
    });
    vi.stubGlobal('fetch', fetchMock);

    renderContactPage();

    // Fill form
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'jane@company.com' } });
    fireEvent.change(screen.getByLabelText(/Company Name/i), { target: { value: 'Vandelay' } });
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText(/State \/ Province/i), { target: { value: 'NY' } });
    fireEvent.change(screen.getByLabelText(/Country/i), { target: { value: 'USA' } });
    fireEvent.change(screen.getByLabelText(/Service Required/i), { target: { value: 'Kubernetes Support' } });

    // Solve CAPTCHA
    fireEvent.click(screen.getByTestId('mock-recaptcha'));

    // Submit
    const submitButton = screen.getByRole('button', { name: /Submit Support Request/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText('Unable to submit your request. Please try again later.')).toBeInTheDocument();
  });
});
