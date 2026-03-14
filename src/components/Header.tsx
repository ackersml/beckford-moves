"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS: Array<{ href: string; label: string }> = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/packages", label: "Packages" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/fascial-stretch-therapy", label: "RMT & FST" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-900/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-baseline gap-1 text-lg font-semibold tracking-tight">
          <span className="text-white">BECKFORD</span>
          <span className="text-[var(--accent)]">MOVES</span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  `rounded-md px-3 py-2 transition-colors ` +
                  (isActive
                    ? "bg-[var(--accent)] font-medium text-white"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-white")
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/contact"
          className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Free Consultation
        </Link>
      </div>
    </header>
  );
}
