export interface FAQTopicItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQTopic {
  id: string;
  title: string;
  description: string;
  items: FAQTopicItem[];
}

export const faqTopics: FAQTopic[] = [
  {
    id: 'general-information',
    title: 'General Information',
    description: 'Everything you should know about Technogetic before starting.',
    items: [
      {
        id: 'general-1',
        question: 'What services does Technogetic offer?',
        answer:
          'We provide end-to-end digital solutions including UI/UX design, website development, mobile app development, and custom software tailored to your business needs.',
      },
      {
        id: 'general-2',
        question: 'Which industries do you specialize in?',
        answer:
          'We work with startups, healthcare, education, e-commerce, and service-based businesses, delivering solutions that align with industry-specific requirements.',
      },
      {
        id: 'general-3',
        question: 'How experienced is your team?',
        answer:
          'Our team consists of skilled designers and developers with hands-on experience in building scalable, user-friendly, and modern digital products.',
      },
      {
        id: 'general-4',
        question: 'Do you work with startups or only established businesses?',
        answer:
          'We work with both startups and established companies, helping them build, scale, and improve their digital presence effectively.',
      },
      {
        id: 'general-5',
        question: 'Where is your company located?',
        answer:
          'We operate remotely and collaborate with clients globally, ensuring smooth communication and timely project delivery.',
      },
      {
        id: 'general-6',
        question: 'How can I get started with Technogetic?',
        answer:
          'Simply contact us through our website or email. We will schedule a consultation to understand your requirements and guide you through the next steps.',
      },
    ],
  },
  {
    id: 'project-process',
    title: 'Project Process',
    description: 'How we plan, execute, and deliver projects with full clarity.',
    items: [
      {
        id: 'process-1',
        question: 'What is your development process?',
        answer:
          'Our process includes discovery, planning, design, development, testing, and deployment, ensuring a structured and efficient workflow for every project.',
      },
      {
        id: 'process-2',
        question: 'How long does it take to complete a project?',
        answer:
          'Project timelines vary depending on complexity, but most projects take between 2 to 8 weeks from start to completion.',
      },
      {
        id: 'process-3',
        question: 'How do you handle project timelines and deadlines?',
        answer:
          'We follow a milestone-based approach with clear timelines, ensuring transparency and timely delivery without compromising quality.',
      },
      {
        id: 'process-4',
        question: 'Will I be involved during the development process?',
        answer:
          'Yes, we keep you involved at every stage with regular updates, feedback sessions, and approvals to ensure alignment with your vision.',
      },
      {
        id: 'process-5',
        question: 'Do you provide regular project updates?',
        answer:
          'Absolutely. We share consistent updates through meetings, reports, or collaboration tools to keep you informed.',
      },
      {
        id: 'process-6',
        question: 'What tools do you use for project management?',
        answer:
          'We use tools like Trello, Jira, Slack, and Figma to manage tasks, communication, and design collaboration efficiently.',
      },
    ],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Design services focused on clarity, usability, and visual quality.',
    items: [
      {
        id: 'design-1',
        question: 'Do you offer custom UI/UX design services?',
        answer:
          'Yes, we create fully customized designs tailored to your brand, audience, and business goals.',
      },
      {
        id: 'design-2',
        question: 'How do you ensure a user-friendly design?',
        answer:
          'We follow user-centered design principles, focusing on usability, accessibility, and intuitive navigation.',
      },
      {
        id: 'design-3',
        question: 'Can you redesign my existing website/app?',
        answer:
          'Yes, we can revamp your current product to improve usability, performance, and visual appeal.',
      },
      {
        id: 'design-4',
        question: 'Do you conduct user research and testing?',
        answer:
          'We perform basic research and usability testing to ensure the design meets user expectations and solves real problems.',
      },
      {
        id: 'design-5',
        question: 'Will the design be mobile-friendly and responsive?',
        answer:
          'All our designs are fully responsive, ensuring seamless performance across mobile, tablet, and desktop devices.',
      },
      {
        id: 'design-6',
        question: 'How many revisions are included in the design process?',
        answer:
          'We offer multiple revisions based on feedback to ensure the final design meets your expectations.',
      },
    ],
  },
  {
    id: 'development-services',
    title: 'Development Services',
    description: 'Full-stack development services for websites and apps.',
    items: [
      {
        id: 'dev-1',
        question: 'What technologies do you use for development?',
        answer:
          'We use modern technologies like React, Next.js, Node.js, and other scalable frameworks based on project requirements.',
      },
      {
        id: 'dev-2',
        question: 'Do you build both websites and mobile applications?',
        answer:
          'Yes, we develop responsive websites and high-performance mobile applications for Android and iOS platforms.',
      },
      {
        id: 'dev-3',
        question: 'Can you integrate third-party APIs and tools?',
        answer:
          'Absolutely. We can integrate payment gateways, CRMs, analytics tools, and other third-party services.',
      },
      {
        id: 'dev-4',
        question: 'Do you offer scalable and secure solutions?',
        answer:
          'Yes, we build scalable architectures with strong security practices to ensure long-term performance and safety.',
      },
      {
        id: 'dev-5',
        question: 'Will I own the source code after completion?',
        answer:
          'Yes, once the project is completed and paid for, full ownership of the source code is transferred to you.',
      },
      {
        id: 'dev-6',
        question: 'Do you provide backend and frontend both?',
        answer:
          'Yes, we offer complete full-stack development services including both frontend and backend solutions.',
      },
    ],
  },
  {
    id: 'pricing-payments',
    title: 'Pricing & Payments',
    description: 'Transparent pricing models and flexible payment options.',
    items: [
      {
        id: 'pricing-1',
        question: 'How much does a typical project cost?',
        answer:
          'Project costs depend on scope, features, and complexity. We provide a customized quote after understanding your requirements.',
      },
      {
        id: 'pricing-2',
        question: 'Do you offer fixed pricing or hourly rates?',
        answer:
          'We offer both fixed-price and hourly models based on the project type and client preference.',
      },
      {
        id: 'pricing-3',
        question: 'Are there any hidden charges?',
        answer:
          'No, we maintain full transparency. All costs are discussed and agreed upon before starting the project.',
      },
      {
        id: 'pricing-4',
        question: 'What is your payment structure?',
        answer:
          'We usually follow a milestone-based payment structure to ensure flexibility and trust.',
      },
      {
        id: 'pricing-5',
        question: 'Do you offer flexible payment plans?',
        answer:
          'Yes, we can customize payment plans based on project size and client requirements.',
      },
      {
        id: 'pricing-6',
        question: 'Can I get a custom quote for my project?',
        answer:
          'Absolutely. Share your requirements, and we will provide a tailored quote.',
      },
    ],
  },
  {
    id: 'support-maintenance',
    title: 'Support & Maintenance',
    description: 'Ongoing support to keep your product stable and up to date.',
    items: [
      {
        id: 'support-1',
        question: 'Do you provide support after project launch?',
        answer:
          'Yes, we offer ongoing support after project delivery to ensure everything runs smoothly.',
      },
      {
        id: 'support-2',
        question: 'What kind of maintenance services do you offer?',
        answer:
          'We provide updates, bug fixes, performance optimization, and feature enhancements.',
      },
      {
        id: 'support-3',
        question: 'How quickly do you handle critical issues?',
        answer:
          'We aim to resolve issues as quickly as possible, usually within 24-48 hours depending on severity.',
      },
      {
        id: 'support-4',
        question: 'Do you offer website/app updates?',
        answer:
          'Yes, we can update your product regularly to keep it secure and up-to-date.',
      },
      {
        id: 'support-5',
        question: 'Is technical support included in the package?',
        answer:
          'Basic support is included, with extended support plans available if needed.',
      },
      {
        id: 'support-6',
        question: 'Can I request new features after launch?',
        answer:
          'Yes, we can add new features and improvements even after the project is live.',
      },
    ],
  },
  {
    id: 'security-confidentiality',
    title: 'Security & Confidentiality',
    description: 'How we protect your data, ideas, and infrastructure.',
    items: [
      {
        id: 'security-1',
        question: 'How do you ensure data security?',
        answer:
          'We follow best practices including secure coding, encryption, and regular security checks.',
      },
      {
        id: 'security-2',
        question: 'Will my project idea remain confidential?',
        answer:
          'Yes, we respect your privacy and ensure your ideas remain protected.',
      },
      {
        id: 'security-3',
        question: 'Do you sign NDA agreements?',
        answer:
          'Yes, we are happy to sign NDA agreements before starting any project.',
      },
      {
        id: 'security-4',
        question: 'How do you handle sensitive user data?',
        answer:
          'We follow strict data protection practices and comply with relevant security standards.',
      },
      {
        id: 'security-5',
        question: 'Do you follow industry security standards?',
        answer:
          'Yes, we adhere to modern security protocols and industry best practices.',
      },
      {
        id: 'security-6',
        question: 'What measures do you take to prevent cyber threats?',
        answer:
          'We implement firewalls, secure authentication, and regular monitoring to protect against threats.',
      },
    ],
  },
  {
    id: 'seo-digital-growth',
    title: 'SEO & Digital Growth',
    description: 'Optimization support for discoverability, speed, and growth.',
    items: [
      {
        id: 'seo-1',
        question: 'Do you offer SEO services?',
        answer:
          'Yes, we provide basic SEO optimization to improve your website visibility.',
      },
      {
        id: 'seo-2',
        question: 'Will my website be optimized for search engines?',
        answer:
          'Yes, we follow SEO-friendly practices including proper structure, speed optimization, and meta setup.',
      },
      {
        id: 'seo-3',
        question: 'Do you help with website performance optimization?',
        answer:
          'Yes, we optimize loading speed and performance for better user experience and rankings.',
      },
      {
        id: 'seo-4',
        question: 'Can you improve my website speed?',
        answer:
          'Absolutely. We optimize images, code, and server performance to ensure fast loading times.',
      },
      {
        id: 'seo-5',
        question: 'Do you provide analytics and tracking setup?',
        answer:
          'Yes, we integrate tools like Google Analytics to track performance and user behavior.',
      },
      {
        id: 'seo-6',
        question: 'Will my website be mobile and SEO friendly?',
        answer:
          'Yes, all our websites are responsive and built with SEO best practices.',
      },
    ],
  },
];
