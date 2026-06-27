import type { APIRoute } from 'astro';
import { contactSchema } from '../../schemas/contactSchema';
import { sendContactNotification, sendConfirmationEmail } from '../../lib/resend';

// Opt-out of static rendering for this API route (Astro 5 standard)
export const prerender = false;

// Basic in-memory rate limiting map
// Keys: IP addresses, Values: timestamps of last submission
const rateLimitCache = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute between submissions per IP

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    // 1. IP Rate Limiting
    // In production (Vercel/Netlify), clientAddress relies on proper headers
    const ip = clientAddress || request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    
    if (rateLimitCache.has(ip)) {
      const lastRequest = rateLimitCache.get(ip)!;
      if (now - lastRequest < RATE_LIMIT_WINDOW_MS) {
        return new Response(
          JSON.stringify({ error: 'Too many requests. Please wait a minute before trying again.' }),
          { status: 429, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }
    
    // Parse incoming JSON body
    let rawData;
    try {
      rawData = await request.json();
    } catch (e) {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON payload' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. Validate payload using Zod
    const validationResult = contactSchema.safeParse(rawData);

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          error: 'Validation failed',
          errors: validationResult.error.errors,
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const validData = validationResult.data;

    // 3. Honeypot Check (Bot Protection)
    // If 'website' field is filled out, it's a bot. Silently discard.
    if (validData.website && validData.website.length > 0) {
      console.warn(`[Security] Bot blocked via honeypot from IP: ${ip}`);
      // Return a fake 200 success to prevent bots from learning
      return new Response(
        JSON.stringify({ success: true, message: 'Message sent successfully.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Update rate limit cache for successful human submissions
    rateLimitCache.set(ip, now);

    // Prepare email payload
    const emailPayload = {
      name: validData.name,
      email: validData.email,
      phone: validData.phone || 'Not provided',
      service: validData.service || 'General Enquiry',
      message: validData.message,
      submittedAt: new Date().toISOString(),
    };

    // 4. Send Emails via Resend
    // Send to operations team and confirmation to the user concurrently
    await Promise.all([
      sendContactNotification(emailPayload),
      sendConfirmationEmail(emailPayload),
    ]);

    // 5. Return success
    return new Response(
      JSON.stringify({ success: true, message: 'Message sent successfully.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[API Contact Error]', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error. Please try again later.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
