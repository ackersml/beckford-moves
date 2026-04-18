'use client'

import { motion } from 'framer-motion'
import { Clock, ArrowRight, Tag } from 'lucide-react'
import Link from 'next/link'

const posts = [
  {
    title: 'Coming Soon: Fitness Tips & Insights',
    excerpt: 'Stay tuned for expert advice on training, nutrition, recovery, and mindset from Sean.',
    category: 'Announcement',
    date: 'Coming Soon',
    slug: '#',
    featured: true,
  },
]

export default function BlogPage() {
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
              Knowledge Base
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6">
              MOVE WITH <span className="gradient-text">SEAN</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Tips, insights, and guidance on training, nutrition, recovery, and building a healthier lifestyle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#0f0f1a]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-secondary/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-accent" />
            </div>
            <h2 className="font-display text-3xl tracking-tight mb-4">
              BLOG COMING SOON
            </h2>
            <p className="text-white/60 max-w-lg mx-auto mb-8">
              Sean is working on creating valuable content to help you on your fitness journey. 
              Subscribe to the newsletter to be notified when new posts are published.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#newsletter"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-black font-semibold rounded-lg hover:bg-accent-hover transition-all"
              >
                Subscribe to Newsletter
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/#resources"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/10"
              >
                Get the free ebook
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Topics Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="font-display text-2xl tracking-tight text-center mb-8">
              TOPICS WE&apos;LL COVER
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Strength Training',
                'Nutrition Tips',
                'Recovery Methods',
                'Fascial Stretch Therapy',
                'Mindset & Motivation',
                'Home Workouts',
                'Mobility',
                'Pre/Post Natal Fitness',
                'Recovery & Wellness',
                'Yoga & Flexibility',
              ].map((topic, index) => (
                <span
                  key={topic}
                  className="px-4 py-2 bg-secondary/20 border border-secondary/30 rounded-full text-white/60 text-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </motion.div>
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
              CAN&apos;T WAIT FOR THE BLOG?
            </h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              Start your transformation today. Book a free consultation to discuss your goals.
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

