import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <header className="border-b border-white/10 bg-[#0a0a0f]/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="font-display text-xl tracking-tight text-white">
            Beckford Moves <span className="text-[var(--accent)]">Dashboard</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-10">
        {children}
      </div>
    </div>
  )
}
