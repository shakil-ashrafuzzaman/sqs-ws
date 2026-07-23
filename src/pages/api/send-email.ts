import type { APIRoute } from 'astro';
import { sendContactNotification, sendConfirmationEmail } from '../../lib/resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, phone, service, message } = data;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'Name, email, and message are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const payload = {
      name,
      email,
      phone,
      service,
      message,
      submittedAt: new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }),
    };

    // Send admin notification and enquirer confirmation concurrently
    await Promise.all([
      sendContactNotification(payload),
      sendConfirmationEmail(payload),
    ]);

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully via Resend.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Resend API Route Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error?.message || 'Failed to send email' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
