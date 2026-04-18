import { config, fields, singleton } from "@keystatic/core";

/** Must match the repo Vercel builds from and where YAML content lives. Override with KEYSTATIC_GITHUB_REPO=owner/name if needed. */
const githubRepo = (process.env.KEYSTATIC_GITHUB_REPO ??
  "ackersml/beckford-moves") as `${string}/${string}`;

const marketingHeroSchema = {
  heroKicker: fields.text({ label: "Eyebrow / badge" }),
  heroHeadingLine1: fields.text({ label: "Heading line 1 (before accent)" }),
  heroHeadingLine2: fields.text({ label: "Heading line 2 (accent gradient)" }),
  heroSubheading: fields.text({ label: "Subheading", multiline: true }),
};

export default config({
  storage:
    process.env.KEYSTATIC_LOCAL === "true"
      ? { kind: "local" }
      : { kind: "github", repo: githubRepo },
  ui: {
    navigation: [
      "homepage",
      "howItWorks",
      "about",
      "packages",
      "successStories",
      "fstMassageTherapy",
      "blog",
      "contact",
    ],
  },
  singletons: {
    homepage: singleton({
      label: "Homepage",
      schema: {
        heroKicker: fields.text({ label: "Hero Kicker" }),
        heroHeadingLine1: fields.text({ label: "Hero Heading Line 1" }),
        heroHeadingLine2: fields.text({ label: "Hero Heading Line 2" }),
        heroSubheading: fields.text({ label: "Hero Subheading" }),
        heroBody: fields.text({ label: "Hero Body", multiline: true }),
        primaryCta: fields.text({ label: "Primary CTA" }),
        secondaryCta: fields.text({ label: "Secondary CTA" }),
        aboutHeading: fields.text({ label: "Homepage About Heading" }),
        aboutIntro: fields.text({ label: "Homepage About Intro" }),
      },
    }),
    howItWorks: singleton({
      label: "How It Works",
      schema: marketingHeroSchema,
    }),
    about: singleton({
      label: "About Page",
      schema: {
        heroHeading: fields.text({ label: "About Hero Heading" }),
        heroSubtext: fields.text({ label: "About Hero Subtext", multiline: true }),
        storyHeading: fields.text({ label: "Story Section Heading" }),
        storyIntro: fields.text({ label: "Story Intro" }),
      },
    }),
    packages: singleton({
      label: "Packages",
      schema: marketingHeroSchema,
    }),
    successStories: singleton({
      label: "Success Stories",
      schema: marketingHeroSchema,
    }),
    fstMassageTherapy: singleton({
      label: "RMT & FST",
      schema: marketingHeroSchema,
    }),
    blog: singleton({
      label: "Blog",
      schema: marketingHeroSchema,
    }),
    contact: singleton({
      label: "Contact",
      schema: marketingHeroSchema,
    }),
  },
});
