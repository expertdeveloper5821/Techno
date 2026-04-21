/**
 * Public contact details used across the site. Update here or override via env where noted.
 */

export const siteContact = {
  email: 'info@technogetic.com',
  phoneDisplay:'+91-9779992829',
  /** E.164-style digits for tel: link (no spaces/dashes) */
  phoneTel:'+919779992829',
  address:
  
    '1st floor, Nexa Square, C-209/B, Phase 8B, Sec 74, Mohali, Punjab.',
} as const;

export interface ContactBlock {
  title: string;
  description: string;
  value: string;
  href: string | undefined;
}

export function getContactBlocks(): ContactBlock[] {
  return [
    {
      title: 'Email',
      description: 'Our friendly team is here to help.',
      value: siteContact.email,
      href: `mailto:${siteContact.email}`,
    },
    {
      title: 'Phone',
      description: 'Mon-Fri from 8am to 5pm.',
      value: siteContact.phoneDisplay,
      href: `tel:${siteContact.phoneTel.replace(/\s/g, '')}`,
    },
    {
      title: 'Office',
      description: 'Come say hello at our office HQ.',
      value: siteContact.address,
      href: undefined,
    },
  ];
}
