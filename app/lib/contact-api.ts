/**
 * Sends contact form data to the Supabase Edge Function.
 * Set NEXT_PUBLIC_CONTACT_ENDPOINT and optionally NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.
 */

function getContactEndpoint(): string {
  return (
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_CONTACT_ENDPOINT?.trim()) || ''
  );
}

let warnedMissingEndpoint = false;
let warnedMissingAnonKey = false;

function warnProductionConfig(): void {
  if (typeof process === 'undefined' || process.env.NODE_ENV !== 'production') {
    return;
  }
  const endpoint = getContactEndpoint();
  if (!endpoint && !warnedMissingEndpoint) {
    warnedMissingEndpoint = true;
    console.warn(
      '[contact-api] NEXT_PUBLIC_CONTACT_ENDPOINT is not set. Contact form submissions will fail.'
    );
  }
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!anon && !warnedMissingAnonKey) {
    warnedMissingAnonKey = true;
    console.warn(
      '[contact-api] NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. If your Edge Function requires auth, requests may fail.'
    );
  }
}

export interface ContactFormPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  agreePrivacy: boolean;
}

export interface SendContactResponse {
  ok: boolean;
  error?: string;
}

export async function sendContactForm(
  payload: ContactFormPayload
): Promise<SendContactResponse> {
  warnProductionConfig();

  const url = getContactEndpoint();
  if (!url) {
    return {
      ok: false,
      error: 'Contact form is not configured. Please try again later.',
    };
  }

  const body = {
    first_name: payload.firstName.trim(),
    last_name: payload.lastName.trim(),
    email: payload.email.trim(),
    phone: payload.phone.trim(),
    message: payload.message.trim(),
    privacy_policy_agreed: payload.agreePrivacy,
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
