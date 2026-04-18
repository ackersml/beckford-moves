'use client'

import { useEffect } from 'react'

interface CalendlyEmbedProps {
  url?: string
}

export function CalendlyEmbed({ url = 'https://calendly.com/beckfordmoves/free-consultation' }: CalendlyEmbedProps) {
  useEffect(() => {
    const head = document.querySelector('head')
    const script = document.createElement('script')
    script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js')
    script.setAttribute('async', 'true')
    head?.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return (
    <div 
      className="calendly-inline-widget min-h-[700px] w-full"
      data-url={`${url}?hide_gdpr_banner=1&background_color=0d1117&text_color=ffffff&primary_color=F7931E`}
    />
  )
}

export function CalendlyButton({ url = 'https://calendly.com/beckfordmoves/free-consultation', text = 'Schedule Free Consultation' }: { url?: string, text?: string }) {
  const openCalendly = () => {
    // @ts-expect-error Calendly is loaded via script
    if (typeof window !== 'undefined' && window.Calendly) {
      // @ts-expect-error Calendly is loaded via script
      window.Calendly.initPopupWidget({ url })
    }
  }

  return (
    <button
      onClick={openCalendly}
      className="group px-8 py-4 bg-accent text-black font-bold rounded-full hover:bg-accent-hover transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
    >
      {text}
      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </button>
  )
}

