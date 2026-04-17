import { createReader } from '@keystatic/core/reader'
import config from '../../../keystatic.config'
import { ContactForm } from './ContactForm'

const reader = createReader(process.cwd(), config)

export default async function ContactPage() {
  const data = await reader.singletons.contact.read()

  if (!data) return null

  return (
    <section className="prose prose-zinc dark:prose-invert">
      <h1 className="text-4xl font-bold mb-4">{data.pageHeading}</h1>
      <h2 className="text-3xl font-semibold mb-6">{data.pageSubheading}</h2>
      <p className="text-lg mb-6">{data.pageDescription}</p>
      <ContactForm submitText={data.submitButtonText} />
    </section>
  )
}
