'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Award, Zap, Shield, Clock, Heart, Sparkles, Hand } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import {
  marketingHeroDefaults,
  type MarketingPageHero,
} from '@/lib/marketing-page-hero'

const rmtBenefits = [
  {
    icon: Hand,
    title: 'Muscle Relief',
    description: 'Targeted treatment for muscle tension, knots, and trigger points.'
  },
  {
    icon: Sparkles,
    title: 'Stress Reduction',
    description: 'Promote relaxation and reduce stress through therapeutic massage techniques.'
  },
  {
    icon: Shield,
    title: 'Injury Recovery',
    description: 'Support healing from injuries and reduce scar tissue formation.'
  },
  {
    icon: Heart,
    title: 'Overall Wellness',
    description: 'Improve circulation, lymphatic drainage, and overall body function.'
  },
]

const fstBenefits = [
  {
    icon: Zap,
    title: 'Increased Flexibility',
    description: 'Dramatically improve your range of motion and overall flexibility in just one session.'
  },
  {
    icon: Shield,
    title: 'Pain Reduction',
    description: 'Reduce chronic pain, muscle tension, and joint stiffness through targeted fascial release.'
  },
  {
    icon: Clock,
    title: 'Faster Recovery',
    description: 'Speed up recovery from workouts, injuries, and daily stress on your body.'
  },
  {
    icon: Heart,
    title: 'Better Performance',
    description: 'Enhance athletic performance by optimizing muscle function and movement patterns.'
  },
]

const conditions = [
  'Lower back pain',
  'Neck and shoulder tension',
  'Hip tightness',
  'IT band syndrome',
  'Plantar fasciitis',
  'Sciatica',
  'Postural issues',
  'Sports injuries',
  'General stiffness',
  'Reduced mobility',
  'Chronic pain',
  'Post-surgical recovery',
]

const pricingTiers = [
  { duration: '60 min', price: '$140' },
  { duration: '75 min', price: '$170' },
  { duration: '90 min', price: '$190' },
]

const faqs = [
  {
    q: 'What is Registered Massage Therapy?',
    a: 'RMT is a regulated healthcare profession focused on the assessment and treatment of soft tissue and joints. As a Registered Massage Therapist, I use various techniques to relieve pain, reduce stress, and promote healing.'
  },
  {
    q: 'What is Fascial Stretch Therapy?',
    a: 'FST is a unique, complete, and complementary system of table-based assisted stretching. It focuses on the fascia and joint capsule as the key elements in achieving optimal flexibility, strength, performance, and pain relief.'
  },
  {
    q: 'How is FST different from massage therapy?',
    a: 'While massage therapy focuses on muscle tissue, FST targets the fascial system—the connective tissue that surrounds everything. FST uses gentle traction and movement, while massage uses pressure and manipulation. Many clients benefit from combining both!'
  },
  {
    q: 'Which session length should I book?',
    a: '60 minutes is great for maintenance or focused treatment. 75 minutes allows for more comprehensive work. 90 minutes is ideal for full-body treatment or addressing multiple areas. Not sure? Start with 60 minutes and we can adjust from there.'
  },
  {
    q: 'Which service should I book - RMT or FST?',
    a: 'For muscle tension, pain relief, and relaxation, RMT is ideal. For improving flexibility and joint mobility, FST is great. For chronic issues, combining both often delivers the best results. Book a consultation and I\'ll recommend the best approach for your needs.'
  },
]

export default function FSTMassagePage() {
  const [hero, setHero] = useState<MarketingPageHero>(
    marketingHeroDefaults.fstMassageTherapy
  )

  useEffect(() => {
    let isMounted = true
    async function loadContent() {
      try {
        const response = await fetch('/api/site-content', { cache: 'no-store' })
        if (!response.ok) return
        const payload = await response.json()
        if (isMounted && payload?.fstMassageTherapy) {
          setHero({
            ...marketingHeroDefaults.fstMassageTherapy,
            ...payload.fstMassageTherapy,
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

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <div className="flex items-center gap-3 px-5 py-3 bg-accent/10 border border-accent/20 rounded-xl">
              <Award className="w-6 h-6 text-accent" />
              <div>
                <div className="font-semibold text-white text-sm">Registered</div>
                <div className="text-white/60 text-xs">Massage Therapist</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 bg-accent/10 border border-accent/20 rounded-xl">
              <Award className="w-6 h-6 text-accent" />
              <div>
                <div className="font-semibold text-white text-sm">Level 2 Certified</div>
                <div className="text-white/60 text-xs">Fascial Stretch Therapist</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 bg-accent/10 border border-accent/20 rounded-xl">
              <Award className="w-6 h-6 text-accent" />
              <div>
                <div className="font-semibold text-white text-sm">Vodder Certified</div>
                <div className="text-white/60 text-xs">Manual Lymphatic Drainage (MLD)</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 bg-accent/10 border border-accent/20 rounded-xl">
              <Award className="w-6 h-6 text-accent" />
              <div>
                <div className="font-semibold text-white text-sm">Coming Spring 2026</div>
                <div className="text-white/60 text-xs">Medical Acupuncture (McMaster)</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* RMT Section - Now First */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#0f0f1a]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-4">
                Service 1
              </span>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-6">
                REGISTERED MASSAGE THERAPY
              </h2>
              
              <div className="space-y-4 text-white/70 leading-relaxed mb-8">
                <p>
                  As a Registered Massage Therapist, I provide therapeutic massage treatments designed to address specific musculoskeletal issues, promote recovery, and enhance overall wellness.
                </p>
                <p>
                  Whether you&apos;re dealing with chronic muscle tension, recovering from an injury, or simply looking to reduce stress and improve your quality of life, massage therapy can be an effective tool.
                </p>
                <p>
                  My approach combines various massage techniques tailored to your specific needs, including Vodder Manual Lymphatic Drainage (MLD). I am also completing Medical Acupuncture training at McMaster University (spring 2026) to integrate it into my practice.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <Image
                  src="/fst-treatment-room.jpg"
                  alt="Registered Massage Therapy treatment room with massage table and fitness equipment"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* RMT Benefits */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {rmtBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-accent/20 transition-colors"
              >
                <div className="w-14 h-14 bg-secondary/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-lg tracking-wide mb-2">{benefit.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FST Section - Now Second */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f1a] to-[#0a0a0f]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 relative"
            >
              <div className="aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <Image
                  src="/fst-treatment-room.jpg"
                  alt="Fascial Stretch Therapy treatment room with massage table and fitness equipment"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <span className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-4">
                Service 2
              </span>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-6">
                FASCIAL STRETCH THERAPY
              </h2>
              
              <div className="space-y-4 text-white/70 leading-relaxed mb-8">
                <p>
                  Fascial Stretch Therapy (FST) is a unique system of table-based assisted stretching, focusing on the fascia and joint capsule as the key elements in achieving optimal flexibility, strength, performance, and pain relief.
                </p>
                <p>
                  Fascia is the connective tissue that surrounds and connects every muscle, bone, nerve, and organ in your body. When fascia becomes restricted, it can cause pain, limit movement, and reduce overall function.
                </p>
                <p>
                  FST uses gentle traction and oscillation to decompress joints, release fascial restrictions, and restore optimal movement patterns—creating lasting changes by addressing the root cause of restrictions.
                </p>
              </div>
            </motion.div>
          </div>

          {/* FST Benefits */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {fstBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-accent/20 transition-colors"
              >
                <div className="w-14 h-14 bg-secondary/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-lg tracking-wide mb-2">{benefit.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-6">
              CONDITIONS WE TREAT
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Whether you&apos;re dealing with chronic pain, recovering from injury, or looking to enhance your athletic performance, massage therapy and FST can help address a wide range of conditions.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {conditions.map((condition, index) => (
              <motion.div
                key={condition}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/70"
              >
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm">{condition}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] to-[#0f0f1a]" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-6">
              SESSION PRICING
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Same pricing for both Massage Therapy and Fascial Stretch Therapy sessions.
            </p>
          </motion.div>

          {/* Pricing Tiers */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.duration}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 rounded-2xl text-center ${
                  index === 1 
                    ? 'bg-accent/10 border-2 border-accent/40 scale-105' 
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                {index === 1 && (
                  <span className="inline-block px-3 py-1 bg-accent text-black text-xs font-bold rounded-full mb-4">
                    POPULAR
                  </span>
                )}
                <div className="font-display text-2xl text-white/80 mb-2">{tier.duration}</div>
                <div className="font-display text-5xl text-accent mb-4">{tier.price}</div>
                <div className="text-white/50 text-sm">per session</div>
              </motion.div>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* RMT */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-accent/10 border border-accent/30 rounded-2xl"
            >
              <h3 className="font-display text-2xl mb-6">Massage Therapy</h3>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Initial consultation & assessment',
                  'Customized massage treatment',
                  'Targeted muscle relief',
                  'Home care recommendations',
                  'Insurance receipts available',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="block w-full text-center px-6 py-3 bg-accent text-black font-semibold rounded-lg hover:bg-accent-hover transition-all"
              >
                Book Massage Session
              </Link>
            </motion.div>

            {/* FST */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 bg-white/5 border border-white/10 rounded-2xl"
            >
              <h3 className="font-display text-2xl mb-6">Fascial Stretch Therapy</h3>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Full-body fascial assessment',
                  'Customized treatment protocol',
                  'Targeted fascial release techniques',
                  'Movement recommendations',
                  'Take-home stretches provided',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="block w-full text-center px-6 py-3 bg-accent/20 text-accent font-semibold rounded-lg hover:bg-accent hover:text-black transition-all"
              >
                Book FST Session
              </Link>
            </motion.div>
          </div>

          <p className="text-center text-white/40 text-sm mt-8">
            Sessions can be combined for maximum benefit. Contact for package discounts.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#0f0f1a]" />
        
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
            {faqs.map((item, index) => (
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
            <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-6">
              READY TO FEEL BETTER?
            </h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              Experience the transformative power of professional bodywork. Book your session today and start moving better.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-black font-semibold rounded-lg hover:bg-accent-hover transition-all hover:scale-105 active:scale-95"
            >
              Book Your Session
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
