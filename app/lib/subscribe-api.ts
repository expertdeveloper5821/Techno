/**
 * Sends contact form data to the Supabase Edge Function.
 * Optional: set NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local if the function requires auth.
 */

const SEND_QUERY_EMAILS_URL =
  'https://wcpvzrdsljdjjzxgbidv.supabase.co/functions/v1/subscribe-newsletter';

export interface testpayload {
  email: string;
}

export interface SendContactResponse {
  ok: boolean;
  error?: string;
}

export async function Subscribe(
  payload: testpayload
): Promise<SendContactResponse> {
  const body = {
    email: payload.email.trim(),
  };

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const anonKey =
    typeof process !== 'undefined' &&
    process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (anonKey) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${anonKey}`;
  }

  try {
    const res = await fetch(SEND_QUERY_EMAILS_URL, {
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
