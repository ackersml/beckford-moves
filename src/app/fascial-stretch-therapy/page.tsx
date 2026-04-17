import { createReader } from '@keystatic/core/reader'
import config from '../../../keystatic.config'

export const metadata = {
  title: 'Fascial Stretch Therapy',
}

const reader = createReader(process.cwd(), config)

export default async function FstPage() {
  const data = await reader.singletons.fst.read()

  if (!data) return null

  return (
    <section className="prose prose-zinc dark:prose-invert">
      <h1>{data.pageHeading}</h1>
      <p>{data.pageIntro}</p>

      <h2>{data.howItWorksHeading}</h2>
      <p>{data.howItWorksBody}</p>

      <h2>{data.benefitsHeading}</h2>
      <ul>
        {data.benefits.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      <h2>{data.sessionHeading}</h2>
      <p>{data.sessionBody}</p>

      <p>
        <a href="/contact">
          <strong>Request FST Session</strong>
        </a>{' '}
        · <a href="/packages">See Packages</a>
      </p>
    </section>
  )
}
