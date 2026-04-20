/**
 * Shared client-side validation for newsletter and contact forms.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

const NAME_MAX = 100;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 2000;
const PHONE_MIN_DIGITS = 10;
const PHONE_MAX_DIGITS = 15;

export interface ContactFormFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  agreePrivacy: boolean;
}

export function validateContactForm(
  fields: ContactFormFields
): { ok: true } | { ok: false; message: string } {
  const first = fields.firstName.trim();
  const last = fields.lastName.trim();
  if (!first || !last) {
    return { ok: false, message: 'Please enter your first and last name.' };
  }
  if (first.length > NAME_MAX || last.length > NAME_MAX) {
    return { ok: false, message: `Each name must be at most ${NAME_MAX} characters.` };
  }
  if (!fields.email.trim()) {
    return { ok: false, message: 'Please enter your email address.' };
  }
  if (!isValidEmail(fields.email)) {
    return { ok: false, message: 'Please enter a valid email address.' };
  }

  const phoneDigits = fields.phone.replace(/\D/g, '');
  if (
    phoneDigits.length > 0 &&
    (phoneDigits.length < PHONE_MIN_DIGITS || phoneDigits.length > PHONE_MAX_DIGITS)
  ) {
    return {
      ok: false,
      message: `Phone number must be between ${PHONE_MIN_DIGITS} and ${PHONE_MAX_DIGITS} digits.`,
    };
  }

  const msg = fields.message.trim();
  if (!msg) {
    return { ok: false, message: 'Please enter a message.' };
  }
  if (msg.length < MESSAGE_MIN || msg.length > MESSAGE_MAX) {
    return {
      ok: false,
      message: `Message must be between ${MESSAGE_MIN} and ${MESSAGE_MAX} characters.`,
    };
  }
  if (!fields.agreePrivacy) {
    return { ok: false, message: 'Please accept the privacy policy.' };
  }

  return { ok: true };
}

export const FORM_SUBMIT_THROTTLE_MS = 3000;
