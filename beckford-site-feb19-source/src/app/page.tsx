'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Video, MessageCircle, Dumbbell, Smartphone, 
  Utensils, Heart, Award, CheckCircle2, ArrowRight,
  Star, ChevronRight, Play, MapPin, Instagram, Clock, Users
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { InstagramFeed } from '@/components/InstagramFeed'
import { GoogleReviews } from '@/components/GoogleReviews'

// Animation variants
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
    title: 'Onboarding',
    description: 'Upon signup you will receive a personal, 1 on 1 video consultation to help me understand your goals, circumstances and preferences.',
  },
  {
    icon: MessageCircle,
    title: '24/7 Support',
    description: 'When you begin your training program with me, you get unlimited instant messaging access to address any questions you may have and provide assistance.',
  },
  {
    icon: Dumbbell,
    title: 'Training Program',
    description: 'I use the information provided to me during our assessment to build a training program to your needs and goals. This removes the guessing from your workout plans.',
  },
  {
    icon: Smartphone,
    title: 'iOS & Android App',
    description: "All your programming is easily accessible via the Beckford Moves app on iOS & Android devices powered by Trainerize. You'll also be able to upload information and chat with me directly.",
  },
  {
    icon: Utensils,
    title: 'Meal Plan',
    description: 'A complete guide to healthy eating, tailored for you. Caloric intake, macronutrient profiles, easy recipes and shopping lists.',
  },
  {
    icon: Heart,
    title: 'Beyond Fitness',
    description: 'I can help set you up for success through all aspects of a healthy lifestyle, including mindfulness, yoga, mobility work and recovery techniques.',
  },
]

const certifications = [
  '(NSCA) Certified Strength and Conditioning Specialist',
  'Registered Massage Therapist',
  'Fascial Stretch Therapist (Level 2)',
  'Vodder Certified Manual Lymphatic Drainage (MLD)',
  'Registered Yoga Teacher (Yoga Alliance Certified)',
  'Precision Nutrition Level 1 & 2 Coach',
  'Certified Pre and Post Natal Coach (CPPC)',
  'TRX Coach',
  'FMT Rocktape Level 1',
  'Agatsu Speed & Strength Specialist',
  'Medical Acupuncture (McMaster University — coming spring 2026)',
]

const packages = [
  {
    name: 'Level 1',
    title: '1 on 1 Personalized Assessment & Exercise Guide + Nutrition Guide',
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
  },
  {
    name: 'Level 2',
    title: 'Assessment, Exercise, Nutrition & Grocery Guides + 24/7 Support',
    price: '$429',
    period: '/month',
    commitment: '3 month commitment',
    features: [
      '2 virtual training sessions per month (1 hour each)',
      'Virtual Movement Screening and Personalized Assessment',
      'Personalized program based on assessment',
      'Nutrition & Strength Training Programming ebooks',
      'Detailed video demonstration of exercises',
      'Track progress & communicate with Sean directly',
      'Customized worksheets for coaching support',
      'Unlimited email support',
    ],
    popular: true,
  },
  {
    name: 'Level 3',
    title: 'Work Directly With Sean — Live Virtual 1-on-1 (No In-Person Sessions)',
    price: '$85-120',
    period: '/session',
    commitment: 'Single session or 4, 8, 12 session packages',
    features: [
      'Get coached by Sean directly on FaceTime, Zoom, or Skype',
      'Live virtual sessions from anywhere in the world',
      'All online programming features included',
      'Track progress through the app',
      'Communicate with Sean directly anytime',
      'Weekly accountability with personalized programs',
      'Real-time form correction and technique coaching',
    ],
    popular: false,
  },
]

const testimonials = [
  {
    name: 'Michael R.',
    role: 'Business Professional',
    content: "Sean's approach changed everything for me. The personalized attention and 24/7 support made all the difference. Down 30lbs and feeling stronger than ever.",
    rating: 5,
  },
  {
    name: 'Sarah K.',
    role: 'Working Mom',
    content: "As a busy mom, I needed flexibility. Sean's virtual training fits perfectly into my schedule. The app makes tracking progress so easy!",
    rating: 5,
  },
  {
    name: 'David L.',
    role: 'Former Athlete',
    content: "After years of dealing with mobility issues, Sean's FST sessions and training programs have me moving pain-free again. Highly recommend!",
    rating: 5,
  },
]

type HomepageContent = {
  heroKicker?: string
  heroHeadingLine1?: string
  heroHeadingLine2?: string
  heroSubheading?: string
  heroBody?: string
  primaryCta?: string
  secondaryCta?: string
  aboutHeading?: string
  aboutIntro?: string
}

const homepageDefaults: Required<HomepageContent> = {
  heroKicker: '11 Years Experience • Fitness & Bodywork Certifications',
  heroHeadingLine1: 'TRAIN SMART.',
  heroHeadingLine2: 'LIVE BETTER.',
  heroSubheading: 'Virtual 1-on-1 Personal Training & Nutrition',
  heroBody:
    'Train virtually from anywhere in the world. Access your programming, video demonstrations, and 24/7 support through the Beckford Moves app.',
  primaryCta: 'Schedule Free Consultation',
  secondaryCta: 'View Packages',
  aboutHeading: 'MY STORY',
  aboutIntro: "Hi! I'm Sean",
}

function EbookForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'ebook' }),
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
      <div className="flex items-center justify-center gap-3 text-accent">
        <CheckCircle2 className="w-6 h-6" />
        <span className="text-lg font-medium">Check your inbox for the download link.</span>
      </div>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-10 py-4 bg-accent text-black font-bold rounded-full hover:bg-accent-hover transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          {status === 'loading' ? 'Sending...' : 'Send me the ebook'}
        </button>
      </form>
      {status === 'error' && (
        <p className="mt-4 text-red-400 text-sm">Something went wrong. Please try again.</p>
      )}
    </>
  )
}

function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
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

  return (
    <section id="newsletter" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/5 to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-5xl md:text-6xl tracking-tight mb-6 font-black">
            SIGN UP TO MOVE
            <span className="block gradient-text">WITH SEAN</span>
          </h2>
          <p className="text-white/70 mb-4 text-lg max-w-2xl mx-auto">
            You&apos;ll be receiving content all on how to move well whether you&apos;re in a gym, at home or on the go.
          </p>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto">
            Find out how to balance fitness within your life, plus nutrition topics covering blending aesthetics & performance.
          </p>
          
          {status === 'success' ? (
            <div className="flex items-center justify-center gap-3 text-accent">
              <CheckCircle2 className="w-6 h-6" />
              <span className="text-lg font-medium">You&apos;re subscribed! Check your inbox.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-10 py-4 bg-accent text-black font-bold rounded-full hover:bg-accent-hover transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="mt-4 text-red-400">Something went wrong. Please try again.</p>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  const [homepageContent, setHomepageContent] = useState<Required<HomepageContent>>(homepageDefaults)
  const [contactFormState, setContactFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [contactFormData, setContactFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    goals: '',
  })

  useEffect(() => {
    let isMounted = true
    async function loadContent() {
      try {
        const response = await fetch('/api/site-content', { cache: 'no-store' })
        if (!response.ok) return
        const payload = await response.json()
        if (isMounted) {
          setHomepageContent({ ...homepageDefaults, ...(payload?.homepage || {}) })
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

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactFormState('submitting')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactFormData),
      })
      
      if (response.ok) {
        setContactFormState('success')
        setContactFormData({ firstName: '', lastName: '', email: '', goals: '' })
        // Reset success message after 5 seconds
        setTimeout(() => setContactFormState('idle'), 5000)
      } else {
        setContactFormState('error')
      }
    } catch {
      setContactFormState('error')
    }
  }

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <>
      {/* Hero Section - Functional Bodybuilding inspired bold typography */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with Sean's image */}
        <div className="absolute inset-0">
          <Image
            src="/sean-hero-kettlebell.png"
            alt="Sean Beckford Training"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Image 
              src="/logo.png" 
              alt="Beckford Moves" 
              width={80} 
              height={80}
              className="mx-auto mb-6"
            />
            <span className="inline-block px-5 py-2.5 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full text-accent text-sm font-semibold tracking-wide">
              {homepageContent.heroKicker}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter mb-6 leading-[0.85]"
          >
            <span className="block font-black">{homepageContent.heroHeadingLine1}</span>
            <span className="block font-black italic gradient-text">{homepageContent.heroHeadingLine2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-4 font-light"
          >
            {homepageContent.heroSubheading}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-12"
          >
            {homepageContent.heroBody}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="#contact"
              className="group px-8 py-4 bg-accent text-black font-bold rounded-full hover:bg-accent-hover transition-all hover:scale-105 active:scale-95 flex items-center gap-2 text-lg"
            >
              {homepageContent.primaryCta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#packages"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/20 transition-all border border-white/20"
            >
              {homepageContent.secondaryCta}
            </Link>
          </motion.div>

          {/* Quick stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 flex flex-wrap justify-center gap-12 text-center"
          >
            {[
              { icon: Clock, value: '11+', label: 'Years Experience' },
              { icon: Award, value: '11', label: 'Certifications' },
              { icon: Users, value: '500+', label: 'Clients Trained' },
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-3">
                <stat.icon className="w-8 h-8 text-accent" />
                <div className="text-left">
                  <div className="font-display text-3xl md:text-4xl font-bold">{stat.value}</div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-accent rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0f] to-[#0f0f1a]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-accent text-sm font-bold tracking-[0.2em] uppercase mb-4"
            >
              = How It Works
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6 font-black"
            >
              YOUR TRANSFORMATION
              <span className="block gradient-text">JOURNEY</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/60 max-w-2xl mx-auto"
            >
              A comprehensive approach to fitness that addresses your unique goals, lifestyle, and preferences.
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                className="group relative p-8 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl hover:border-accent/40 transition-all duration-500 hover-lift"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                    <service.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-display text-2xl tracking-wide mb-4 font-bold">{service.title}</h3>
                  <p className="text-white/60 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Training gallery - all 10 images */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="mt-20"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-accent text-sm font-bold tracking-[0.2em] uppercase mb-4"
            >
              Training in action
            </motion.span>
            <motion.h3
              variants={fadeInUp}
              className="font-display text-3xl md:text-4xl tracking-tight mb-8 font-bold"
            >
              MOVE WITH PURPOSE
            </motion.h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { src: '/sean-hero-kettlebell.png', alt: 'Sean Beckford kettlebell training outdoors' },
                { src: '/sean-cossack.png', alt: 'Sean Beckford Cossack squat' },
                { src: '/sean-dumbbell-puppy.png', alt: 'Sean Beckford dumbbell row with puppy' },
                { src: '/sean-treadmill.png', alt: 'Sean Beckford on treadmill' },
                { src: '/sean-front-squat.png', alt: 'Sean Beckford front squat' },
                { src: '/sean-hanging-leg-raise.png', alt: 'Sean Beckford hanging leg raise' },
                { src: '/sean-cable-fly.png', alt: 'Sean Beckford cable chest fly' },
                { src: '/sean-cable-bw.png', alt: 'Sean Beckford cable exercise' },
                { src: '/sean-barbell.png', alt: 'Sean Beckford barbell training' },
                { src: '/sean-rowing.png', alt: 'Sean Beckford rowing machine' },
              ].map((img, index) => (
                <motion.div
                  key={img.src}
                  variants={fadeInUp}
                  className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 hover:border-accent/30 transition-colors"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section - With Sean's actual photo */}
      <section id="about" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0f0f1a]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side with Sean's photo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/sean-front-squat.png"
                  alt="Sean Beckford - Personal Trainer"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-transparent to-transparent" />
              </div>
              
              {/* Floating certification card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -right-6 z-20 bg-gradient-to-br from-secondary to-secondary-dark border border-secondary-light/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center">
                    <Award className="w-7 h-7 text-black" />
                  </div>
                  <div>
                    <div className="font-display text-3xl font-bold">11</div>
                    <div className="text-white/60 text-sm">Professional Certifications</div>
                  </div>
                </div>
              </motion.div>

              {/* Experience badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -top-4 -left-4 bg-accent text-black rounded-full px-5 py-2 font-bold text-sm"
              >
                11+ Years Experience
              </motion.div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-accent text-sm font-bold tracking-[0.2em] uppercase mb-4">
                Get to Know Your Coach
              </span>
              
              <h2 className="font-display text-5xl md:text-6xl tracking-tight mb-4 font-black">
                {homepageContent.aboutHeading}
              </h2>
              
              <h3 className="text-3xl text-accent mb-6 font-light italic">{homepageContent.aboutIntro}</h3>
              
              <div className="space-y-5 text-white/70 leading-relaxed mb-10 text-lg">
                <p>
                  I&apos;ve been a Fitness Trainer for <span className="text-white font-semibold">11 years</span> & I&apos;ve been fortunate to learn from the best at some of the top fitness gyms in North America throughout my career.
                </p>
                <p>
                  I put everything I have into ensuring my clients improve their bodies and lives. My commitment to continuing education throughout my fitness journey has helped me deliver a great service to my clients through <span className="text-accent">functional movement</span>, <span className="text-accent">nutrition</span> and <span className="text-accent">recovery methods</span>.
                </p>
                <p className="text-white">
                  I&apos;m looking forward to supporting you in your fitness journey.
                </p>
              </div>

              <h4 className="font-display text-lg tracking-wide mb-6 font-bold text-accent">FITNESS & BODYWORK CERTIFICATIONS</h4>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Packages Section - Clean pricing cards */}
      <section id="packages" className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f1a] via-[#0a0a0f] to-black" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-accent text-sm font-bold tracking-[0.2em] uppercase mb-4"
            >
              Packages
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6 font-black"
            >
              START YOUR TRAINING
              <span className="block gradient-text">JOURNEY TODAY</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/60 max-w-2xl mx-auto"
            >
              Choose the package that fits your goals and lifestyle. All packages include access to the Beckford Moves app.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative p-8 rounded-3xl border transition-all duration-500 hover-lift ${
                  pkg.popular
                    ? 'bg-gradient-to-br from-accent/20 to-accent/5 border-accent/40 scale-105'
                    : 'bg-gradient-to-br from-white/5 to-transparent border-white/10 hover:border-accent/30'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-accent text-black text-sm font-bold rounded-full tracking-wide">
                    MOST POPULAR
                  </div>
                )}

                <div className="mb-8">
                  <span className="text-accent font-bold tracking-wide">{pkg.name}</span>
                  <h3 className="font-display text-xl tracking-wide mt-2 mb-6 min-h-[56px]">{pkg.title}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-5xl font-bold">{pkg.price}</span>
                    <span className="text-white/60 text-lg">{pkg.period}</span>
                  </div>
                  <p className="text-white/40 text-sm mt-2">{pkg.commitment}</p>
                </div>

                <ul className="space-y-4 mb-10">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <Link
                    href="#contact"
                    className={`block w-full py-4 rounded-full font-bold text-center transition-all ${
                      pkg.popular
                        ? 'bg-accent text-black hover:bg-accent-hover hover:scale-105'
                        : 'bg-white/10 text-white hover:bg-accent hover:text-black'
                    }`}
                  >
                    Get Started
                  </Link>
                  <Link
                    href="#contact"
                    className="block w-full py-3 rounded-full font-medium text-center text-white/50 hover:text-accent transition-colors border border-transparent hover:border-accent/20"
                  >
                    {homepageContent.primaryCta}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-accent text-sm font-bold tracking-[0.2em] uppercase mb-4"
            >
              Success Stories
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight font-black"
            >
              CLIENT <span className="gradient-text">TRANSFORMATIONS</span>
            </motion.h2>
          </motion.div>

          {/* Google Reviews or Static Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            <GoogleReviews maxReviews={6} />
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="p-8 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl hover:border-accent/30 transition-all duration-300 hover-lift"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-white/80 leading-relaxed mb-8 text-lg italic">&quot;{testimonial.content}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-white/50 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FST Section */}
      <section id="fst" className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-[#0f0f1a]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-accent text-sm font-bold tracking-[0.2em] uppercase mb-4">
                Specialized Service
              </span>
              
              <h2 className="font-display text-5xl md:text-6xl tracking-tight mb-8 font-black">
                FASCIAL STRETCH
                <span className="block gradient-text">THERAPY</span>
              </h2>
              
              <div className="space-y-5 text-white/70 leading-relaxed mb-10 text-lg">
                <p>
                  Fascial Stretch Therapy (FST) is a unique, complete, and complementary system of table-based assisted stretching, focusing on the fascia and joint capsule as the key elements in achieving optimal flexibility, strength, performance, and pain relief.
                </p>
                <p>
                  As a <span className="text-accent font-semibold">Level 2 Certified Fascial Stretch Therapist</span>, I can help you improve mobility, reduce pain, and enhance your overall movement quality.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {['Improved flexibility & mobility', 'Reduced muscle tension & pain', 'Better posture & alignment', 'Enhanced athletic performance'].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-white/80 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-black font-bold rounded-full hover:bg-accent-hover transition-all hover:scale-105"
              >
                Learn More About FST
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
                <Image
                  src="/549049402_1484409522793244_4827967998982376665_nfull.webp"
                  alt="Fascial Stretch Therapy Session"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Stats overlay */}
              <div className="absolute -bottom-6 -left-6 z-10 bg-gradient-to-br from-secondary to-secondary-dark border border-secondary-light/30 rounded-2xl px-6 py-4 shadow-2xl">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                  <span className="text-white font-semibold">Level 2 Certified</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0f0f1a]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-accent text-sm font-bold tracking-[0.2em] uppercase mb-4">
              @beckford_sean
            </span>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-6 font-black">
              FITNESS & LIFESTYLE CONTENT
            </h2>
            <p className="text-white/60 mb-10 max-w-xl mx-auto">
              Follow along for daily workout tips, nutrition advice, and motivation to keep you on track.
            </p>
            
            {/* Instagram Feed - Auto-updates weekly */}
            <InstagramFeed />
            
            <a
              href="https://instagram.com/beckford_sean"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
            >
              <Instagram className="w-5 h-5" />
              Follow on Instagram
            </a>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Free Resources / Ebook Section */}
      <section id="resources" className="py-28 relative">
        <div className="absolute inset-0 bg-[#0f0f1a]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-accent text-sm font-bold tracking-[0.2em] uppercase mb-4">
              Free Resources
            </span>
            <h2 className="font-display text-5xl md:text-6xl tracking-tight mb-6 font-black">
              GET SEAN&apos;S <span className="gradient-text">EBOOK</span>
            </h2>
            <p className="text-white/70 mb-10 text-lg max-w-2xl mx-auto">
              Free guide to support your training and nutrition. Enter your email and we&apos;ll send you the download link.
            </p>
            <EbookForm />
            <p className="mt-6 text-white/50 text-sm">
              Or <Link href="/ebook.pdf" className="text-accent hover:underline">download directly</Link> if you have the link.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-28 relative">
        <div className="absolute inset-0 bg-black" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-accent text-sm font-bold tracking-[0.2em] uppercase mb-4">
                Speak to Sean
              </span>
              
              <h2 className="font-display text-5xl md:text-6xl tracking-tight mb-6 font-black">
                REQUEST A
                <span className="block gradient-text">CONSULTATION CALL</span>
              </h2>
              
              <p className="text-white/60 mb-10 text-lg">
                Ready to start your transformation? Book a free consultation call to discuss your goals and how we can work together.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-secondary/30 rounded-2xl flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Location</div>
                    <div className="text-white/60">Virtual Training Worldwide</div>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-secondary/30 rounded-2xl flex items-center justify-center">
                    <Instagram className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Instagram</div>
                    <a href="https://instagram.com/beckford_sean" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">@beckford_sean</a>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-12 pt-8 border-t border-secondary/30">
                <p className="text-white/40 text-sm mb-4">Trusted credentials:</p>
                <div className="flex flex-wrap gap-3">
                  {['NSCA CSCS', 'Precision Nutrition', 'FST Level 2', 'Vodder MLD', 'Medical Acupuncture (coming)', 'RYT'].map((badge) => (
                    <span key={badge} className="px-3 py-1.5 bg-secondary/20 border border-secondary/30 rounded-full text-xs text-white/60">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl p-10"
            >
              {contactFormState === 'success' ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
                  <h3 className="font-display text-2xl mb-2">Message Sent!</h3>
                  <p className="text-white/60">
                    Thanks for reaching out. Sean will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-white/80">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={contactFormData.firstName}
                        onChange={handleContactChange}
                        required
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-white/80">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={contactFormData.lastName}
                        onChange={handleContactChange}
                        required
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white/80">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={contactFormData.email}
                      onChange={handleContactChange}
                      required
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white/80">What are your goals? *</label>
                    <textarea
                      name="goals"
                      value={contactFormData.goals}
                      onChange={handleContactChange}
                      required
                      rows={4}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                      placeholder="Tell me about your fitness goals..."
                    />
                  </div>
                  {contactFormState === 'error' && (
                    <p className="text-red-400 text-sm">Something went wrong. Please try again or email directly.</p>
                  )}
                  <button
                    type="submit"
                    disabled={contactFormState === 'submitting'}
                    className="w-full py-5 bg-accent text-black font-bold rounded-xl hover:bg-accent-hover transition-all hover:scale-[1.02] active:scale-[0.98] text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {contactFormState === 'submitting' ? 'Sending...' : 'Request Consultation'}
                  </button>
                  <p className="text-center text-white/40 text-sm">
                    Free 15-minute call • No commitment required
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
