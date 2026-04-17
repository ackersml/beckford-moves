import { createReader } from '@keystatic/core/reader'
import config from '../../../keystatic.config'

export const metadata = {
  title: 'How It Works',
}

const reader = createReader(process.cwd(), config)

export default async function HowItWorksPage() {
  const data = await reader.singletons.howItWorks.read()

  if (!data) return null

  return (
    <section className="prose prose-zinc dark:prose-invert">
      <h1>{data.pageHeading}</h1>
      <p>{data.pageIntro}</p>

      {data.steps.map((step) => (
        <div key={step.heading}>
          <h2>{step.heading}</h2>
          <p>{step.description}</p>
        </div>
      ))}

      <p>
        <a href="/contact">
          <strong>Start with a Free Consultation</strong>
        </a>{' '}
        · <a href="/packages">View Packages</a>
      </p>
    </section>
  )
}
