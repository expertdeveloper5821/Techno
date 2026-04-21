export interface PrivacyTopic {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export const privacyTopics: PrivacyTopic[] = [
 
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    paragraphs: [
      'We may collect the following types of information:',
    ],
    bullets: [
      'Personal Information: Name, email address, phone number, and other details you provide through contact forms.',
      'Project Information: Details related to your business, requirements, and project discussions.',
      'Technical Data: IP address, browser type, device information, and website usage data.',
    ],
  },
  {
    id: 'how-we-use-your-information',
    title: 'How We Use Your Information',
    paragraphs: ['We use your information to:'],
    bullets: [
      'Understand your requirements and provide relevant services',
      'Communicate with you regarding inquiries or projects',
      'Improve our website and user experience',
      'Send important updates or service-related information',
    ],
  },
  {
    id: 'data-sharing-disclosure',
    title: 'Data Sharing & Disclosure',
    paragraphs: ['We do not sell, trade, or rent your personal information.', 'Your data may only be shared with:'],
    bullets: [
      'Trusted team members or partners involved in your project',
      'Legal authorities, if required by law',
    ],
  },
  {
    id: 'data-security',
    title: 'Data Security',
    paragraphs: [
      'We implement appropriate security measures to protect your data from unauthorized access, misuse, or disclosure.',
      'However, no online system is 100% secure, and we encourage users to share information responsibly.',
    ],
  },
  {
    id: 'cookies-tracking-technologies',
    title: 'Cookies & Tracking Technologies',
    paragraphs: ['Our website may use cookies to:'],
    bullets: [
      'Enhance user experience',
      'Analyze website traffic and performance',
      'You can choose to disable cookies through your browser settings.',
    ],
  },
  {
    id: 'third-party-services',
    title: 'Third-Party Services',
    paragraphs: [
      'We may use third-party tools (such as analytics or integrations) that may collect limited data. These services operate under their own privacy policies.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    paragraphs: ['You have the right to:'],
    bullets: [
      'Access the personal data we hold about you',
      'Request correction or deletion of your data',
      'Withdraw consent for data usage',
      'To exercise these rights, please contact us.',
    ],
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    paragraphs: [
      'We retain your information only as long as necessary for business, legal, or operational purposes.',
    ],
  },
  {
    id: 'updates-to-this-policy',
    title: 'Updates to This Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time. Changes will be reflected on this page with an updated date.',
    ],
  },
  {
    id: 'contact-us',
    title: 'Contact Us',
    paragraphs: [
      'If you have any questions about this Privacy Policy, you can contact us at:',
    ],
    bullets: ['Email: info@technogetic.com', 'Phone: +91-XXXXXXXXXX'],
  },
];
