import { Resend } from 'resend';

/**
 * Resend Email Client for SQS Security
 * Handles contact form notifications to operations team
 */
function getEnvVar(key: string, defaultValue: string = ''): string {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] || defaultValue;
  }
  return defaultValue;
}

export const resend = new Resend(getEnvVar('RESEND_API_KEY'));

export const EMAIL_CONFIG = {
  /** Main operations inbox */
  get to() { return getEnvVar('CONTACT_EMAIL_TO', 'info@sqssecurity.co.uk'); },
  /** Verified sender domain */
  from: 'SQS Security <noreply@sqssecurity.co.uk>',
  /** Email subject prefix */
  subjectPrefix: '[SQS Security Enquiry]',
} as const;

/**
 * Types for email payloads
 */
export interface ContactEmailPayload {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  submittedAt: string;
}

/**
 * Format and send contact notification to operations team
 */
export async function sendContactNotification(
  data: ContactEmailPayload,
): Promise<void> {
  await resend.emails.send({
    from: EMAIL_CONFIG.from,
    to: EMAIL_CONFIG.to,
    subject: `${EMAIL_CONFIG.subjectPrefix} New enquiry from ${data.name}`,
    html: buildNotificationEmail(data),
  });
}

/**
 * Send confirmation email to the enquirer
 */
export async function sendConfirmationEmail(
  data: ContactEmailPayload,
): Promise<void> {
  await resend.emails.send({
    from: EMAIL_CONFIG.from,
    to: data.email,
    subject: 'Thank you for contacting SQS Security',
    html: buildConfirmationEmail(data),
  });
}

function buildNotificationEmail(data: ContactEmailPayload): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><title>New Enquiry</title></head>
    <body style="font-family: Arial, sans-serif; background: #F8FAFC; padding: 32px;">
      <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; border: 1px solid #E2E8F0;">
        <div style="background: #0B1F3A; padding: 24px; text-align: center;">
          <h1 style="color: #D4AF37; margin: 0; font-size: 24px;">SQS Security</h1>
          <p style="color: #94A3B8; margin: 4px 0 0;">New Website Enquiry Received</p>
        </div>
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #E2E8F0;">
              <td style="padding: 12px 0; color: #64748B; font-weight: bold; width: 40%;">Name</td>
              <td style="padding: 12px 0; color: #1E293B;">${data.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #E2E8F0;">
              <td style="padding: 12px 0; color: #64748B; font-weight: bold;">Email</td>
              <td style="padding: 12px 0; color: #1E293B;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            ${data.phone ? `
            <tr style="border-bottom: 1px solid #E2E8F0;">
              <td style="padding: 12px 0; color: #64748B; font-weight: bold;">Phone</td>
              <td style="padding: 12px 0; color: #1E293B;">${data.phone}</td>
            </tr>` : ''}
            ${data.service ? `
            <tr style="border-bottom: 1px solid #E2E8F0;">
              <td style="padding: 12px 0; color: #64748B; font-weight: bold;">Service</td>
              <td style="padding: 12px 0; color: #1E293B;">${data.service}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 12px 0; color: #64748B; font-weight: bold; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; color: #1E293B; white-space: pre-wrap;">${data.message}</td>
            </tr>
          </table>
        </div>
        <div style="background: #F8FAFC; padding: 16px 32px; border-top: 1px solid #E2E8F0;">
          <p style="color: #94A3B8; font-size: 12px; margin: 0;">Submitted: ${data.submittedAt} | sqssecurity.co.uk</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function buildConfirmationEmail(data: ContactEmailPayload): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><title>Thank You</title></head>
    <body style="font-family: Arial, sans-serif; background: #F8FAFC; padding: 32px;">
      <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; border: 1px solid #E2E8F0;">
        <div style="background: #0B1F3A; padding: 24px; text-align: center;">
          <h1 style="color: #D4AF37; margin: 0; font-size: 24px;">SQS Security</h1>
          <p style="color: #94A3B8; margin: 4px 0 0;">Protecting People, Property & Business</p>
        </div>
        <div style="padding: 32px;">
          <h2 style="color: #0B1F3A; margin-top: 0;">Thank you, ${data.name}!</h2>
          <p style="color: #475569; line-height: 1.75;">We have received your enquiry and a member of our team will be in touch within <strong>2 business hours</strong>.</p>
          <p style="color: #475569; line-height: 1.75;">For urgent security matters, please call us directly on <a href="tel:+44XXXXXXXXXX" style="color: #D4AF37; font-weight: bold;">0800 XXX XXXX</a>.</p>
        </div>
        <div style="background: #0B1F3A; padding: 24px; text-align: center;">
          <p style="color: #94A3B8; font-size: 12px; margin: 0;">SQS Security | 86 Brintons Road, Southampton, Hampshire | sqssecurity.co.uk</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
