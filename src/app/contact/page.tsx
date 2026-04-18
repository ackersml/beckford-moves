'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Instagram, Mail, Phone, Clock, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import {
  marketingHeroDefaults,
  type MarketingPageHero,
} from '@/lib/marketing-page-hero'

export default function ContactPage() {
  const [hero, setHero] = useState<MarketingPageHero>(
    marketingHeroDefaults.contact
  )

  useEffect(() => {
    let isMounted = true
    async function loadContent() {
      try {
        const response = await fetch('/api/site-content', { cache: 'no-store' })
        if (!response.ok) return
        const payload = await response.json()
        if (isMounted && payload?.contact) {
          setHero({ ...marketingHeroDefaults.contact, ...payload.contact })
        }
      } catch {
        // Keep defaults when content API is unavailable.
      }
    }
    loadContent()
    return () => {
      isMounted = false
    }
  }, [])

  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    goals: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        setFormState('success')
        setFormData({ firstName: '', lastName: '', email: '', phone: '', service: '', goals: '' })
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-6">
              {hero.heroKicker}
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6">
              {hero.heroHeadingLine1}{' '}
              <span className="gradient-text">{hero.heroHeadingLine2}</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              {hero.heroSubheading}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#0f0f1a]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl tracking-tight mb-8">
                CONTACT INFORMATION
              </h2>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-white mb-1">Training Location</div>
                    <div className="text-white/60">Virtual Sessions Worldwide</div>
                    <div className="text-white/60">Train from anywhere via Zoom, FaceTime, or Skype</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-white mb-1">Email</div>
                    <a href="mailto:beckford.sean@gmail.com" className="text-accent hover:underline">
                      beckford.sean@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-white mb-1">Instagram</div>
                    <a href="https://instagram.com/beckford_sean" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      @beckford_sean
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-white mb-1">Availability</div>
                    <div className="text-white/60">Monday - Saturday</div>
                    <div className="text-white/60">6:00 AM - 8:00 PM EST</div>
                  </div>
                </div>
              </div>

              {/* What to Expect */}
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="font-display text-lg tracking-wide mb-4">WHAT TO EXPECT</h3>
                <ul className="space-y-3">
                  {[
                    'Free 15-30 minute consultation call',
                    'Discussion of your goals and challenges',
                    'Overview of training options',
                    'Personalized package recommendation',
                    'No pressure, no commitment required',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/70 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <h2 className="font-display text-2xl tracking-wide mb-6">
                REQUEST A CONSULTATION
              </h2>

              {formState === 'success' ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
                  <h3 className="font-display text-2xl mb-2">Message Sent!</h3>
                  <p className="text-white/60">
                    Thanks for reaching out. Sean will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors"
                      placeholder="+1 (416) 555-0123"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Interested In</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-accent transition-colors"
                    >
                      <option value="" className="bg-[#1a1a2e]">Select a service...</option>
                      <option value="level1" className="bg-[#1a1a2e]">Level 1 - Foundation ($299/mo)</option>
                      <option value="level2" className="bg-[#1a1a2e]">Level 2 - Transformation ($429/mo)</option>
                      <option value="level3" className="bg-[#1a1a2e]">Level 3 - Elite ($85-120/session)</option>
                      <option value="fst" className="bg-[#1a1a2e]">Fascial Stretch Therapy ($120/session)</option>
                      <option value="consultation" className="bg-[#1a1a2e]">Free Consultation First</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tell me about your goals *</label>
                    <textarea
                      name="goals"
                      value={formData.goals}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors resize-none"
                      placeholder="What are your fitness goals? Any injuries or limitations I should know about?"
                    />
                  </div>

                  {formState === 'error' && (
                    <p className="text-red-400 text-sm">Something went wrong. Please try again or email directly.</p>
                  )}

                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full py-4 bg-accent text-black font-semibold rounded-lg hover:bg-accent-hover transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f1a] to-[#0a0a0f]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="aspect-[21/9] bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
            <div className="text-center text-white/30">
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <p className="font-display text-lg">Train From Anywhere</p>
              <p className="text-sm">Virtual sessions available worldwide via Zoom, FaceTime, or Skype</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

