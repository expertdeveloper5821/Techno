/**
 * Sends contact form data to the internal Next.js API route (/api/contact),
 * which saves the submission to MongoDB and optionally forwards it to the
 * Supabase Edge Function for email notifications.
 */

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
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName:    payload.firstName.trim(),
        lastName:     payload.lastName.trim(),
        email:        payload.email.trim(),
        phone:        payload.phone.trim(),
        message:      payload.message.trim(),
        agreePrivacy: payload.agreePrivacy,
      }),
    });

    const data = await res.json().catch(() => ({ ok: false }));

    if (!res.ok || !data.ok) {
      return {
        ok: false,
        error: data.error ?? `Request failed with status ${res.status}`,
      };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return { ok: false, error: message };
  }
}
