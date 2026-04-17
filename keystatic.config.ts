import { config, fields, singleton } from '@keystatic/core'

export default config({
  storage: {
    kind: 'github',
    repo: { owner: 'ackersml', name: 'beckford-moves' },
  },

  singletons: {
    homepage: {
      label: 'Homepage',
      path: 'content/pages/homepage',
      schema: {
        heroHeading: fields.text({ label: 'Hero Heading' }),
        heroIntro: fields.text({
          label: 'Hero Intro Paragraphs',
          multiline: true,
          description: 'Separate paragraphs with a blank line',
        }),
        heroBodyText: fields.text({
          label: 'Hero Body Text',
          multiline: true,
          description: 'Appears below intro (holistic approach sentence)',
        }),
        heroButton1: fields.text({ label: 'Primary Button Text' }),
        heroButton2: fields.text({ label: 'Secondary Button Text' }),
        howItWorksCards: fields.array(
          fields.object({
            title: fields.text({ label: 'Title' }),
            description: fields.text({ label: 'Description', multiline: true }),
          }),
          { label: 'How It Works Cards', itemLabel: (props) => props.fields.title.value }
        ),
        successStoriesHeading: fields.text({ label: 'Success Stories Heading' }),
        successStoriesSubtext: fields.text({ label: 'Success Stories Subtext', multiline: true }),
        instagramHeading: fields.text({ label: 'Instagram Section Heading' }),
        instagramBody: fields.text({ label: 'Instagram Body Text', multiline: true }),
        instagramHandle: fields.text({ label: 'Instagram Handle (without @)' }),
        newsletterHeading: fields.text({ label: 'Newsletter Heading' }),
        newsletterBody: fields.text({
          label: 'Newsletter Body',
          multiline: true,
          description: 'Separate paragraphs with a blank line',
        }),
        newsletterButtonText: fields.text({ label: 'Newsletter Button Text' }),
      },
    },

    about: {
      label: 'About',
      path: 'content/pages/about',
      schema: {
        pageHeading: fields.text({ label: 'Page Heading (H1)' }),
        storyHeading: fields.text({ label: 'Story Heading (H2)' }),
        nameHeading: fields.text({ label: 'Name Heading (H3)' }),
        storyBody: fields.text({
          label: 'Story Body',
          multiline: true,
          description: 'Separate paragraphs with a blank line',
        }),
        certificationsHeading: fields.text({ label: 'Certifications Heading' }),
        certifications: fields.array(fields.text({ label: 'Certification' }), {
          label: 'Certifications',
          itemLabel: (props) => props.value,
        }),
        closingText: fields.text({ label: 'Closing Text', multiline: true }),
      },
    },

    packages: {
      label: 'Packages',
      path: 'content/pages/packages',
      schema: {
        pageHeading: fields.text({ label: 'Page Heading' }),
        pageSubheading: fields.text({ label: 'Page Subheading' }),
        packages: fields.array(
          fields.object({
            name: fields.text({ label: 'Package Name (e.g. Level 1)' }),
            title: fields.text({ label: 'Package Title', multiline: true }),
            price: fields.text({ label: 'Price (e.g. $299/month)' }),
            priceNote: fields.text({ label: 'Price Note (e.g. On a 3 month commitment)' }),
            features: fields.array(fields.text({ label: 'Feature' }), {
              label: 'Features',
              itemLabel: (props) => props.value,
            }),
          }),
          { label: 'Packages', itemLabel: (props) => props.fields.name.value }
        ),
      },
    },

    howItWorks: {
      label: 'How It Works',
      path: 'content/pages/how-it-works',
      schema: {
        pageHeading: fields.text({ label: 'Page Heading' }),
        pageIntro: fields.text({ label: 'Page Intro', multiline: true }),
        steps: fields.array(
          fields.object({
            heading: fields.text({ label: 'Step Heading' }),
            description: fields.text({ label: 'Description', multiline: true }),
          }),
          { label: 'Steps', itemLabel: (props) => props.fields.heading.value }
        ),
      },
    },
  },
})
