export interface TermsTopic {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export const termsTopics: TermsTopic[] = [
  {
    id: 'acceptance-of-terms',
    title: 'Acceptance of Terms',
    paragraphs: [
      'By using our services, you agree to comply with these terms. If you do not agree, please do not use our website or services.',
    ],
  },
  {
    id: 'services',
    title: 'Services',
    paragraphs: [
      'Technogetic provides services including UI/UX design, website development, mobile app development, and custom software solutions.',
      'We reserve the right to modify or discontinue any service at any time without prior notice.',
    ],
  },
  {
    id: 'project-engagement',
    title: 'Project Engagement',
    paragraphs: [],
    bullets: [
      'All projects begin after mutual agreement on scope, timeline, and cost',
      'Clients must provide accurate requirements and timely feedback',
      'Delays in communication may affect delivery timelines',
    ],
  },
  {
    id: 'payments-billing',
    title: 'Payments & Billing',
    paragraphs: [
      'All payments are non-refundable unless otherwise agreed in writing.',
    ],
    bullets: [
      'Payments are made based on agreed milestones',
      'Advance payment may be required before starting the project',
      'Delayed payments may result in project pause or delay',
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    paragraphs: [],
    bullets: [
      'Upon full payment, the final deliverables and source code are transferred to the client',
      'Technogetic retains the right to showcase the project in its portfolio unless restricted by NDA',
    ],
  },
  {
    id: 'revisions-changes',
    title: 'Revisions & Changes',
    paragraphs: [],
    bullets: [
      'Revisions are included as per the agreed scope',
      'Additional features or major changes may require extra cost and timeline adjustments',
    ],
  },
  {
    id: 'client-responsibilities',
    title: 'Client Responsibilities',
    paragraphs: ['Clients agree to:'],
    bullets: [
      'Provide clear project requirements',
      'Share necessary content, assets, and access on time',
      'Review and approve deliverables promptly',
    ],
  },
  {
    id: 'confidentiality',
    title: 'Confidentiality',
    paragraphs: [
      'We respect your privacy and ensure that all sensitive project information remains confidential.',
      'NDA agreements can be signed upon request.',
    ],
  },
  {
    id: 'limitation-of-liability',
    title: 'Limitation of Liability',
    paragraphs: [
      'Technogetic is not liable for:',
      'Our total liability is limited to the amount paid for the service.',
    ],
    bullets: [
      'Any indirect or consequential damages',
      'Loss of data, revenue, or business due to service delays or issues',
    ],
  },
  {
    id: 'third-party-services',
    title: 'Third-Party Services',
    paragraphs: [
      'We may integrate third-party tools or services. We are not responsible for their performance, policies, or changes.',
    ],
  },
  {
    id: 'termination',
    title: 'Termination',
    paragraphs: ['We reserve the right to terminate or suspend services if:'],
    bullets: [
      'Terms are violated',
      'Payments are not made',
      'Misuse of services is detected',
    ],
  },
  {
    id: 'changes-to-terms',
    title: 'Changes to Terms',
    paragraphs: [
      'We may update these Terms of Service at any time. Continued use of our services means you accept the updated terms.',
    ],
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    paragraphs: [
      'These terms are governed by the laws of India. Any disputes will be subject to the jurisdiction of local courts.',
    ],
  },
  {
    id: 'contact-information',
    title: 'Contact Information',
    paragraphs: ['If you have any questions regarding these Terms, you can contact us:'],
    bullets: ['Email: info@technogetic.com', 'Phone: +91-XXXXXXXXXX'],
  },
];
