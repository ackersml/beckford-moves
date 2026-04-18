"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS: Array<{ href: string; label: string }> = [
  { href: "/", label: "Home" },
  { href: "/services", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/packages", label: "Packages" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/fst-massage-therapy", label: "RMT & FST" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
            <img
              src="/logo.png"
              alt="Beckford Moves Logo"
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-xl tracking-tight text-white">BECKFORD</span>
            <span className="font-display text-xl tracking-tight text-accent ml-1">MOVES</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/"
              ? pathname === "/"
              : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  `px-3 py-2 rounded-lg text-sm font-medium transition-colors ` +
                  (isActive 
                    ? "text-accent bg-accent/10" 
                    : "text-white/60 hover:text-white hover:bg-white/5")
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link 
            href="/contact" 
            className="px-5 py-2.5 bg-accent text-black font-semibold rounded-lg hover:bg-accent-hover transition-colors"
          >
            Free Consultation
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#0a0a0f] border-t border-white/10">
          <nav className="flex flex-col p-4 space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    `px-4 py-3 rounded-lg text-base font-medium transition-colors ` +
                    (isActive 
                      ? "text-accent bg-accent/10" 
                      : "text-white/60 hover:text-white hover:bg-white/5")
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link 
              href="/contact" 
              className="mt-4 px-4 py-3 bg-accent text-black font-semibold rounded-lg text-center hover:bg-accent-hover transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Free Consultation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
