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
  {
    question: "How long does a typical project take?",
    answer:
      "Most MVPs launch in 8-12 weeks. Larger projects break into phases, so you see working software every two weeks, not after months.",
    meta: "Discovery",
    order: 1,
  },
  {
    question: "Do you work alongside our existing team?",
    answer:
      "Yes. We integrate directly—same tools, same standups, same accountability. Think of us as an extension, not a vendor.",
    meta: "Collaboration",
    order: 2,
  },
  {
    question: "What if requirements change during development?",
    answer:
      "We adapt. Priorities shift, and we understand that. Well re-scope, update timelines, and keep you informed on any cost impacts.",
    meta: "Systems",
    order: 3,
  },
  {
    question: "Can we see examples of your work?",
    answer:
      "Absolutely. We share relevant case studies in our first call. Some are under NDA, but we have plenty.",
    meta: "Quality",
    order: 4,
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Yes. We offer flexible retainers for maintenance and feature additions. Many clients keep engineers long-term.",
    meta: "Quality",
    order: 5,
  },
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

  await mongoose.disconnect();
  console.log("✅ Done — disconnected from MongoDB");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
