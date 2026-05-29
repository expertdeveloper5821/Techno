/**
 * Seed script — populates MongoDB with all static site data.
 * Run with:  npx ts-node -r tsconfig-paths/register scripts/seed.ts
 * Or add to package.json:  "seed": "ts-node -r tsconfig-paths/register scripts/seed.ts"
 */

import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

// ── Models ────────────────────────────────────────────────────────────────────
import ProductModel from "../app/lib/models/Product";
import ServiceModel from "../app/lib/models/Service";
import PartnerModel from "../app/lib/models/Partner";
import TechnologyModel from "../app/lib/models/Technology";
import FAQModel from "../app/lib/models/FAQ";
import BlogPostModel from "../app/lib/models/BlogPost";
import PortfolioWorkModel from "../app/lib/models/PortfolioWork";
import IndustryModel from "../app/lib/models/Industry";
import FeatureModel from "../app/lib/models/Feature";
import WhatWeDoModel from "../app/lib/models/WhatWeDo";
import JobOpeningModel from "../app/lib/models/JobOpening";
import GrowthItemModel from "../app/lib/models/GrowthItem";
import PrivacyPolicyModel from "../app/lib/models/PrivacyPolicy";
import TermsAndConditionsModel from "../app/lib/models/TermsAndConditions";

// ── Raw data ──────────────────────────────────────────────────────────────────

const products = [
  {
    title: "Blocktech Platform",
    description:
      "Enterprise CRM handling 50K+ leads monthly. Built custom workflow automation that cut manual data entry by 70%. Deployed on AWS with auto-scaling infrastructure.",
    image: "/Home/produced/blocktech.svg",
    techStack: "React, Node.js, PostgreSQL, AWS",
    order: 1,
  },
  {
    title: "Akasa Air",
    description:
      "We contributed to a high-traffic airline booking and scheduling ecosystem, where system reliability, uptime, and performance were business-critical.",
    image: "/Home/produced/Akasa Air.svg",
    techStack: "React.js, Node.js, PostgreSQL, Redis",
    order: 2,
  },
  {
    title: "NFTtrace",
    description:
      "NFTtrace is a blockchain platform focused on traceability, transparency, and data integrity. Our role emphasized secure infrastructure and deployment reliability.",
    image: "/Home/produced/NFtrace.svg",
    techStack: "React.js, Node.js, PostgreSQL, Redis",
    order: 3,
  },
  {
    title: "Dun & Bradstreet India",
    description:
      "For Dun & Bradstreet India, we worked on enterprise-grade integrations supporting strict compliance, performance, and data governance requirements.",
    image: "/Home/produced/DunBradstreetindia.svg",
    techStack: "Java / Node.js, Oracle, PostgreSQL",
    order: 4,
  },
  {
    title: "Trukky",
    description:
      "Trukky is a real-time logistics and transport booking platform connecting customers with transport providers.",
    image: "/Home/produced/Trukky.svg",
    techStack: "React.js, Node.js, PostgreSQL, MongoDB",
    order: 5,
  },
  {
    title: "Transporteca",
    description:
      "Transporteca is a multi-vendor freight marketplace enabling seamless collaboration between shippers and logistics providers.",
    image: "/Home/produced/Transporteca.svg",
    techStack: "React.js, React Native, PostgreSQL",
    order: 6,
  },
];

const services = [
  {
    title: "Custom Software Development",
    image: "/Home/services/slide5.webp",
    description:
      "We build tailored software solutions that align with your business goals, from enterprise applications to workflow automation and integrations.",
    order: 1,
  },
  {
    title: "Web & Mobile Applications",
    image: "/Home/services/slide2.webp",
    description:
      "From responsive web apps to native and cross-platform mobile applications, we deliver user-centric solutions that perform at scale.",
    order: 2,
  },
  {
    title: "Dedicated Development Teams",
    image: "/Home/services/slide4.webp",
    description:
      "Our dedicated development teams work as an extension of your business, providing skilled professionals, clear communication, and flexible collaboration to deliver reliable results.",
    order: 3,
  },
  {
    title: "Product Design & UX",
    image: "/Home/services/slide2.webp",
    description:
      "Human-centered design and research-driven UX to create intuitive, accessible products that users love and that drive business outcomes.",
    order: 4,
  },
  {
    title: "Cloud Architecture & DevOps",
    image: "/Home/services/slide3.webp",
    description:
      "Scalable cloud infrastructure, CI/CD pipelines, and DevOps practices to accelerate delivery and keep your systems secure and reliable.",
    order: 5,
  },
  {
    title: "Digital Marketing",
    image: "/Home/services/digital-marketing.webp",
    description:
      "Data-driven digital marketing strategies to grow your reach, engagement, and conversions across channels.",
    order: 6,
  },
  {
    title: "Web Development",
    image: "/Home/services/slide5.webp",
    description:
      "Modern web development with cutting-edge technologies for fast, secure, and maintainable applications.",
    order: 7,
  },
  {
    title: "Mobile App Development",
    image: "/Home/services/mobile-app.webp",
    description:
      "Native and cross-platform mobile apps that deliver seamless experiences on iOS and Android.",
    order: 8,
  },
  {
    title: "UI/UX Designing",
    image: "/Home/services/ui-ux.webp",
    description:
      "End-to-end UI/UX design from discovery and wireframes to high-fidelity prototypes and design systems.",
    order: 9,
  },
  {
    title: "Cloud Computing",
    image: "/Home/services/slide3.webp",
    description:
      "Cloud migration, architecture, and optimization to reduce costs and improve performance.",
    order: 10,
  },
];

const partners = [
  {
    name: "Akasa Air",
    logoGray: "/Home/partners/alska.svg",
    logoColor: "/Home/partners/akasa-air.svg",
    order: 1,
  },
  {
    name: "CuddlyNest",
    logoGray: "/Home/partners/cuddlynest.svg",
    logoColor: "/Home/partners/cuddlynest-color.svg",
    order: 2,
  },
  {
    name: "Deborah Henning",
    logoGray: "/Home/partners/DEBORAH HENNING-gray.svg",
    logoColor: "/Home/partners/DEBORAH HENNING-color.svg",
    order: 3,
  },
  {
    name: "HeyOye",
    logoGray: "/Home/partners/heyoye-gray.svg",
    logoColor: "/Home/partners/heyoye-color.svg",
    order: 4,
  },
  {
    name: "inadev",
    logoGray: "/Home/partners/inadev-gray.svg",
    logoColor: "/Home/partners/inadev-color.svg",
    order: 5,
  },
  {
    name: "intellectyx",
    logoGray: "/Home/partners/intellectyx-gray.svg",
    logoColor: "/Home/partners/intellectyx-color.svg",
    order: 6,
  },
  {
    name: "OBORTECH",
    logoGray: "/Home/partners/obortech-gray.svg",
    logoColor: "/Home/partners/obortech-color.svg",
    order: 7,
  },
  {
    name: "Sourcebae",
    logoGray: "/Home/partners/sourcebae-gray.svg",
    logoColor: "/Home/partners/sourcebae-color.svg",
    order: 8,
  },
  {
    name: "SYNERGY",
    logoGray: "/Home/partners/synergy-gray.svg",
    logoColor: "/Home/partners/synergy-color.svg",
    order: 9,
  },
  {
    name: "TECHVED",
    logoGray: "/Home/partners/techved-gray.svg",
    logoColor: "/Home/partners/techved-color.svg",
    order: 10,
  },
  {
    name: "beast",
    logoGray: "/Home/partners/beast-gray.svg",
    logoColor: "/Home/partners/beast-color.svg",
    order: 11,
  },
];

const technologies = [
  // Row 1
  {
    name: "GitLab",
    logo: "/Home/tech/gitlab.svg",
    description: "Support more Multiple repositories to one or more channels.",
    row: 1,
    order: 1,
  },
  {
    name: "OVHcloud",
    logo: "/Home/tech/ovhcloud.svg",
    description: "OVH legally OVH groupe SAS, is a French cloud compute company.",
    row: 1,
    order: 2,
  },
  {
    name: "ChatGPT",
    logo: "/Home/tech/chatgpt.svg",
    description: "Offering assistance with answering frequently asked questions.",
    row: 1,
    order: 3,
  },
  {
    name: "Notion",
    logo: "/Home/tech/notion.svg",
    description:
      "You can create rich-text document customizable formatting, images.",
    row: 1,
    order: 4,
  },
  // Row 2
  {
    name: "Dropbox",
    logo: "/Home/tech/dropbox.svg",
    description:
      "Dropbox provides cloud storage where users can securely store.",
    row: 2,
    order: 1,
  },
  {
    name: "ClickUp",
    logo: "/Home/tech/clickup.svg",
    description: "ClickUp is a productivity platform for our task management.",
    row: 2,
    order: 2,
  },
  {
    name: "Slack",
    logo: "/Home/tech/slack.svg",
    description: "Slack usesd channels to organize communication around topics.",
    row: 2,
    order: 3,
  },
  {
    name: "Zoom",
    logo: "/Home/tech/zoom.svg",
    description: "For Video conferencing platform used for virtual meeting.",
    row: 2,
    order: 4,
  },
];

const faqs = [
  // General Information
  { question: "What services does Technogetic offer?", answer: "We provide end-to-end digital solutions including UI/UX design, website development, mobile app development, and custom software tailored to your business needs.", meta: "General Information", order: 1 },
  { question: "Which industries do you specialize in?", answer: "We work with startups, healthcare, education, e-commerce, and service-based businesses, delivering solutions that align with industry-specific requirements.", meta: "General Information", order: 2 },
  { question: "How experienced is your team?", answer: "Our team consists of skilled designers and developers with hands-on experience in building scalable, user-friendly, and modern digital products.", meta: "General Information", order: 3 },
  { question: "Do you work with startups or only established businesses?", answer: "We work with both startups and established companies, helping them build, scale, and improve their digital presence effectively.", meta: "General Information", order: 4 },
  { question: "Where is your company located?", answer: "We operate remotely and collaborate with clients globally, ensuring smooth communication and timely project delivery.", meta: "General Information", order: 5 },
  { question: "How can I get started with Technogetic?", answer: "Simply contact us through our website or email. We will schedule a consultation to understand your requirements and guide you through the next steps.", meta: "General Information", order: 6 },

  // Project Process
  { question: "What is your development process?", answer: "Our process includes discovery, planning, design, development, testing, and deployment, ensuring a structured and efficient workflow for every project.", meta: "Project Process", order: 7 },
  { question: "How long does it take to complete a project?", answer: "Project timelines vary depending on complexity, but most projects take between 2 to 8 weeks from start to completion.", meta: "Project Process", order: 8 },
  { question: "How do you handle project timelines and deadlines?", answer: "We follow a milestone-based approach with clear timelines, ensuring transparency and timely delivery without compromising quality.", meta: "Project Process", order: 9 },
  { question: "Will I be involved during the development process?", answer: "Yes, we keep you involved at every stage with regular updates, feedback sessions, and approvals to ensure alignment with your vision.", meta: "Project Process", order: 10 },
  { question: "Do you provide regular project updates?", answer: "Absolutely. We share consistent updates through meetings, reports, or collaboration tools to keep you informed.", meta: "Project Process", order: 11 },
  { question: "What tools do you use for project management?", answer: "We use tools like Trello, Jira, Slack, and Figma to manage tasks, communication, and design collaboration efficiently.", meta: "Project Process", order: 12 },

  // UI/UX Design
  { question: "Do you offer custom UI/UX design services?", answer: "Yes, we create fully customized designs tailored to your brand, audience, and business goals.", meta: "UI/UX Design", order: 13 },
  { question: "How do you ensure a user-friendly design?", answer: "We follow user-centered design principles, focusing on usability, accessibility, and intuitive navigation.", meta: "UI/UX Design", order: 14 },
  { question: "Can you redesign my existing website/app?", answer: "Yes, we can revamp your current product to improve usability, performance, and visual appeal.", meta: "UI/UX Design", order: 15 },
  { question: "Do you conduct user research and testing?", answer: "We perform basic research and usability testing to ensure the design meets user expectations and solves real problems.", meta: "UI/UX Design", order: 16 },
  { question: "Will the design be mobile-friendly and responsive?", answer: "All our designs are fully responsive, ensuring seamless performance across mobile, tablet, and desktop devices.", meta: "UI/UX Design", order: 17 },
  { question: "How many revisions are included in the design process?", answer: "We offer multiple revisions based on feedback to ensure the final design meets your expectations.", meta: "UI/UX Design", order: 18 },

  // Development Services
  { question: "What technologies do you use for development?", answer: "We use modern technologies like React, Next.js, Node.js, and other scalable frameworks based on project requirements.", meta: "Development Services", order: 19 },
  { question: "Do you build both websites and mobile applications?", answer: "Yes, we develop responsive websites and high-performance mobile applications for Android and iOS platforms.", meta: "Development Services", order: 20 },
  { question: "Can you integrate third-party APIs and tools?", answer: "Absolutely. We can integrate payment gateways, CRMs, analytics tools, and other third-party services.", meta: "Development Services", order: 21 },
  { question: "Do you offer scalable and secure solutions?", answer: "Yes, we build scalable architectures with strong security practices to ensure long-term performance and safety.", meta: "Development Services", order: 22 },
  { question: "Will I own the source code after completion?", answer: "Yes, once the project is completed and paid for, full ownership of the source code is transferred to you.", meta: "Development Services", order: 23 },
  { question: "Do you provide backend and frontend both?", answer: "Yes, we offer complete full-stack development services including both frontend and backend solutions.", meta: "Development Services", order: 24 },

  // Pricing & Payments
  { question: "How much does a typical project cost?", answer: "Project costs depend on scope, features, and complexity. We provide a customized quote after understanding your requirements.", meta: "Pricing & Payments", order: 25 },
  { question: "Do you offer fixed pricing or hourly rates?", answer: "We offer both fixed-price and hourly models based on the project type and client preference.", meta: "Pricing & Payments", order: 26 },
  { question: "Are there any hidden charges?", answer: "No, we maintain full transparency. All costs are discussed and agreed upon before starting the project.", meta: "Pricing & Payments", order: 27 },
  { question: "What is your payment structure?", answer: "We usually follow a milestone-based payment structure to ensure flexibility and trust.", meta: "Pricing & Payments", order: 28 },
  { question: "Do you offer flexible payment plans?", answer: "Yes, we can customize payment plans based on project size and client requirements.", meta: "Pricing & Payments", order: 29 },
  { question: "Can I get a custom quote for my project?", answer: "Absolutely. Share your requirements, and we will provide a tailored quote.", meta: "Pricing & Payments", order: 30 },

  // Support & Maintenance
  { question: "Do you provide support after project launch?", answer: "Yes, we offer ongoing support after project delivery to ensure everything runs smoothly.", meta: "Support & Maintenance", order: 31 },
  { question: "What kind of maintenance services do you offer?", answer: "We provide updates, bug fixes, performance optimization, and feature enhancements.", meta: "Support & Maintenance", order: 32 },
  { question: "How quickly do you handle critical issues?", answer: "We aim to resolve issues as quickly as possible, usually within 24-48 hours depending on severity.", meta: "Support & Maintenance", order: 33 },
  { question: "Do you offer website/app updates?", answer: "Yes, we can update your product regularly to keep it secure and up-to-date.", meta: "Support & Maintenance", order: 34 },
  { question: "Is technical support included in the package?", answer: "Basic support is included, with extended support plans available if needed.", meta: "Support & Maintenance", order: 35 },
  { question: "Can I request new features after launch?", answer: "Yes, we can add new features and improvements even after the project is live.", meta: "Support & Maintenance", order: 36 },

  // Security & Confidentiality
  { question: "How do you ensure data security?", answer: "We follow best practices including secure coding, encryption, and regular security checks.", meta: "Security & Confidentiality", order: 37 },
  { question: "Will my project idea remain confidential?", answer: "Yes, we respect your privacy and ensure your ideas remain protected.", meta: "Security & Confidentiality", order: 38 },
  { question: "Do you sign NDA agreements?", answer: "Yes, we are happy to sign NDA agreements before starting any project.", meta: "Security & Confidentiality", order: 39 },
  { question: "How do you handle sensitive user data?", answer: "We follow strict data protection practices and comply with relevant security standards.", meta: "Security & Confidentiality", order: 40 },
  { question: "Do you follow industry security standards?", answer: "Yes, we adhere to modern security protocols and industry best practices.", meta: "Security & Confidentiality", order: 41 },
  { question: "What measures do you take to prevent cyber threats?", answer: "We implement firewalls, secure authentication, and regular monitoring to protect against threats.", meta: "Security & Confidentiality", order: 42 },

  // SEO & Digital Growth
  { question: "Do you offer SEO services?", answer: "Yes, we provide basic SEO optimization to improve your website visibility.", meta: "SEO & Digital Growth", order: 43 },
  { question: "Will my website be optimized for search engines?", answer: "Yes, we follow SEO-friendly practices including proper structure, speed optimization, and meta setup.", meta: "SEO & Digital Growth", order: 44 },
  { question: "Do you help with website performance optimization?", answer: "Yes, we optimize loading speed and performance for better user experience and rankings.", meta: "SEO & Digital Growth", order: 45 },
  { question: "Can you improve my website speed?", answer: "Absolutely. We optimize images, code, and server performance to ensure fast loading times.", meta: "SEO & Digital Growth", order: 46 },
  { question: "Do you provide analytics and tracking setup?", answer: "Yes, we integrate tools like Google Analytics to track performance and user behavior.", meta: "SEO & Digital Growth", order: 47 },
  { question: "Will my website be mobile and SEO friendly?", answer: "Yes, all our websites are responsive and built with SEO best practices.", meta: "SEO & Digital Growth", order: 48 },
];

const blogPosts = [
  {
    title: "Why Most Business Software Fails After Development",
    excerpt:
      "Teams ship features on time, yet adoption stalls and value fades. Here is what we see on real projects—and how to avoid the same traps.",
    category: "Technology",
    author: "Vivek Sahani",
    date: "March 23, 2024",
    image: "/Home/services/slide1.webp",
    order: 1,
  },
  {
    title: "Turning Marketing Data Into Repeatable Experiments",
    excerpt:
      "A practical framework for hypotheses, measurement, and iteration so campaigns improve quarter over quarter instead of resetting from scratch.",
    category: "Marketing",
    author: "Vivek Sahani",
    date: "April 2, 2024",
    image: "/Home/services/slide2.webp",
    order: 2,
  },
  {
    title: "Aligning Stakeholders Before the First Sprint",
    excerpt:
      "Short workshops and decision logs that reduce rework, keep scope honest, and make delivery predictable for business and engineering.",
    category: "Business",
    author: "Vivek Sahani",
    date: "April 18, 2024",
    image: "/Home/services/digital-marketing.webp",
    order: 3,
  },
  {
    title: "What We Learned Migrating a Legacy Checkout Flow",
    excerpt:
      "Risk controls, phased rollouts, and monitoring that kept revenue stable while we modernized APIs and front-end performance.",
    category: "Case Studies",
    author: "Vivek Sahani",
    date: "May 6, 2024",
    image: "/Home/services/ui-ux.webp",
    order: 4,
  },
  {
    title: "Practical Guardrails for Shipping AI Features",
    excerpt:
      "Evaluation sets, human review, and logging patterns that help teams ship AI safely without slowing experimentation to a crawl.",
    category: "AI Solutions",
    author: "Vivek Sahani",
    date: "May 21, 2024",
    image: "/Home/services/cloud-computing.webp",
    order: 5,
  },
  {
    title: "E-Commerce Performance Budgets That Actually Stick",
    excerpt:
      "How we set budgets with merchandising and marketing teams, then enforce them in CI so storefront speed does not regress quietly.",
    category: "E-Commerce",
    author: "Vivek Sahani",
    date: "June 3, 2024",
    image: "/Home/services/slide5.webp",
    order: 6,
  },
];

const portfolioWorkItems = [
  {
    title: "Akasa Air",
    tag: "Mobile Apps",
    category: "Mobile Apps",
    description:
      "We contributed to a high-traffic airline booking and scheduling ecosystem, where system reliability, uptime.",
    image: "/Home/produced/Akasa Air.webp",
    order: 1,
  },
  {
    title: "Blocktech Platform",
    tag: "Web Development",
    category: "Web Development",
    description:
      "Enterprise CRM handling high-volume leads. Workflow automation and AWS deployment for scale and reliability.",
    image: "/Home/produced/blocktech.svg",
    order: 2,
  },
  {
    title: "NFTtrace",
    tag: "AI Solutions",
    category: "AI Solutions",
    description:
      "Blockchain traceability platform emphasizing secure infrastructure, transparency, and deployment reliability.",
    image: "/Home/produced/NFtrace.svg",
    order: 3,
  },
  {
    title: "Dun & Bradstreet India",
    tag: "Consulting",
    category: "Consulting",
    description:
      "Enterprise integrations supporting compliance, performance, and data governance for global data products.",
    image: "/Home/produced/DunBradstreetIndia.webp",
    order: 4,
  },
  {
    title: "Trukky",
    tag: "E-Commerce",
    category: "E-Commerce",
    description:
      "Real-time logistics marketplace connecting customers with transport providers and live booking flows.",
    image: "/Home/produced/Trukky.webp",
    order: 5,
  },
  {
    title: "Transporteca",
    tag: "Cloud & DevOps",
    category: "Cloud & DevOps",
    description:
      "Multi-vendor freight platform with resilient APIs, monitoring, and cloud pipelines for peak traffic.",
    image: "/Home/produced/Transporteca .webp",
    order: 6,
  },
  {
    title: "Intellectyx Engagement",
    tag: "Consulting",
    category: "Consulting",
    description:
      "Strategy and delivery for digital initiatives with measurable outcomes and stakeholder alignment.",
    image: "/Home/services/slide1.webp",
    order: 7,
  },
  {
    title: "Cloud Services Rollout",
    tag: "Cloud & DevOps",
    category: "Cloud & DevOps",
    description:
      "Migration and DevOps automation improving uptime, observability, and release cadence for client teams.",
    image: "/Home/services/cloud-computing.webp",
    order: 8,
  },
  {
    title: "Commerce Experience",
    tag: "E-Commerce",
    category: "E-Commerce",
    description:
      "Conversion-focused storefront and checkout flows with performance budgets and analytics integration.",
    image: "/Home/services/slide2.webp",
    order: 9,
  },
];

const industries = [
  {
    title: "eCommerce",
    icon: "/service/industriesicon/card3.svg",
    blackIcon: "/service/industriesicon/card3black.svg",
    description:
      "Developing scalable eCommerce platforms that deliver seamless shopping experiences and growth.",
    order: 1,
  },
  {
    title: "Fintech",
    icon: "/service/industriesicon/card2.svg",
    blackIcon: "/service/industriesicon/card2black.svg",
    description:
      "Building secure, compliant fintech solutions that simplify transactions and enhance financial access.",
    order: 2,
  },
  {
    title: "Transportation & Logistics",
    icon: "/service/industriesicon/card4.svg",
    blackIcon: "/service/industriesicon/card4black.svg",
    description:
      "Optimizing logistics operations with smart digital solutions for efficiency and real-time tracking.",
    order: 3,
  },
  {
    title: "Healthcare",
    icon: "/service/industriesicon/card1.svg",
    blackIcon: "/service/industriesicon/card1black.svg",
    description:
      "Designing reliable digital systems that streamline operations and improve patient care experiences.",
    order: 4,
  },
  {
    title: "Telecom",
    icon: "/service/industriesicon/telecom.svg",
    blackIcon: "/service/industriesicon/telecom-black.svg",
    description:
      "Creating robust digital platforms that support connectivity, scalability, and customer satisfaction.",
    order: 5,
  },
  {
    title: "Advertising & Marketing",
    icon: "/service/industriesicon/advertising.svg",
    blackIcon: "/service/industriesicon/advertising-black.svg",
    description:
      "Crafting data-driven digital strategies that boost brand visibility and customer engagement.",
    order: 6,
  },
  {
    title: "Media & Entertainment",
    icon: "/service/industriesicon/media.svg",
    blackIcon: "/service/industriesicon/media-black.svg",
    description:
      "Creating immersive digital experiences that engage audiences and amplify storytelling across platforms.",
    order: 7,
  },
  {
    title: "Public Sector & Government",
    icon: "/service/industriesicon/gov.svg",
    blackIcon: "/service/industriesicon/gov-black.svg",
    description:
      "Delivering secure, scalable digital solutions that enhance governance, transparency, and citizen services.",
    order: 8,
  },
  {
    title: "EdTech",
    icon: "/service/industriesicon/card5.svg",
    blackIcon: "/service/industriesicon/card5black.svg",
    description:
      "Building interactive learning platforms that improve engagement, accessibility, and educational outcomes.",
    order: 9,
  },
  {
    title: "On-Demand Platforms",
    icon: "/service/industriesicon/card8.svg",
    blackIcon: "/service/industriesicon/card8black.svg",
    description:
      "Scalable on-demand applications connecting users with real-time services.",
    order: 10,
  },
  {
    title: "Sports",
    icon: "/service/industriesicon/sports.svg",
    blackIcon: "/service/industriesicon/sports-black.svg",
    description:
      "Designing engaging digital experiences that connect fans, athletes, and sports organizations.",
    order: 11,
  },
  {
    title: "Gaming",
    icon: "/service/industriesicon/card7.svg",
    blackIcon: "/service/industriesicon/card7black.svg",
    description:
      "High-performance gaming platforms powered by scalable cloud technologies.",
    order: 12,
  },
];

const features = [
  {
    title: "We Review Your Requirement",
    description: "We carefully read your message to understand your actual need, not just surface details.",
    image: "/Home/produced/blocktech.svg",
    order: 1,
  },
  {
    title: "We Connect With You",
    description: "If needed, we reach out to ask a few simple questions for better clarity.",
    image: "/Home/produced/blocktech.svg",
    order: 2,
  },
  {
    title: "We Suggest a Plan",
    description: "You get a clear and practical approach based on your requirement.",
    image: "/Home/produced/blocktech.svg",
    order: 3,
  },
  {
    title: "You Decide the Next Step",
    description: "No pressure. You can move forward only if it makes sense for you.",
    image: "/Home/produced/blocktech.svg",
    order: 4,
  },
];

const whatWeDoCards = [
  {
    imageSrc: "/service/whatwedo/card1.webp",
    imageAlt: "Consulting services",
    icon: "/service/whatwedo/icon1.svg",
    title: "Consulting Services",
    description:
      "Our consulting services help businesses make informed decisions, reduce risks, and plan technology initiatives effectively.",
    buttonLabel: "Talk to us",
    servicesColumns: [
      {
        items: [
          { label: "Technology Consulting" },
          { label: "Digital Transformation Consulting" },
          { label: "Product Strategy & Roadmapping" },
          { label: "Business Process Analysis" },
        ],
      },
      {
        items: [
          { label: "Startup & MVP Consulting" },
          { label: "System Architecture & Planning" },
          { label: "IT Audit & Optimization" },
          { label: "Process Automation Consulting" },
        ],
      },
    ],
    order: 1,
  },
  {
    imageSrc: "/service/whatwedo/card2.webp",
    imageAlt: "Marketing Services",
    icon: "/service/whatwedo/icon2.svg",
    title: "Marketing Services",
    description:
      "Our marketing services help businesses grow their reach, engagement, and conversions through data-driven strategies.",
    buttonLabel: "Talk to us",
    servicesColumns: [
      {
        items: [
          { label: "Digital Marketing Strategy" },
          { label: "Performance & Paid Marketing" },
          { label: "Content Marketing" },
          { label: "Conversion Rate Optimization" },
        ],
      },
      {
        items: [
          { label: "Search Engine Optimization (SEO)" },
          { label: "Social Media Marketing" },
          { label: "Branding & Visual Identity" },
          { label: "Marketing Automation" },
        ],
      },
    ],
    order: 2,
  },
  {
    imageSrc: "/service/whatwedo/card3.webp",
    imageAlt: "IT Solutions Services",
    icon: "/service/whatwedo/icon3.svg",
    title: "IT Solutions Services",
    description:
      "Our IT solutions help businesses build scalable, secure, and high-performance digital products and infrastructure.",
    buttonLabel: "Talk to us",
    servicesColumns: [
      {
        items: [
          { label: "Web Application Development" },
          { label: "Data Science & AI Solutions" },
          { label: "Content Management Systems" },
          { label: "Enterprise Software Solutions" },
        ],
      },
      {
        items: [
          { label: "Cloud & DevOps Solutions" },
          { label: "E-Commerce Solutions" },
          { label: "Server Setup & Configuration" },
          { label: "Application Customization & Integration" },
        ],
      },
    ],
    order: 3,
  },
];

const jobOpenings = [
  {
    title: "Backend Developer",
    experience: "1-3 Years",
    type: "Full-Time",
    location: "Remote",
    description:
      "We are looking for a skilled backend developer to build secure, scalable APIs and optimize server-side performance for high-quality digital applications.",
    order: 1,
  },
  {
    title: "Full Stack Developer",
    experience: "1-3 Years",
    type: "Full-Time",
    location: "Remote",
    description:
      "Join our team to develop end-to-end web applications, manage databases, and deliver seamless, scalable digital experiences.",
    order: 2,
  },
  {
    title: "UI/UX Designer",
    experience: "1-3 Years",
    type: "Full-Time",
    location: "Remote",
    description:
      "We seek a creative designer to craft intuitive user experiences and visually engaging interfaces for modern digital products.",
    order: 3,
  },
  {
    title: "Digital Marketing",
    experience: "1-3 Years",
    type: "Full-Time",
    location: "Remote",
    description:
      "Help drive growth through SEO, paid campaigns, and data-driven marketing strategies that increase visibility and conversions.",
    order: 4,
  },
];

const privacyPolicyTopics = [
  {
    title: "Information We Collect",
    paragraphs: ["We may collect the following types of information:"],
    bullets: [
      "Personal Information: Name, email address, phone number, and other details you provide through contact forms.",
      "Project Information: Details related to your business, requirements, and project discussions.",
      "Technical Data: IP address, browser type, device information, and website usage data.",
    ],
    order: 1,
  },
  {
    title: "How We Use Your Information",
    paragraphs: ["We use your information to:"],
    bullets: [
      "Understand your requirements and provide relevant services",
      "Communicate with you regarding inquiries or projects",
      "Improve our website and user experience",
      "Send important updates or service-related information",
    ],
    order: 2,
  },
  {
    title: "Data Sharing & Disclosure",
    paragraphs: [
      "We do not sell, trade, or rent your personal information.",
      "Your data may only be shared with:",
    ],
    bullets: [
      "Trusted team members or partners involved in your project",
      "Legal authorities, if required by law",
    ],
    order: 3,
  },
  {
    title: "Data Security",
    paragraphs: [
      "We implement appropriate security measures to protect your data from unauthorized access, misuse, or disclosure.",
      "However, no online system is 100% secure, and we encourage users to share information responsibly.",
    ],
    bullets: [],
    order: 4,
  },
  {
    title: "Cookies & Tracking Technologies",
    paragraphs: ["Our website may use cookies to:"],
    bullets: [
      "Enhance user experience",
      "Analyze website traffic and performance",
      "You can choose to disable cookies through your browser settings.",
    ],
    order: 5,
  },
  {
    title: "Third-Party Services",
    paragraphs: [
      "We may use third-party tools (such as analytics or integrations) that may collect limited data. These services operate under their own privacy policies.",
    ],
    bullets: [],
    order: 6,
  },
  {
    title: "Your Rights",
    paragraphs: ["You have the right to:"],
    bullets: [
      "Access the personal data we hold about you",
      "Request correction or deletion of your data",
      "Withdraw consent for data usage",
      "To exercise these rights, please contact us.",
    ],
    order: 7,
  },
  {
    title: "Data Retention",
    paragraphs: [
      "We retain your information only as long as necessary for business, legal, or operational purposes.",
    ],
    bullets: [],
    order: 8,
  },
  {
    title: "Updates to This Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. Changes will be reflected on this page with an updated date.",
    ],
    bullets: [],
    order: 9,
  },
  {
    title: "Contact Us",
    paragraphs: ["If you have any questions about this Privacy Policy, you can contact us at:"],
    bullets: ["Email: info@technogetic.com", "Phone: +91-XXXXXXXXXX"],
    order: 10,
  },
];

const termsAndConditionsTopics = [
  {
    title: "Acceptance of Terms",
    paragraphs: [
      "By accessing or using any services provided by Technogetic, you confirm that you have read, understood, and agree to be bound by these Terms & Conditions.",
      "If you do not agree with any part of these terms, please do not use our services.",
    ],
    bullets: [],
    order: 1,
  },
  {
    title: "Services Provided",
    paragraphs: [
      "Technogetic offers a range of digital services including, but not limited to:",
    ],
    bullets: [
      "Custom software development",
      "Web and mobile application development",
      "UI/UX design",
      "Cloud architecture and DevOps",
      "Digital marketing and SEO",
      "IT consulting and strategy",
    ],
    order: 2,
  },
  {
    title: "Client Responsibilities",
    paragraphs: ["As a client, you agree to:"],
    bullets: [
      "Provide accurate and complete information required for project delivery",
      "Respond to communications in a timely manner to avoid project delays",
      "Review and approve deliverables within agreed timelines",
      "Ensure you have the legal rights to any content, assets, or materials you provide to us",
    ],
    order: 3,
  },
  {
    title: "Intellectual Property",
    paragraphs: [
      "Upon full payment of all agreed fees, ownership of the final deliverables (source code, designs, and related assets) is transferred to the client.",
      "Technogetic retains the right to showcase completed work in its portfolio unless a confidentiality agreement is in place.",
      "Any pre-existing tools, frameworks, or proprietary methodologies used during development remain the property of Technogetic.",
    ],
    bullets: [],
    order: 4,
  },
  {
    title: "Payment Terms",
    paragraphs: [
      "All projects are subject to a mutually agreed payment schedule outlined in the project proposal or contract.",
    ],
    bullets: [
      "A deposit may be required before work commences",
      "Milestone-based payments are due upon completion of each agreed phase",
      "Final delivery will be made only after full payment is received",
      "Late payments may result in project delays or suspension of services",
    ],
    order: 5,
  },
  {
    title: "Confidentiality",
    paragraphs: [
      "Both parties agree to keep confidential any proprietary or sensitive information shared during the course of the engagement.",
      "We are happy to sign a Non-Disclosure Agreement (NDA) upon request before project discussions begin.",
    ],
    bullets: [],
    order: 6,
  },
  {
    title: "Limitation of Liability",
    paragraphs: [
      "Technogetic shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our services.",
      "Our total liability in any matter related to the services provided shall not exceed the total fees paid by the client for the specific project in question.",
    ],
    bullets: [],
    order: 7,
  },
  {
    title: "Revisions & Change Requests",
    paragraphs: [
      "Revisions within the agreed project scope are included as specified in the project proposal.",
      "Any changes that fall outside the original scope will be treated as new work and may be subject to additional charges and revised timelines.",
    ],
    bullets: [],
    order: 8,
  },
  {
    title: "Termination",
    paragraphs: [
      "Either party may terminate the engagement with written notice if the other party materially breaches these terms and fails to remedy the breach within 14 days.",
      "In the event of termination, the client is responsible for payment of all work completed up to the termination date.",
    ],
    bullets: [],
    order: 9,
  },
  {
    title: "Governing Law",
    paragraphs: [
      "These Terms & Conditions are governed by and construed in accordance with applicable laws. Any disputes arising from these terms shall be resolved through mutual negotiation or, if necessary, through appropriate legal channels.",
    ],
    bullets: [],
    order: 10,
  },
  {
    title: "Updates to These Terms",
    paragraphs: [
      "Technogetic reserves the right to update these Terms & Conditions at any time. Changes will be reflected on this page with an updated date. Continued use of our services after changes constitutes acceptance of the revised terms.",
    ],
    bullets: [],
    order: 11,
  },
  {
    title: "Contact Us",
    paragraphs: [
      "If you have any questions or concerns about these Terms & Conditions, please reach out to us:",
    ],
    bullets: ["Email: info@technogetic.com", "Phone: +91-XXXXXXXXXX"],
    order: 12,
  },
];

const growthItems = [
  {
    title: "Learning & Certification Support",
    description: "We support continuous learning through certifications, courses, and training.",
    icon: "/career/Growth/verified.svg",
    blackIcon: "/career/Growth/verified-black.svg",
    order: 1,
  },
  {
    title: "Performance-Based Incentives",
    description: "Earn rewards and bonuses based on measurable performance and achievements.",
    icon: "/career/Growth/graph.svg",
    blackIcon: "/career/Growth/graph-black.svg",
    order: 2,
  },
  {
    title: "Flexible Work Hours",
    description: "Enjoy flexible schedules that promote productivity and work-life balance.",
    icon: "/career/Growth/time.svg",
    blackIcon: "/career/Growth/time-black.svg",
    order: 3,
  },
  {
    title: "Skill Development Programs",
    description: "Participate in structured programs designed to enhance technical expertise.",
    icon: "/career/Growth/men.svg",
    blackIcon: "/career/Growth/men-black.svg",
    order: 4,
  },
  {
    title: "Supportive Team Culture",
    description: "Work within a collaborative environment that values respect and teamwork.",
    icon: "/career/Growth/hand.svg",
    blackIcon: "/career/Growth/hand-black.svg",
    order: 5,
  },
  {
    title: "Career Progression Opportunities",
    description: "Advance your career through clear growth paths and leadership opportunities.",
    icon: "/career/Growth/stair.svg",
    blackIcon: "/career/Growth/stair-black.svg",
    order: 6,
  },
];

// ── Seed runner ───────────────────────────────────────────────────────────────

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in .env");
  }

  await mongoose.connect(uri);
  console.log("✅ Connected to MongoDB");

  // Wipe existing data and re-insert (idempotent)
  await Promise.all([
    ProductModel.deleteMany({}),
    ServiceModel.deleteMany({}),
    PartnerModel.deleteMany({}),
    TechnologyModel.deleteMany({}),
    FAQModel.deleteMany({}),
    BlogPostModel.deleteMany({}),
    PortfolioWorkModel.deleteMany({}),
    IndustryModel.deleteMany({}),
    FeatureModel.deleteMany({}),
    WhatWeDoModel.deleteMany({}),
    JobOpeningModel.deleteMany({}),
    GrowthItemModel.deleteMany({}),
    PrivacyPolicyModel.deleteMany({}),
    TermsAndConditionsModel.deleteMany({}),
  ]);
  console.log(" Cleared existing collections");

  await Promise.all([
    ProductModel.insertMany(products),
    ServiceModel.insertMany(services),
    PartnerModel.insertMany(partners),
    TechnologyModel.insertMany(technologies),
    FAQModel.insertMany(faqs),
    BlogPostModel.insertMany(blogPosts),
    PortfolioWorkModel.insertMany(portfolioWorkItems),
    IndustryModel.insertMany(industries),
    FeatureModel.insertMany(features),
    WhatWeDoModel.insertMany(whatWeDoCards),
    JobOpeningModel.insertMany(jobOpenings),
    GrowthItemModel.insertMany(growthItems),
    PrivacyPolicyModel.insertMany(privacyPolicyTopics),
    TermsAndConditionsModel.insertMany(termsAndConditionsTopics),
  ]);

  console.log("🌱 Seeded:");
  console.log(`• ${products.length} products`);
  console.log(`• ${services.length} services`);
  console.log(`• ${partners.length} partners`);
  console.log(`• ${technologies.length} technologies`);
  console.log(`• ${faqs.length} FAQs`);
  console.log(`• ${blogPosts.length} blog posts`);
  console.log(`• ${portfolioWorkItems.length} portfolio items`);
  console.log(`• ${industries.length} industries`);
  console.log(`• ${features.length} features`);
  console.log(`• ${whatWeDoCards.length} what-we-do cards`);
  console.log(`• ${jobOpenings.length} job openings`);
  console.log(`• ${growthItems.length} growth items`);
  console.log(`• ${privacyPolicyTopics.length} privacy policy topics`);
  console.log(`• ${termsAndConditionsTopics.length} terms & conditions topics`);

  await mongoose.disconnect();
  console.log("✅ Done — disconnected from MongoDB");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
