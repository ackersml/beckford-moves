import { createReader } from '@keystatic/core/reader'
import config from '../../../keystatic.config'

export const metadata = {
  title: 'About',
}

const reader = createReader(process.cwd(), config)

function renderParagraphs(text: string) {
  return text.split(/\n\n+/).map((p, i, arr) => (
    <p key={i} className={i < arr.length - 1 ? 'mb-4' : 'mb-8'}>
      {p}
    </p>
  ))
}

export default async function AboutPage() {
  const data = await reader.singletons.about.read()

  if (!data) return null

  return (
    <section className="prose prose-zinc dark:prose-invert max-w-3xl">
      <h1 className="text-4xl font-bold mb-4">{data.pageHeading}</h1>
      <h2 className="text-3xl font-semibold mb-6">{data.storyHeading}</h2>
      <h3 className="text-2xl font-semibold mb-4">{data.nameHeading}</h3>

      {renderParagraphs(data.storyBody)}

      <h3 className="text-2xl font-semibold mb-4">{data.certificationsHeading}</h3>
      <ul className="mb-8 space-y-2">
        {data.certifications.map((cert, i) => (
          <li key={i}>• {cert}</li>
        ))}
      </ul>

      <p className="mb-8">{data.closingText}</p>

      <p className="not-prose">
        <a
          href="/contact"
          className="inline-block rounded-md bg-black px-6 py-3 text-white hover:opacity-90 dark:bg-white dark:text-black mr-4"
        >
          Schedule a Free Consultation
        </a>
        <a
          href="/packages"
          className="inline-block rounded-md border border-zinc-300 px-6 py-3 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          View Packages
        </a>
      </p>
    </section>
  )
}
