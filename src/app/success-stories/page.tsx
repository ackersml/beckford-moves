import { createReader } from '@keystatic/core/reader'
import config from '../../../keystatic.config'

export const metadata = {
  title: 'Success Stories',
}

const reader = createReader(process.cwd(), config)

export default async function SuccessStoriesPage() {
  const data = await reader.singletons.successStories.read()

  if (!data) return null

  return (
    <section className="prose prose-zinc dark:prose-invert">
      <h1>{data.pageHeading}</h1>
      <p>{data.pageIntro}</p>

      <h2>{data.featuredHeading}</h2>
      <p>{data.featuredDescription}</p>

      {data.testimonials.map((t) => (
        <blockquote key={t.name}>
          &ldquo;{t.quote}&rdquo;
          <br />— {t.name}
        </blockquote>
      ))}

      <p>
        <a href="/packages">Start Your Plan</a> ·{' '}
        <a href="/contact">Schedule a Free Consultation</a>
      </p>
    </section>
  )
}
