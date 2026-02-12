import { FAQ } from '../types';

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How long does a typical project take?',
    answer:
      'Most MVPs launch in 8-12 weeks. Larger projects break into phases, so you see working software every two weeks, not after months.',
    meta: 'Discovery',
  },
  {
    id: '2',
    question: 'Do you work alongside our existing team?',
    answer:
      'Yes. We integrate directly—same tools, same standups, same accountability. Think of us as an extension, not a vendor.',
    meta: 'Collaboration',
  },
  {
    id: '3',
    question: 'What if requirements change during development?',
    answer:
      'We adapt. Priorities shift, and we understand that. Well re-scope, update timelines, and keep you informed on any cost impacts.',
    meta: 'Systems',
  },
  {
    id: '4',
    question: 'Can we see examples of your work?',
    answer:
      'Absolutely. We share relevant case studies in our first call. Some are under NDA, but we have plenty.',
    meta: 'Quality',
  },
  {
    id: '5',
    question: 'Do you provide support after launch?',
    answer:
      'Yes. We offer flexible retainers for maintenance and feature additions. Many clients keep engineers long-term.',
    meta: 'Quality',
  },
];
