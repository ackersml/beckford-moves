import type { Metadata } from 'next'
import { Outfit, Bebas_Neue } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Beckford Moves | Personal Training & Nutrition Coaching',
    template: '%s | Beckford Moves',
  },
  description: 'Transform your body with personalized 1-on-1 virtual training and nutrition guidance. 11 years of experience. Train from anywhere in the world.',
  keywords: ['personal trainer', 'fitness coaching', 'nutrition guidance', 'Toronto', 'online training', 'fascial stretch therapy', 'Sean Beckford'],
  authors: [{ name: 'Sean Beckford' }],
  openGraph: {
    title: 'Beckford Moves | Personal Training & Nutrition Coaching',
    description: 'Transform your body with personalized 1-on-1 training and nutrition guidance. 11 years experience.',
    url: 'https://www.beckfordmoves.com',
    siteName: 'Beckford Moves',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beckford Moves',
    description: 'Personalized fitness and nutrition coaching with Sean Beckford',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${bebas.variable}`}>
      <body className="min-h-screen bg-[#0a0a0f] text-white antialiased">
        <Header />
        <main className="pt-[73px]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
