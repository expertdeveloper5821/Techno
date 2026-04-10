export const BLOG_FILTER_LABELS = [
  "All",
  "Technology",
  "Marketing",
  "Business",
  "Case Studies",
  "AI Solutions",
  "E-Commerce",
] as const;

export type BlogFilterCategory = (typeof BLOG_FILTER_LABELS)[number];

export type BlogPostCategory = Exclude<BlogFilterCategory, "All">;

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: BlogPostCategory;
  author: string;
  date: string;
  image: string;
}

const DEFAULT_THUMB = "/Home/services/slide1.png";

const BASE_POSTS: Omit<BlogPost, "id">[] = [
  {
    title: "Why Most Business Software Fails After Development",
    excerpt:
      "Teams ship features on time, yet adoption stalls and value fades. Here is what we see on real projects—and how to avoid the same traps.",
    category: "Technology",
    author: "Vivek Sahani",
    date: "March 23, 2024",
    image: DEFAULT_THUMB,
  },
  {
    title: "Turning Marketing Data Into Repeatable Experiments",
    excerpt:
      "A practical framework for hypotheses, measurement, and iteration so campaigns improve quarter over quarter instead of resetting from scratch.",
    category: "Marketing",
    author: "Vivek Sahani",
    date: "April 2, 2024",
    image: "/Home/services/slide2.png",
  },
  {
    title: "Aligning Stakeholders Before the First Sprint",
    excerpt:
      "Short workshops and decision logs that reduce rework, keep scope honest, and make delivery predictable for business and engineering.",
    category: "Business",
    author: "Vivek Sahani",
    date: "April 18, 2024",
    image: "/Home/services/digital-marketing.jpg",
  },
  {
    title: "What We Learned Migrating a Legacy Checkout Flow",
    excerpt:
      "Risk controls, phased rollouts, and monitoring that kept revenue stable while we modernized APIs and front-end performance.",
    category: "Case Studies",
    author: "Vivek Sahani",
    date: "May 6, 2024",
    image: "/Home/services/ui-ux.jpg",
  },
  {
    title: "Practical Guardrails for Shipping AI Features",
    excerpt:
      "Evaluation sets, human review, and logging patterns that help teams ship AI safely without slowing experimentation to a crawl.",
    category: "AI Solutions",
    author: "Vivek Sahani",
    date: "May 21, 2024",
    image: "/Home/services/cloud-computing.jpg",
  },
  {
    title: "E‑Commerce Performance Budgets That Actually Stick",
    excerpt:
      "How we set budgets with merchandising and marketing teams, then enforce them in CI so storefront speed does not regress quietly.",
    category: "E-Commerce",
    author: "Vivek Sahani",
    date: "June 3, 2024",
    image: "/Home/services/slide5.png",
  },
];

/** Enough rows for pagination (6 per page × 5 pages). */
const TARGET_COUNT = 30;

export const blogPosts: BlogPost[] = Array.from(
  { length: TARGET_COUNT },
  (_, i) => {
    const base = BASE_POSTS[i % BASE_POSTS.length];
    const cycle = Math.floor(i / BASE_POSTS.length);
    const title =
      cycle === 0
        ? base.title
        : `${base.title} (${cycle + 1})`;
    return {
      id: `blog-${i + 1}`,
      ...base,
      title,
    };
  }
);

export const BLOG_ITEMS_PER_PAGE = 6;
