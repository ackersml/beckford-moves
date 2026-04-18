'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Star, Zap, Mail, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  marketingHeroDefaults,
  type MarketingPageHero,
} from '@/lib/marketing-page-hero'

const packages = [
  {
    name: 'Level 1',
    title: 'Foundation',
    subtitle: '1 on 1 Personalized Assessment & Exercise Guide + Nutrition Guide',
    price: '$299',
    period: '/month',
    commitment: '3 month commitment',
    features: [
      '1 virtual training session per month (1 hour)',
      'Virtual Movement Screening and Personalized Assessment with Sean',
      'Personalized program based on assessment',
      'Nutrition/Strength Training & Programming ebooks',
      'Detailed video demonstration of exercises',
      'Track your progress through the Beckford Moves app',
      'Unlimited email support',
    ],
    popular: false,
    color: 'white/10',
  },
  {
    name: 'Level 2',
    title: 'Transformation',
    subtitle: 'Assessment, Exercise, Nutrition & Grocery Guides + 24/7 Support',
    price: '$429',
    period: '/month',
    commitment: '3 month commitment',
    features: [
      '2 virtual training sessions per month (1 hour each)',
      'Virtual Movement Screening and Personalized Assessment',
      'Personalized program based on assessment',
      'Nutrition & Strength Training Programming ebooks',
      'Detailed video demonstration of exercises',
      'Track progress & communicate with Sean directly via app',
      'Customized worksheets for coaching support',
      '24/7 messaging support',
      'Unlimited email support',
    ],
    popular: true,
    color: 'accent',
  },
  {
    name: 'Level 3',
    title: 'Elite',
    subtitle: 'Work Directly With Sean — Live Virtual 1-on-1 (No In-Person Sessions)',
    price: '$85-120',
    period: '/session',
    commitment: 'Single session or 4, 8, 12 session packages',
    features: [
      'Get coached by Sean directly on FaceTime, Zoom, or Skype',
      'Live virtual sessions from anywhere in the world',
      'All Level 2 online programming features included',
      'Track progress through the app',
      'Communicate with Sean directly anytime',
      'Weekly accountability with personalized programs',
      'Real-time form correction and technique coaching',
      'Priority scheduling',
    ],
    popular: false,
    color: 'white/10',
  },
]

const addOns = [
  {
    title: 'Massage Therapy',
    price: 'From $140',
    description: 'Registered Massage Therapy session for muscle relief, recovery, and relaxation. 60/75/90 min options.',
    link: '/fst-massage-therapy'
  },
  {
    title: 'Fascial Stretch Therapy',
    price: 'From $140',
    description: 'FST session to improve mobility, reduce pain, and enhance performance. 60/75/90 min options.',
    link: '/fst-massage-therapy'
  },
  {
    title: 'Nutrition Deep Dive',
    price: '$150',
    description: 'Extended nutrition consultation with detailed meal planning and macro coaching.',
    link: '/contact'
  },
]

function ComingSoonForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'programs-waitlist' }),
      })
      
      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center justify-center gap-2 text-accent">
        <CheckCircle2 className="w-5 h-5" />
        <span>You&apos;re on the list! We&apos;ll notify you when programs launch.</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <div className="relative flex-1">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 bg-accent text-black font-semibold rounded-lg hover:bg-accent-hover transition-all disabled:opacity-50"
      >
        {status === 'loading' ? 'Joining...' : 'Notify Me'}
      </button>
    </form>
  )
}

export default function PackagesPage() {
  const [hero, setHero] = useState<MarketingPageHero>(
    marketingHeroDefaults.packages
  )

  useEffect(() => {
    let isMounted = true
    async function loadContent() {
      try {
        const response = await fetch('/api/site-content', { cache: 'no-store' })
        if (!response.ok) return
        const payload = await response.json()
        if (isMounted && payload?.packages) {
          setHero({ ...marketingHeroDefaults.packages, ...payload.packages })
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
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />

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

      {/* Packages Grid */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#0f0f1a]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-8 rounded-2xl border transition-all duration-300 hover-lift ${
                  pkg.popular
                    ? 'bg-accent/10 border-accent/30'
                    : 'bg-white/5 border-white/10 hover:border-accent/20'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-black text-sm font-semibold rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <span className="text-accent font-medium">{pkg.name}</span>
                  <h3 className="font-display text-2xl tracking-wide mt-1">{pkg.title}</h3>
                  <p className="text-white/50 text-sm mt-2">{pkg.subtitle}</p>
                </div>

                <div className="mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl">{pkg.price}</span>
                    <span className="text-white/60">{pkg.period}</span>
                  </div>
                  <p className="text-white/40 text-sm mt-2">{pkg.commitment}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <Link
                    href="/contact"
                    className={`block w-full py-3 rounded-lg font-semibold text-center transition-all ${
                      pkg.popular
                        ? 'bg-accent text-black hover:bg-accent-hover'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/contact"
                    className="block w-full py-3 rounded-lg font-medium text-center text-white/60 hover:text-accent transition-colors"
                  >
                    Free Consultation First
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon: Self-Guided Programs */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f1a] via-accent/5 to-[#0f0f1a]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-10 bg-white/5 border border-accent/20 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 border border-accent/30 rounded-full text-accent text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                Coming Soon
              </div>
              
              <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-4">
                SELF-GUIDED <span className="gradient-text">PROGRAMS</span>
              </h2>
              
              <p className="text-white/60 mb-4 max-w-xl mx-auto">
                A standalone program you can follow on your own with app messaging only—no direct sessions required. Coming soon.
              </p>
              <p className="text-white/50 text-sm mb-8 max-w-xl mx-auto">
                In the meantime, grab Sean&apos;s free ebook from the <Link href="/#resources" className="text-accent hover:underline">Resources</Link> section on the homepage.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {['Strength Programs', 'Home Workouts', 'Mobility Routines'].map((item) => (
                  <div key={item} className="flex items-center justify-center gap-2 text-white/50 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    {item}
                  </div>
                ))}
              </div>
              
              <ComingSoonForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add-Ons Section */}
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
              Enhance Your Experience
            </span>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-6">
              ADD-ON SERVICES
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-accent/20 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-display text-lg tracking-wide">{addon.title}</h3>
                  <span className="text-accent font-semibold">{addon.price}</span>
                </div>
                <p className="text-white/60 text-sm mb-4">{addon.description}</p>
                <Link
                  href={addon.link}
                  className="text-accent text-sm hover:underline flex items-center gap-1"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-6">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: 'How do I know which package is right for me?',
                a: 'Book a free consultation and I\'ll help you determine which level of support matches your goals, schedule, and budget. Most clients start with Level 2 for the best balance of guidance and value.'
              },
              {
                q: 'Can I switch packages later?',
                a: 'Yes! You can upgrade or adjust your package at any time. Many clients start with Level 1 and upgrade to Level 2 or 3 as they progress.'
              },
              {
                q: 'What\'s included in the app?',
                a: 'The Beckford Moves app (powered by Trainerize) includes your personalized workout program, video demonstrations, progress tracking, nutrition guidance, and direct messaging with me.'
              },
              {
                q: 'Do I need a gym membership?',
                a: 'Not necessarily. I can design programs for home workouts, gym workouts, or a mix of both depending on your situation and preferences.'
              },
              {
                q: 'What\'s your cancellation policy?',
                a: 'Level 1 and 2 packages require a 3-month commitment. After the initial commitment, you can cancel with 30 days notice. Level 3 sessions can be rescheduled with 24 hours notice.'
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-6 bg-white/5 border border-white/10 rounded-xl"
              >
                <h3 className="font-semibold text-white mb-2">{item.q}</h3>
                <p className="text-white/60">{item.a}</p>
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
            <Zap className="w-12 h-12 text-accent mx-auto mb-6" />
            <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-6">
              READY TO INVEST IN YOURSELF?
            </h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              Book a free consultation to discuss your goals and find the perfect package for your journey.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-black font-semibold rounded-lg hover:bg-accent-hover transition-all hover:scale-105 active:scale-95"
            >
              Schedule Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

