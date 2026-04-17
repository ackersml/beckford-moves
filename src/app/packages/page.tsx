import { createReader } from '@keystatic/core/reader'
import config from '../../../keystatic.config'

export const metadata = {
  title: 'Packages',
}

const reader = createReader(process.cwd(), config)

export default async function PackagesPage() {
  const data = await reader.singletons.packages.read()

  if (!data) return null

  return (
    <section className="prose prose-zinc dark:prose-invert">
      <h1>{data.pageHeading}</h1>
      <p>{data.pageSubheading}</p>

      {data.packages.map((pkg) => (
        <div
          key={pkg.name}
          className="mb-12 p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-2">{pkg.name}</h2>
          <h3 className="text-xl font-semibold mb-3">{pkg.title}</h3>
          <p className="text-2xl font-bold mb-2">{pkg.price}</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">{pkg.priceNote}</p>
          <ul className="mb-6 space-y-2">
            {pkg.features.map((feature, i) => (
              <li key={i}>• {feature}</li>
            ))}
          </ul>
          <p className="not-prose">
            <a
              href="/contact"
              className="inline-block rounded-md bg-black px-6 py-3 text-white hover:opacity-90 dark:bg-white dark:text-black mr-4"
            >
              Buy this package
            </a>
            <a
              href="/contact"
              className="inline-block rounded-md border border-zinc-300 px-6 py-3 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              SCHEDULE A FREE CONSULTATION
            </a>
          </p>
        </div>
      ))}
    </section>
  )
}
