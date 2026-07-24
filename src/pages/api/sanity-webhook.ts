import type { APIRoute } from 'astro';
import { exec } from 'node:child_process';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get('x-sanity-webhook-secret') || request.headers.get('authorization');
    const expectedSecret = import.meta.env.SANITY_WEBHOOK_SECRET || process.env.SANITY_WEBHOOK_SECRET;

    // Validate secret if configured in environment
    if (expectedSecret && authHeader !== expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
      return new Response(JSON.stringify({ error: 'Unauthorized secret token' }), { 
        status: 401, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    const body = await request.json().catch(() => ({}));
    console.log('[Sanity Webhook] Content mutation event received:', body._type || 'document', body._id || '');

    // Rebuild static pages & reload PM2 in the background without blocking the webhook response
    exec('npm run build', (err, stdout, stderr) => {
      if (err) {
        console.error('[Sanity Webhook] Rebuild error:', err.message);
      } else {
        console.log('[Sanity Webhook] Site build updated successfully from Sanity CMS mutation!');
      }
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Sanity Webhook received. Background site rebuild initiated.'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[Sanity Webhook Exception]:', err);
    return new Response(
      JSON.stringify({ success: false, error: err?.message || 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
