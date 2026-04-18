'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Award, Dumbbell, Heart, Brain, Users } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const fitnessCertifications = [
  { title: '(NSCA) Certified Strength and Conditioning Specialist', category: 'Strength & Conditioning' },
  { title: 'Registered Yoga Teacher (Yoga Alliance Certified)', category: 'Movement' },
  { title: 'Precision Nutrition Level 1 & 2 Coach', category: 'Nutrition' },
  { title: 'Certified Pre and Post Natal Coach (CPPC)', category: 'Specialty' },
  { title: 'TRX Coach', category: 'Functional Training' },
  { title: 'FMT Rocktape Level 1', category: 'Recovery' },
  { title: 'Agatsu Speed & Strength Specialist', category: 'Performance' },
]

const bodyworkCertifications = [
  { title: 'Registered Massage Therapist', category: 'RMT' },
  { title: 'Fascial Stretch Therapist (Level 2)', category: 'Mobility' },
  { title: 'Vodder Certified Manual Lymphatic Drainage (MLD)', category: 'Bodywork' },
  { title: 'Medical Acupuncture (McMaster University — coming spring 2026)', category: 'Coming Soon' },
]

const values = [
  {
    icon: Heart,
    title: 'Holistic Approach',
    description: 'Fitness is more than exercise. I address nutrition, mindset, recovery, and lifestyle to create lasting transformation.'
  },
  {
    icon: Brain,
    title: 'Continuous Learning',
    description: '11 years of experience and 11 certifications reflect my commitment to mastering my craft and bringing you the best.'
  },
  {
    icon: Users,
    title: 'Personal Connection',
    description: 'Every client is unique. I take time to understand your story, challenges, and goals to build a program that fits your life.'
  },
  {
    icon: Dumbbell,
    title: 'Functional Movement',
    description: 'Train movements, not just muscles. Build a body that performs as good as it looks in real-world situations.'
  },
]

const timeline = [
  { year: '2013', event: 'Started fitness journey and personal training career' },
  { year: '2015', event: 'Earned NSCA Certified Strength & Conditioning Specialist' },
  { year: '2017', event: 'Became Precision Nutrition Level 1 & 2 Coach' },
  { year: '2019', event: 'Certified as Fascial Stretch Therapist Level 2' },
  { year: '2021', event: 'Launched Beckford Moves online coaching platform' },
  { year: '2024', event: 'Registered Massage Therapist certification' },
]

type AboutContent = {
  heroHeading?: string
  heroSubtext?: string
  storyHeading?: string
  storyIntro?: string
}

const aboutDefaults: Required<AboutContent> = {
  heroHeading: 'ABOUT SEAN',
  heroSubtext:
    '11 years of experience helping people transform their bodies, minds, and lives through personalized fitness coaching.',
  storyHeading: 'MY STORY',
  storyIntro: "Hi! I'm Sean.",
}

export default function AboutPage() {
  const [aboutContent, setAboutContent] = useState<Required<AboutContent>>(aboutDefaults)

  useEffect(() => {
    let isMounted = true
    async function loadContent() {
      try {
        const response = await fetch('/api/site-content', { cache: 'no-store' })
        if (!response.ok) return
        const payload = await response.json()
        if (isMounted) {
          setAboutContent({ ...aboutDefaults, ...(payload?.about || {}) })
        }
      } catch {
        // Keep design defaults when content API is unavailable.
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
              Get to Know Your Coach
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6">
              {aboutContent.heroHeading}
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              {aboutContent.heroSubtext}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main About Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#0f0f1a]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side - centered in column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center lg:justify-start"
            >
              <div className="relative w-full max-w-xl">
                <div className="relative z-0 aspect-[4/5] rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0f0f1a] via-transparent to-transparent pointer-events-none" />
                  <Image
                    src="/sean-rowing.png"
                    alt="Sean Beckford - Personal Trainer and Coach"
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 1024px) 100vw, 576px"
                  />
                </div>
                {/* Stats Card - inside image bounds, overlapping bottom-right corner */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-4 right-4 z-[30] bg-gradient-to-br from-secondary to-secondary-dark border border-secondary-light/30 rounded-xl p-5 shadow-2xl"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="font-display text-2xl sm:text-3xl text-accent">11+</div>
                      <div className="text-white/60 text-xs sm:text-sm">Years</div>
                    </div>
                    <div className="text-center">
                      <div className="font-display text-2xl sm:text-3xl text-accent">11</div>
                      <div className="text-white/60 text-xs sm:text-sm">Certs</div>
                    </div>
                    <div className="text-center">
                      <div className="font-display text-2xl sm:text-3xl text-accent">500+</div>
                      <div className="text-white/60 text-xs sm:text-sm">Clients</div>
                    </div>
                    <div className="text-center">
                      <div className="font-display text-2xl sm:text-3xl text-accent">∞</div>
                      <div className="text-white/60 text-xs sm:text-sm">Passion</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-4xl tracking-tight mb-6">
                {aboutContent.storyHeading}
              </h2>
              
              <div className="space-y-4 text-white/70 leading-relaxed mb-8">
                <p className="text-xl text-white/90">{aboutContent.storyIntro}</p>
                <p>
                  I&apos;ve been a Fitness Trainer for 11 years & I&apos;ve been fortunate to learn from the best at some of the top fitness gyms in North America throughout my career.
                </p>
                <p>
                  I put everything I have into ensuring my clients improve their bodies and lives. My commitment to continuing education throughout my fitness journey has helped me deliver a great service to my clients through functional movement, nutrition and recovery methods.
                </p>
                <p>
                  Whether you&apos;re looking to lose weight, build muscle, improve your mobility, or simply feel better in your body, I&apos;m here to guide you every step of the way.
                </p>
                <p>
                  I&apos;m looking forward to supporting you in your fitness journey.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-black font-semibold rounded-lg hover:bg-accent-hover transition-all"
              >
                Work With Me
                <Award className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f1a] to-[#0a0a0f]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-6"
            >
              My Philosophy
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-display text-4xl md:text-5xl tracking-tight mb-6"
            >
              WHAT I BELIEVE IN
            </motion.h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-accent/30 transition-all duration-300 hover-lift"
              >
                <div className="w-12 h-12 bg-secondary/30 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-lg tracking-wide mb-3">{value.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certifications Section - PT vs RMT split */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-6">
              Credentials
            </span>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-6">
              MY CERTIFICATIONS
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Committed to continuous education and mastery of the craft.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="font-display text-xl tracking-wide mb-6 text-accent">Fitness & Training</h3>
              <div className="space-y-4">
                {fitnessCertifications.map((cert, index) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-accent/20 transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-white/90 font-medium">{cert.title}</div>
                      <div className="text-accent/60 text-sm mt-1">{cert.category}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl tracking-wide mb-6 text-accent">Bodywork & Recovery</h3>
              <div className="space-y-4">
                {bodyworkCertifications.map((cert, index) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-accent/20 transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-white/90 font-medium">{cert.title}</div>
                      <div className="text-accent/60 text-sm mt-1">{cert.category}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] to-[#0f0f1a]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-6">
              Journey
            </span>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight">
              MY TIMELINE
            </h2>
          </motion.div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-6"
              >
                <div className="w-20 flex-shrink-0">
                  <span className="font-display text-2xl text-accent">{item.year}</span>
                </div>
                <div className="w-3 h-3 bg-accent rounded-full flex-shrink-0" />
                <div className="flex-1 p-4 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-white/80">{item.event}</p>
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
              READY TO START YOUR JOURNEY?
            </h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              Book a free consultation to discuss your goals and how we can work together to achieve them.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-black font-semibold rounded-lg hover:bg-accent-hover transition-all hover:scale-105 active:scale-95"
            >
              Schedule Free Consultation
              <Award className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

