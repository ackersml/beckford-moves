'use client'

import Link from 'next/link'
import {
  ExternalLink,
  LayoutDashboard,
  FileEdit,
  Home,
  User,
  Package,
  Dumbbell,
  BookOpen,
  Mail,
  Heart,
  Star,
} from 'lucide-react'

const sitePages = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: User },
  { href: '/packages', label: 'Packages', icon: Package },
  { href: '/services', label: 'How It Works', icon: Dumbbell },
  { href: '/blog', label: 'Blog', icon: BookOpen },
  { href: '/contact', label: 'Contact', icon: Mail },
  { href: '/fst-massage-therapy', label: 'RMT & FST', icon: Heart },
  { href: '/success-stories', label: 'Success Stories', icon: Star },
]

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl md:text-4xl tracking-tight text-white mb-2">
          Platform dashboard
        </h1>
        <p className="text-white/60">
          Navigate the site and edit content from here.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--accent)]/40 transition-all"
        >
          <div className="w-14 h-14 rounded-xl bg-[var(--accent)]/20 flex items-center justify-center group-hover:bg-[var(--accent)]/30 transition-colors">
            <ExternalLink className="w-7 h-7 text-[var(--accent)]" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-lg font-semibold text-white mb-1">
              View live site
            </h2>
            <p className="text-white/50 text-sm">
              Open the public homepage in a new tab
            </p>
          </div>
        </a>

        <Link
          href="/studio"
          className="group flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--accent)]/40 transition-all"
        >
          <div className="w-14 h-14 rounded-xl bg-[var(--accent)]/20 flex items-center justify-center group-hover:bg-[var(--accent)]/30 transition-colors">
            <FileEdit className="w-7 h-7 text-[var(--accent)]" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-lg font-semibold text-white mb-1">
              Edit content (Sanity Studio)
            </h2>
            <p className="text-white/50 text-sm">
              Update blog posts, packages, services, testimonials
            </p>
          </div>
        </Link>
      </div>

      <div>
        <h2 className="font-display text-xl tracking-tight text-white mb-4 flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-[var(--accent)]" />
          Quick links to pages
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {sitePages.map((page) => {
            const Icon = page.icon
            return (
              <Link
                key={page.href}
                href={page.href}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all text-left"
              >
                <Icon className="w-5 h-5 text-[var(--accent)] flex-shrink-0" />
                <span className="text-sm font-medium text-white truncate">
                  {page.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
