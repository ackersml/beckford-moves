'use client'

import { useState } from 'react'

export function ContactForm({ submitText }: { submitText: string }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(formData: FormData) {
    setStatus('submitting')
    setMessage('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setMessage("Thanks! We'll be in touch shortly.")
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <form action={handleSubmit} className="not-prose mt-6 grid max-w-xl gap-4">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium">Name</label>
        <input id="name" name="name" required className="rounded-md border border-zinc-300 bg-white p-2 outline-none ring-0 transition-shadow focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)] dark:border-zinc-700 dark:bg-zinc-900" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input id="email" type="email" name="email" required className="rounded-md border border-zinc-300 bg-white p-2 outline-none ring-0 transition-shadow focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)] dark:border-zinc-700 dark:bg-zinc-900" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium">Message</label>
        <textarea id="message" name="message" required rows={5} className="rounded-md border border-zinc-300 bg-white p-2 outline-none ring-0 transition-shadow focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)] dark:border-zinc-700 dark:bg-zinc-900" />
      </div>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-fit rounded-md bg-black px-4 py-2 text-white transition-opacity hover:opacity-90 disabled:opacity-60 dark:bg-white dark:text-black"
      >
        {status === 'submitting' ? 'Sending…' : submitText}
      </button>
      {message && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{message}</p>
      )}
    </form>
  )
}
