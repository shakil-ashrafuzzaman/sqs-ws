import { z } from 'zod';
import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const contactSchema = z.object({
  name: z.string({ required_error: "Full name is required." }).min(2, "Name must be at least 2 characters.").max(100, "Name must be under 100 characters.").trim(),
  email: z.string({ required_error: "Email address is required." }).email("Please enter a valid email address.").max(254, "Email address is too long.").trim().toLowerCase(),
  phone: z.string().regex(
    /^(\+44|0)(1|2|3|7|8)\d{8,9}$/,
    "Please enter a valid UK phone number."
  ).optional().or(z.literal("")),
  service: z.enum([
    "manned-guarding",
    "mobile-patrols",
    "cctv-monitoring",
    "key-holding",
    "alarm-response",
    "construction-security",
    "retail-security",
    "maritime-security",
    "event-security",
    "corporate-security",
    "other"
  ]).optional(),
  message: z.string({ required_error: "Message is required." }).min(20, "Please provide a message of at least 20 characters.").max(2e3, "Message must be under 2000 characters.").trim(),
  /** Honeypot — must remain empty to pass bot detection */
  website: z.string().max(0, "Bot detected.").optional()
});

const resend = new Resend("re_placeholder_key");
const EMAIL_CONFIG = {
  /** Main operations inbox */
  to: "info@sqssecurity.co.uk",
  /** Verified sender domain */
  from: "SQS Security <noreply@sqssecurity.co.uk>",
  /** Email subject prefix */
  subjectPrefix: "[SQS Security Enquiry]"
};
async function sendContactNotification(data) {
  await resend.emails.send({
    from: EMAIL_CONFIG.from,
    to: EMAIL_CONFIG.to,
    subject: `${EMAIL_CONFIG.subjectPrefix} New enquiry from ${data.name}`,
    html: buildNotificationEmail(data)
  });
}
async function sendConfirmationEmail(data) {
  await resend.emails.send({
    from: EMAIL_CONFIG.from,
    to: data.email,
    subject: "Thank you for contacting SQS Security",
    html: buildConfirmationEmail(data)
  });
}
function buildNotificationEmail(data) {
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
            </tr>` : ""}
            ${data.service ? `
            <tr style="border-bottom: 1px solid #E2E8F0;">
              <td style="padding: 12px 0; color: #64748B; font-weight: bold;">Service</td>
              <td style="padding: 12px 0; color: #1E293B;">${data.service}</td>
            </tr>` : ""}
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
function buildConfirmationEmail(data) {
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

const prerender = false;
const rateLimitCache = /* @__PURE__ */ new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1e3;
const POST = async ({ request, clientAddress }) => {
  try {
    const ip = clientAddress || request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    if (rateLimitCache.has(ip)) {
      const lastRequest = rateLimitCache.get(ip);
      if (now - lastRequest < RATE_LIMIT_WINDOW_MS) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please wait a minute before trying again." }),
          { status: 429, headers: { "Content-Type": "application/json" } }
        );
      }
    }
    let rawData;
    try {
      rawData = await request.json();
    } catch (e) {
      return new Response(
        JSON.stringify({ error: "Invalid JSON payload" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const validationResult = contactSchema.safeParse(rawData);
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          error: "Validation failed",
          errors: validationResult.error.errors
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const validData = validationResult.data;
    if (validData.website && validData.website.length > 0) {
      console.warn(`[Security] Bot blocked via honeypot from IP: ${ip}`);
      return new Response(
        JSON.stringify({ success: true, message: "Message sent successfully." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    rateLimitCache.set(ip, now);
    const emailPayload = {
      name: validData.name,
      email: validData.email,
      phone: validData.phone || "Not provided",
      service: validData.service || "General Enquiry",
      message: validData.message,
      submittedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    await Promise.all([
      sendContactNotification(emailPayload),
      sendConfirmationEmail(emailPayload)
    ]);
    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[API Contact Error]", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error. Please try again later." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
