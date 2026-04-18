'use client'

import { motion } from 'framer-motion'
import { 
  Video, MessageCircle, Dumbbell, Smartphone, 
  Utensils, Heart, CheckCircle2, ArrowRight,
  Zap, Target, Clock, Shield
} from 'lucide-react'
import Link from 'next/link'

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

const services = [
  {
    icon: Video,
    title: 'Onboarding & Assessment',
    description: 'Upon signup you will receive a personal, 1 on 1 video consultation to help me understand your goals, circumstances and preferences. This comprehensive assessment ensures your program is tailored specifically to you.',
    features: ['Movement screening', 'Goal setting session', 'Lifestyle analysis', 'Program customization']
  },
  {
    icon: MessageCircle,
    title: '24/7 Support',
    description: 'When you begin your training program with me, you get unlimited instant messaging access to address any questions you may have and provide assistance whenever you need it.',
    features: ['Direct messaging', 'Quick response times', 'Form check videos', 'Motivation & accountability']
  },
  {
    icon: Dumbbell,
    title: 'Personalized Training Programs',
    description: 'I use the information provided to me during our assessment to build a training program to your needs and goals. This removes the guessing from your workout plans.',
    features: ['Progressive overload', 'Exercise variations', 'Home or gym options', 'Updated regularly']
  },
  {
    icon: Smartphone,
    title: 'iOS & Android App',
    description: "All your programming is easily accessible via the Beckford Moves app on iOS & Android devices powered by Trainerize. You'll also be able to upload information and chat with me directly.",
    features: ['Workout tracking', 'Progress photos', 'Video demonstrations', 'In-app messaging']
  },
  {
    icon: Utensils,
    title: 'Nutrition Coaching',
    description: 'A complete guide to healthy eating, tailored for you. Caloric intake, macronutrient profiles, easy recipes and shopping lists to support your fitness goals.',
    features: ['Macro calculations', 'Meal planning', 'Recipe suggestions', 'Shopping lists']
  },
  {
    icon: Heart,
    title: 'Wellness & Recovery',
    description: 'Set yourself up for success through all aspects of a healthy lifestyle, including mindfulness, yoga, mobility work and recovery techniques.',
    features: ['Stress management', 'Sleep optimization', 'Recovery protocols', 'Habit building']
  },
]

const specialties = [
  {
    icon: Zap,
    title: 'Strength & Conditioning',
    description: 'Build functional strength that translates to everyday life and athletic performance.'
  },
  {
    icon: Target,
    title: 'Fat Loss & Body Recomposition',
    description: 'Strategic approaches to lose fat while preserving or building lean muscle mass.'
  },
  {
    icon: Clock,
    title: 'Fascial Stretch Therapy',
    description: 'Specialized stretching techniques to improve mobility, reduce pain, and enhance recovery.'
  },
  {
    icon: Shield,
    title: 'Pre/Post Natal Fitness',
    description: 'Safe, effective training programs for expecting and new mothers.'
  },
]

export default function ServicesPage() {
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
              What I Offer
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6">
              HOW IT <span className="gradient-text">WORKS</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              All training is delivered virtually—no in-person PT for now. A comprehensive approach that addresses your unique goals, lifestyle, and preferences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#0f0f1a]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                className="group p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-accent/30 transition-all duration-300 hover-lift"
              >
                <div className="w-14 h-14 bg-secondary/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-xl tracking-wide mb-4">{service.title}</h3>
                <p className="text-white/60 leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/50">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Specialties Section */}
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
              Areas of Expertise
            </span>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-6">
              MY SPECIALTIES
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((specialty, index) => (
              <motion.div
                key={specialty.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-accent/20 transition-colors"
              >
                <div className="w-16 h-16 bg-secondary/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <specialty.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display text-lg tracking-wide mb-3">{specialty.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{specialty.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-6">
              The Journey
            </span>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-6">
              YOUR PATH TO SUCCESS
            </h2>
          </motion.div>

          <div className="space-y-8">
            {[
              { step: '01', title: 'Book Your Free Consultation', description: 'Schedule a call to discuss your goals, challenges, and what you want to achieve.' },
              { step: '02', title: 'Complete Your Assessment', description: 'Movement screening and lifestyle analysis to understand your unique needs.' },
              { step: '03', title: 'Receive Your Custom Program', description: 'Get your personalized training and nutrition plan via the app.' },
              { step: '04', title: 'Train With Guidance', description: 'Execute your program with 24/7 support and regular check-ins.' },
              { step: '05', title: 'Track & Evolve', description: 'Monitor progress and adjust your program as you grow stronger.' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-6"
              >
                <div className="w-16 h-16 bg-secondary/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-2xl text-accent">{item.step}</span>
                </div>
                <div className="pt-2">
                  <h3 className="font-display text-xl tracking-wide mb-2">{item.title}</h3>
                  <p className="text-white/60">{item.description}</p>
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
              READY TO GET STARTED?
            </h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              Choose the package that fits your goals and let&apos;s begin your transformation journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-black font-semibold rounded-lg hover:bg-accent-hover transition-all hover:scale-105 active:scale-95"
              >
                View Packages
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/10"
              >
                Free Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

