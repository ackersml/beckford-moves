import { createReader } from '@keystatic/core/reader'
import config from '../../../keystatic.config'

export const metadata = {
  title: 'Blog',
}

const reader = createReader(process.cwd(), config)

export default async function BlogIndexPage() {
  const data = await reader.singletons.blog.read()

  if (!data) return null

  return (
    <section className="prose prose-zinc dark:prose-invert">
      <h1>{data.pageHeading}</h1>
      <p>{data.pageIntro}</p>

      <p>Posts will appear here as cards with images, tags, and excerpts.</p>

      <h2>{data.subscribeHeading}</h2>
      <p>
        <a href="/newsletter">Move with Beckford Fitness Newsletter →</a>
      </p>
    </section>
  )
}
