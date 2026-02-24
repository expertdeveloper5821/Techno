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
      buttonLabel: 'Explore Services',
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
    {
      imageSrc: '/service/whatwedo/card1.png',
      imageAlt: 'Marketing services',
      icon: '/service/whatwedo/icon1.svg',
      title: 'Marketing & Growth Services',
      description:
        'We design and execute data-driven marketing strategies that accelerate brand visibility, lead generation, and revenue growth.',
      buttonLabel: 'Explore Marketing',
      servicesColumns: [
        {
          items: [
            { label: 'Digital Marketing Strategy' },
            { label: 'Performance Marketing Campaigns' },
            { label: 'Content & Brand Storytelling' },
            { label: 'Marketing Automation' },
          ],
        },
        {
          items: [
            { label: 'SEO & Organic Growth' },
            { label: 'Social Media Strategy' },
            { label: 'Conversion Rate Optimization' },
            { label: 'Analytics & Reporting' },
          ],
        },
      ],
    },
    {
      imageSrc: '/service/whatwedo/card1.png',
      imageAlt: 'Technology implementation services',
      icon: '/service/whatwedo/icon1.svg',
      title: 'Technology Implementation',
      description:
        'From architecture to deployment, we help teams implement scalable, secure, and future-ready digital platforms.',
      buttonLabel: 'Explore Technology',
      servicesColumns: [
        {
          items: [
            { label: 'Custom Web & App Development' },
            { label: 'Cloud & DevOps Enablement' },
            { label: 'Enterprise Integrations' },
            { label: 'API Design & Management' },
          ],
        },
        {
          items: [
            { label: 'Data & Analytics Platforms' },
            { label: 'UX/UI Design Systems' },
            { label: 'Security & Compliance' },
            { label: 'Ongoing Maintenance & Support' },
          ],
        },
      ],
    },
    {
      imageSrc: '/service/whatwedo/card1.png',
      imageAlt: 'Marketing services',
      icon: '/service/whatwedo/icon1.svg',
      title: 'Marketing & Growth Services',
      description:
        'We design and execute data-driven marketing strategies that accelerate brand visibility, lead generation, and revenue growth.',
      buttonLabel: 'Explore Marketing',
      servicesColumns: [
        {
          items: [
            { label: 'Digital Marketing Strategy' },
            { label: 'Performance Marketing Campaigns' },
            { label: 'Content & Brand Storytelling' },
            { label: 'Marketing Automation' },
          ],
        },
        {
          items: [
            { label: 'SEO & Organic Growth' },
            { label: 'Social Media Strategy' },
            { label: 'Conversion Rate Optimization' },
            { label: 'Analytics & Reporting' },
          ],
        },
      ],
    },
  ],
};

