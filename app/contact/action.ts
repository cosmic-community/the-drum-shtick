'use server';

import { Resend } from 'resend';

interface ContactFormState {
  success: boolean;
  error: string | null;
  submitted: boolean;
}

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_ADDRESS = 'my@email.com';

export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // Validate inputs
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return { success: false, error: 'Name is required.', submitted: true };
  }

  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    return { success: false, error: 'Email is required.', submitted: true };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { success: false, error: 'Please enter a valid email address.', submitted: true };
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return { success: false, error: 'Message is required.', submitted: true };
  }

  try {
    await resend.emails.send({
      from: EMAIL_ADDRESS,
      to: EMAIL_ADDRESS,
      subject: `Contact Form: Message from ${name.trim()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a2e; border-bottom: 2px solid #d68032; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="padding: 20px 0;">
            <p style="margin: 8px 0;"><strong>Name:</strong> ${name.trim()}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> ${email.trim()}</p>
            <p style="margin: 8px 0;"><strong>Message:</strong></p>
            <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; white-space: pre-wrap;">
              ${message.trim()}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; border-top: 1px solid #eee; padding-top: 10px;">
            Sent from The Drum Shtick contact form
          </p>
        </div>
      `,
    });

    return { success: true, error: null, submitted: true };
  } catch (error: unknown) {
    console.error('Failed to send email:', error);
    return {
      success: false,
      error: 'Failed to send your message. Please try again later.',
      submitted: true,
    };
  }
}