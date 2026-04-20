export const PORTFOLIO_FILTER_LABELS = [
  "All",
  "Consulting",
  "Mobile Apps",
  "Web Development",
  "Cloud & DevOps",
  "AI Solutions",
  "E-Commerce",
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_FILTER_LABELS)[number];

export interface PortfolioWorkItem {
  id: string;
  title: string;
  tag: string;
  category: Exclude<PortfolioCategory, "All">;
  description: string;
  image: string;
}

const AKASA_DESC =
  "We contributed to a high-traffic airline booking and scheduling ecosystem, where system reliability, uptime.";

/** Seed rows reused to fill the grid + pagination (9 per page × 5 pages). */
const SEED: Omit<PortfolioWorkItem, "id">[] = [
  {
    title: "Akasa Air",
    tag: "Mobile Apps",
    category: "Mobile Apps",
    description: AKASA_DESC,
    image: "/Home/produced/Akasa Air.webp",
  },
  {
    title: "Blocktech Platform",
    tag: "Web Development",
    category: "Web Development",
    description:
      "Enterprise CRM handling high-volume leads. Workflow automation and AWS deployment for scale and reliability.",
    image: "/Home/produced/blocktech.svg",
  },
  {
    title: "NFTtrace",
    tag: "AI Solutions",
    category: "AI Solutions",
    description:
      "Blockchain traceability platform emphasizing secure infrastructure, transparency, and deployment reliability.",
    image: "/Home/produced/NFtrace.svg",
  },
  {
    title: "Dun & Bradstreet India",
    tag: "Consulting",
    category: "Consulting",
    description:
      "Enterprise integrations supporting compliance, performance, and data governance for global data products.",
    image: "/Home/produced/DunBradstreetIndia.webp",
  },
  {
    title: "Trukky",
    tag: "E-Commerce",
    category: "E-Commerce",
    description:
      "Real-time logistics marketplace connecting customers with transport providers and live booking flows.",
    image: "/Home/produced/Trukky.webp",
  },
  {
    title: "Transporteca",
    tag: "Cloud & DevOps",
    category: "Cloud & DevOps",
    description:
      "Multi-vendor freight platform with resilient APIs, monitoring, and cloud pipelines for peak traffic.",
    image: "/Home/produced/Transporteca .webp",
  },
  {
    title: "Intellectyx Engagement",
    tag: "Consulting",
    category: "Consulting",
    description:
      "Strategy and delivery for digital initiatives with measurable outcomes and stakeholder alignment.",
    image: "/Home/services/slide1.webp",
  },
  {
    title: "Cloud Services Rollout",
    tag: "Cloud & DevOps",
    category: "Cloud & DevOps",
    description:
      "Migration and DevOps automation improving uptime, observability, and release cadence for client teams.",
    image: "/Home/services/cloud-computing.webp",
  },
  {
    title: "Commerce Experience",
    tag: "E-Commerce",
    category: "E-Commerce",
    description:
      "Conversion-focused storefront and checkout flows with performance budgets and analytics integration.",
    image: "/Home/services/slide2.webp",
  },
  {
    title: "Commerce Experience",
    tag: "E-Commerce",
    category: "E-Commerce",
    description:
      "Conversion-focused storefront and checkout flows with performance budgets and analytics integration.",
    image: "/Home/services/slide2.webp",
  },
  {
    title: "Commerce Experience",
    tag: "E-Commerce",
    category: "E-Commerce",
    description:
      "Conversion-focused storefront and checkout flows with performance budgets and analytics integration.",
    image: "/Home/services/slide2.webp",
  },
  {
    title: "Commerce Experience",
    tag: "E-Commerce",
    category: "E-Commerce",
    description:
      "Conversion-focused storefront and checkout flows with performance budgets and analytics integration.",
    image: "/Home/services/slide2.webp",
  },
  {
    title: "Commerce Experience",
    tag: "E-Commerce",
    category: "E-Commerce",
    description:
      "Conversion-focused storefront and checkout flows with performance budgets and analytics integration.",
    image: "/Home/services/slide2.webp",
  },
  {
    title: "Commerce Experience",
    tag: "E-Commerce",
    category: "E-Commerce",
    description:
      "Conversion-focused storefront and checkout flows with performance budgets and analytics integration.",
    image: "/Home/services/slide2.webp",
  },
  {
    title: "Commerce Experience",
    tag: "E-Commerce",
    category: "E-Commerce",
    description:
      "Conversion-focused storefront and checkout flows with performance budgets and analytics integration.",
    image: "/Home/services/slide2.webp",
  },
  {
    title: "Commerce Experience",
    tag: "E-Commerce",
    category: "E-Commerce",
    description:
      "Conversion-focused storefront and checkout flows with performance budgets and analytics integration.",
    image: "/Home/services/slide2.webp",
  },
  {
    title: "Commerce Experience",
    tag: "E-Commerce",
    category: "E-Commerce",
    description:
      "Conversion-focused storefront and checkout flows with performance budgets and analytics integration.",
    image: "/Home/services/slide2.webp",
  },
  {
    title: "Commerce Experience",
    tag: "E-Commerce",
    category: "E-Commerce",
    description:
      "Conversion-focused storefront and checkout flows with performance budgets and analytics integration.",
    image: "/Home/services/slide2.webp",
  },
  
];

const TOTAL_ITEMS = 45;

export const portfolioWorkItems: PortfolioWorkItem[] = Array.from(
  { length: TOTAL_ITEMS },
  (_, i) => ({
    id: `pw-${i + 1}`,
    ...SEED[i % SEED.length],
  })
);

export const ITEMS_PER_PAGE = 9;
