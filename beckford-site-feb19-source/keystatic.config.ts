import { config, fields, singleton } from "@keystatic/core";

export default config({
  storage:
    process.env.KEYSTATIC_LOCAL === "true"
      ? { kind: "local" }
      : { kind: "cloud" },
  cloud: {
    project: "beckford-moves/beckford-moves",
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
    about: singleton({
      label: "About Page",
      schema: {
        heroHeading: fields.text({ label: "About Hero Heading" }),
        heroSubtext: fields.text({ label: "About Hero Subtext", multiline: true }),
        storyHeading: fields.text({ label: "Story Section Heading" }),
        storyIntro: fields.text({ label: "Story Intro" }),
      },
    }),
  },
});
