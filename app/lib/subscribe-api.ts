/**
 * Newsletter subscription via Supabase Edge Function.
 * Set NEXT_PUBLIC_NEWSLETTER_ENDPOINT and optionally NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.
 */

function getNewsletterEndpoint(): string {
  return (
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_NEWSLETTER_ENDPOINT?.trim()) || ''
  );
}

let warnedMissingEndpoint = false;
let warnedMissingAnonKey = false;

function warnProductionConfig(): void {
  if (typeof process === 'undefined' || process.env.NODE_ENV !== 'production') {
    return;
  }
  if (!getNewsletterEndpoint() && !warnedMissingEndpoint) {
    warnedMissingEndpoint = true;
    console.warn(
      '[subscribe-api] NEXT_PUBLIC_NEWSLETTER_ENDPOINT is not set. Newsletter subscriptions will fail.'
    );
  }
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!anon && !warnedMissingAnonKey) {
    warnedMissingAnonKey = true;
    console.warn(
      '[subscribe-api] NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. If your Edge Function requires auth, requests may fail.'
    );
  }
}

export interface NewsletterPayload {
  email: string;
}

export interface SendContactResponse {
  ok: boolean;
  error?: string;
}

export async function Subscribe(
  payload: NewsletterPayload
): Promise<SendContactResponse> {
  warnProductionConfig();

  const url = getNewsletterEndpoint();
  if (!url) {
    return {
      ok: false,
      error: 'Newsletter is not configured. Please try again later.',
    };
  }

  const body = {
    email: payload.email.trim(),
  };

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const anonKey =
    typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (anonKey) {
    headers['Authorization'] = `Bearer ${anonKey}`;
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      return {
        ok: false,
        error: text || `Request failed with status ${res.status}`,
      };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { ok: false, error: message };
  }
}
