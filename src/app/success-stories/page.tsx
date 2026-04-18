'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import {
  marketingHeroDefaults,
  type MarketingPageHero,
} from '@/lib/marketing-page-hero'

const testimonials = [
  {
    name: 'Michael R.',
    role: 'Business Executive',
    image: null,
    content: "Sean's approach changed everything for me. The personalized attention and 24/7 support made all the difference. Down 30lbs and feeling stronger than ever. His understanding of both the physical and mental aspects of fitness is what sets him apart.",
    rating: 5,
    result: 'Lost 30lbs in 4 months',
    program: 'Level 2'
  },
  {
    name: 'Sarah K.',
    role: 'Working Mom of 3',
    image: null,
    content: "As a busy mom, I needed flexibility. Sean's virtual training fits perfectly into my schedule. The app makes tracking progress so easy! He designed workouts I could do at home while the kids napped. I've never felt stronger.",
    rating: 5,
    result: 'Built strength & energy',
    program: 'Level 1'
  },
  {
    name: 'David L.',
    role: 'Former Athlete',
    image: null,
    content: "After years of dealing with mobility issues from my playing days, Sean's FST sessions and training programs have me moving pain-free again. His knowledge of fascial work combined with strength training is exceptional.",
    rating: 5,
    result: 'Pain-free movement restored',
    program: 'Level 3 + FST'
  },
  {
    name: 'Jennifer M.',
    role: 'Healthcare Professional',
    image: null,
    content: "Working 12-hour shifts, I never thought I could maintain a fitness routine. Sean created a sustainable program that works with my unpredictable schedule. The nutrition guidance was a game-changer.",
    rating: 5,
    result: 'Sustainable lifestyle change',
    program: 'Level 2'
  },
  {
    name: 'Marcus T.',
    role: 'Tech Entrepreneur',
    image: null,
    content: "I've worked with many trainers over the years. Sean's holistic approach—combining strength, mobility, and mindset—is unmatched. His coaching helped me break through mental barriers I didn't know I had.",
    rating: 5,
    result: 'Complete transformation',
    program: 'Level 3'
  },
  {
    name: 'Amanda P.',
    role: 'New Mother',
    image: null,
    content: "Sean's pre and postnatal expertise made me feel safe and supported throughout my pregnancy and recovery. He knew exactly how to modify exercises and when to push vs. when to rest. Highly recommend for any expecting moms!",
    rating: 5,
    result: 'Safe pregnancy fitness',
    program: 'Level 2'
  },
]

const stats = [
  { value: '500+', label: 'Clients Transformed' },
  { value: '4.9', label: 'Average Rating' },
  { value: '11', label: 'Years Experience' },
  { value: '95%', label: 'Client Retention' },
]

export default function SuccessStoriesPage() {
  const [hero, setHero] = useState<MarketingPageHero>(
    marketingHeroDefaults.successStories
  )

  useEffect(() => {
    let isMounted = true
    async function loadContent() {
      try {
        const response = await fetch('/api/site-content', { cache: 'no-store' })
        if (!response.ok) return
        const payload = await response.json()
        if (isMounted && payload?.successStories) {
          setHero({
            ...marketingHeroDefaults.successStories,
            ...payload.successStories,
          })
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

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-4xl md:text-5xl text-accent mb-2">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#0f0f1a]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-accent/20 transition-all hover-lift"
              >
                <Quote className="w-10 h-10 text-accent/30 mb-4" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                </div>
                
                <p className="text-white/70 leading-relaxed mb-6">&quot;{testimonial.content}&quot;</p>
                
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-white/50 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-accent text-sm font-medium">{testimonial.result}</span>
                    <span className="text-white/40 text-xs">{testimonial.program}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Gallery Placeholder */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f1a] to-[#0a0a0f]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-6">
              Visual Progress
            </span>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-6">
              TRANSFORMATION GALLERY
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Before and after photos coming soon. Real results from real clients.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="aspect-[3/4] bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center"
              >
                <div className="text-center text-white/30">
                  <p className="font-display text-lg">Coming Soon</p>
                  <p className="text-sm">Transformation {index + 1}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Placeholder */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-6">
              VIDEO TESTIMONIALS
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Hear directly from clients about their experience working with Sean.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[1, 2].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="aspect-video bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center"
              >
                <div className="text-center text-white/30">
                  <p className="font-display text-lg">Coming Soon</p>
                  <p className="text-sm">Video Testimonial</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-6">
              BE THE NEXT SUCCESS STORY
            </h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              Your transformation starts with a single step. Book your free consultation today.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-black font-semibold rounded-lg hover:bg-accent-hover transition-all hover:scale-105 active:scale-95"
            >
              Start Your Transformation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

