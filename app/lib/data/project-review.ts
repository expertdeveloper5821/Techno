/**
 * Project review / case study content — single source for the projects page.
 * Add more projects here later and select by slug or route param.
 */

export interface ProjectAboutBlock {
  sectionTitle: string;
  imageSrc: string;
  imageAlt: string;
  paragraphs: string[];
  technologies: string[];
}

export interface ProjectHeroBlock {
  title: string;
  description: string;
  breadcrumbCurrent: string;
  /** Public path for hero background image */
  backgroundImageSrc: string;
}

/** Paragraph-only block (Challenge, What We Built, Outcome). */
export interface CaseStudyParagraphSection {
  id: string;
  title: string;
  variant: "paragraphs";
  paragraphs: string[];
}

/** Intro + bullet list (Key Features). */
export interface CaseStudyFeaturesSection {
  id: string;
  title: string;
  variant: "features";
  intro: string;
  bullets: string[];
}

export type CaseStudySection =
  | CaseStudyParagraphSection
  | CaseStudyFeaturesSection;

export interface ProjectCaseStudyBlock {
  sections: CaseStudySection[];
}

export interface ProjectReviewContent {
  id: string;
  hero: ProjectHeroBlock;
  about: ProjectAboutBlock;
  caseStudy: ProjectCaseStudyBlock;
}

export const projectReviewAkasa: ProjectReviewContent = {
  id: "akasa-air",
  hero: {
    title: "Akasa Air",
    description:
      "Built a high-performance booking and scheduling system to manage airline operations smoothly, ensuring fast response times and reliable performance during high user traffic.",
    breadcrumbCurrent: "Akasa Air",
    backgroundImageSrc: "contact-hero.wwebp",
  },
  about: {
    sectionTitle: "About the Project",
    imageSrc: "/Home/produced/Akasa Air.png",
    imageAlt: "Akasa Air flight booking website interface",
    paragraphs: [
      "Akasa Air needed a reliable system to manage flight bookings and scheduling efficiently. Their operations required handling a large number of users without delays, especially during peak traffic periods when performance becomes critical.",
      "The goal was to build a system that could maintain speed, stability, and accuracy while processing booking data in real time. It also needed to be scalable so that it could support growing demand without affecting overall system performance.",
    ],
    technologies: ["React.js", "Node.js", "PostgreSQL", "Redis"],
  },
  caseStudy: {
    sections: [
      {
        id: "challenge",
        title: "The Challenge",
        variant: "paragraphs",
        paragraphs: [
          "The existing system was not able to handle high traffic efficiently, especially during peak booking periods. Users experienced delays, slow response times, and occasional disruptions while completing bookings.",
          "Managing large volumes of booking data and scheduling operations was becoming increasingly complex. These issues were affecting both the user experience and the internal workflow, making it difficult to maintain smooth and reliable operations.",
        ],
      },
      {
        id: "what-we-built",
        title: "What We Built",
        variant: "paragraphs",
        paragraphs: [
          "We designed and developed a scalable booking and scheduling platform that could handle high user traffic without compromising performance. The system was built to ensure fast response times and a smooth booking experience across all stages.",
          "The backend was optimized for efficient data processing and stability, allowing the platform to manage large volumes of booking information. This helped streamline operations and maintain accuracy while reducing system load during peak usage.",
        ],
      },
      {
        id: "key-features",
        title: "Key Features",
        variant: "features",
        intro:
          "The platform was designed with a focus on performance, reliability, and ease of use, ensuring smooth booking operations even during high traffic.",
        bullets: [
          "Real-time booking and availability management",
          "Fast and responsive system performance",
          "Scalable backend to handle high user traffic",
          "Reliable scheduling and data processing",
          "Stable performance during peak usage",
        ],
      },
      {
        id: "outcome",
        title: "Outcome",
        variant: "paragraphs",
        paragraphs: [
          "The new system improved overall performance, especially during peak booking periods where delays were previously common. Users experienced faster interactions and a more reliable booking process.",
          "On the operational side, the platform made it easier to manage scheduling and booking data efficiently. This resulted in better system stability, smoother workflows, and a more consistent experience across the entire process.",
        ],
      },
    ],
  },
};

/** Default project shown on `/projects` — swap when you add routing. */
export const defaultProjectReview = projectReviewAkasa;
