export type MarketingPageHero = {
  heroKicker: string;
  heroHeadingLine1: string;
  heroHeadingLine2: string;
  heroSubheading: string;
};

export const marketingHeroDefaults = {
  howItWorks: {
    heroKicker: "What I Offer",
    heroHeadingLine1: "HOW IT",
    heroHeadingLine2: "WORKS",
    heroSubheading:
      "All training is delivered virtually—no in-person PT for now. A comprehensive approach that addresses your unique goals, lifestyle, and preferences.",
  },
  packages: {
    heroKicker: "Investment in Yourself",
    heroHeadingLine1: "TRAINING",
    heroHeadingLine2: "PACKAGES",
    heroSubheading:
      "Choose the level of support that fits your goals. All packages include access to the Beckford Moves app.",
  },
  successStories: {
    heroKicker: "Real Results",
    heroHeadingLine1: "SUCCESS",
    heroHeadingLine2: "STORIES",
    heroSubheading:
      "Real transformations from real people. See what's possible when you commit to your health.",
  },
  fstMassageTherapy: {
    heroKicker: "Bodywork & Recovery Services",
    heroHeadingLine1: "MASSAGE THERAPY",
    heroHeadingLine2: "& FST",
    heroSubheading:
      "Specialized bodywork services to improve mobility, reduce pain, and accelerate recovery. Combining registered massage therapy and fascial stretch therapy for optimal results.",
  },
  blog: {
    heroKicker: "Knowledge Base",
    heroHeadingLine1: "MOVE WITH",
    heroHeadingLine2: "SEAN",
    heroSubheading:
      "Tips, insights, and guidance on training, nutrition, recovery, and building a healthier lifestyle.",
  },
  contact: {
    heroKicker: "Let's Connect",
    heroHeadingLine1: "GET IN",
    heroHeadingLine2: "TOUCH",
    heroSubheading:
      "Ready to start your transformation? Book a free consultation or reach out with any questions.",
  },
} satisfies Record<string, MarketingPageHero>;
