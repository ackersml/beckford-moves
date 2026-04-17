import { createReader } from '@keystatic/core/reader'
import config from '../../keystatic.config'

const reader = createReader(process.cwd(), config)

function renderParagraphs(text: string) {
  return text.split(/\n\n+/).map((p, i) => (
    <p key={i} className={i < text.split(/\n\n+/).length - 1 ? 'mb-6' : ''}>
      {p}
    </p>
  ))
}

export default async function Home() {
  const data = await reader.singletons.homepage.read()

  if (!data) return null

  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-4">{data.heroHeading}</h1>
        <div className="text-xl text-zinc-600 dark:text-zinc-400 mb-6">
          {renderParagraphs(data.heroIntro)}
        </div>
        <p className="mb-8">{data.heroBodyText}</p>
        <p className="not-prose">
          <a
            href="/contact"
            className="inline-block rounded-md bg-black px-6 py-3 text-white hover:opacity-90 dark:bg-white dark:text-black mr-4"
          >
            <strong>{data.heroButton1}</strong>
          </a>
          <a
            href="/packages"
            className="inline-block rounded-md border border-zinc-300 px-6 py-3 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            {data.heroButton2}
          </a>
        </p>
      </section>

      {/* How It Works Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">How It Works</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {data.howItWorksCards.map((card) => (
            <div key={card.title}>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
        <p>
          <a href="/how-it-works">See the full process →</a>
        </p>
      </section>

      {/* Success Stories Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-4">{data.successStoriesHeading}</h2>
        <p className="text-lg mb-6">{data.successStoriesSubtext}</p>
        <p>
          <a href="/success-stories">View success stories →</a>
        </p>
      </section>

      {/* Instagram Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-4">{data.instagramHeading}</h2>
        <p className="mb-4">{data.instagramBody}</p>
        <p className="not-prose">
          <a
            href={`https://instagram.com/${data.instagramHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-white hover:opacity-90"
          >
            Follow on Instagram
          </a>
        </p>
      </section>

      {/* Newsletter Section */}
      <section className="mb-16 bg-zinc-50 dark:bg-zinc-900 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">{data.newsletterHeading}</h2>
        <div className="mb-6">{renderParagraphs(data.newsletterBody)}</div>
        <p className="not-prose">
          <a
            href="/newsletter"
            className="inline-block rounded-md bg-black px-6 py-3 text-white hover:opacity-90 dark:bg-white dark:text-black"
          >
            {data.newsletterButtonText}
          </a>
        </p>
      </section>
    </div>
  )
}
