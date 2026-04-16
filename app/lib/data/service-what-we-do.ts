export interface ServiceBullet {
  label: string;
}

export interface ServiceColumn {
  items: ServiceBullet[];
}

export interface WhatWeDoCardData {
  imageSrc: string;
  imageAlt: string;
  icon: string;
  title: string;
  description: string;
  servicesColumns: ServiceColumn[];
  buttonLabel: string;
}

export interface WhatWeDoSectionData {
  heading: string;
  description: string;
  cards: WhatWeDoCardData[];
}

export const whatWeDoData: WhatWeDoSectionData = {
  heading: 'What We Do',
  description:
    'We provide end-to-end consulting, marketing, and technology services that help businesses plan smarter, grow faster, and build scalable digital solutions. Our integrated approach ensures every strategy, campaign, and product aligns seamlessly with long-term business goals and measurable outcomes.',
  cards: [
    {
      imageSrc: '/service/whatwedo/card1.png',
      imageAlt: 'Consulting services',
      icon: '/service/whatwedo/icon1.svg',
      title: 'Consulting Services',
      description:
        'Our consulting services help businesses make informed decisions, reduce risks, and plan technology initiatives effectively.',
      buttonLabel: 'Talk to us ',
      servicesColumns: [
        {
          items: [
            { label: 'Technology Consulting' },
            { label: 'Digital Transformation Consulting' },
            { label: 'Product Strategy & Roadmapping' },
            { label: 'Business Process Analysis' },
          ],
        },
        {
          items: [
            { label: 'Startup & MVP Consulting' },
            { label: 'System Architecture & Planning' },
            { label: 'IT Audit & Optimization' },
            { label: 'Process Automation Consulting' },
          ],
        },
      ],
    },
    // Second Card: Marketing Services (From Image 1)
    {
      imageSrc: '/service/whatwedo/card2.png',
      imageAlt: 'Marketing Services',
      icon: '/service/whatwedo/icon2.svg',
      title: 'Marketing Services',
      description:
        'Our consulting services help businesses make informed decisions, reduce risks, and plan technology initiatives effectively.',
      buttonLabel: 'Talk to us ',
      servicesColumns: [
        {
          items: [
            { label: 'Digital Marketing Strategy' },
            { label: 'Performance & Paid Marketing' },
            { label: 'Content Marketing' },
            { label: 'Conversion Rate Optimization' },
          ],
        },
        {
          items: [
            { label: 'Search Engine Optimization (SEO)' },
            { label: 'Social Media Marketing' },
            { label: 'Branding & Visual Identity' },
            { label: 'Marketing Automation' },
          ],
        },
      ],
    },
    // Third Card: IT Solutions Services (From Image 2)
    {
      imageSrc: '/service/whatwedo/card3.png',
      imageAlt: 'IT Solutions Services',
      icon: '/service/whatwedo/icon3.svg',
      title: 'IT Solutions Services',
      description:
        'Our consulting services help businesses make informed decisions, reduce risks, and plan technology initiatives effectively.',
      buttonLabel: 'Talk to us ',
      servicesColumns: [
        {
          items: [
            { label: 'Web Application Development' },
            { label: 'Data Science & AI Solutions' },
            { label: 'Content Management Systems' },
            { label: 'Enterprise Software Solutions' },
          ],
        },
        {
          items: [
            { label: 'Cloud & DevOps Solutions' },
            { label: 'E-Commerce Solutions' },
            { label: 'Server Setup & Configuration' },
            { label: 'Application Customization & Integration' },
          ],
        },
      ],
    },
   
  ],
};

