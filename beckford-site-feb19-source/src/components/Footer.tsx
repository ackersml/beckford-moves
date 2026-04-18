'use client'

import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0a0a0f] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Beckford Moves Logo"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <span className="font-display text-xl tracking-tight text-white">BECKFORD</span>
                <span className="font-display text-xl tracking-tight text-accent ml-1">MOVES</span>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Virtual 1-on-1 training and nutrition guidance. Train from anywhere with the Beckford Moves app.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/beckford_sean" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white/60 hover:text-accent hover:border-accent/30 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="mailto:beckford.sean@gmail.com" 
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white/60 hover:text-accent hover:border-accent/30 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-sm tracking-wider text-white mb-6">SERVICES</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-white/50 hover:text-accent transition-colors text-sm">
                  Personal Training
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/50 hover:text-accent transition-colors text-sm">
                  Nutrition Coaching
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/50 hover:text-accent transition-colors text-sm">
                  Wellness & Recovery
                </Link>
              </li>
              <li>
                <Link href="/fst-massage-therapy" className="text-white/50 hover:text-accent transition-colors text-sm">
                  Fascial Stretch Therapy
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display text-sm tracking-wider text-white mb-6">COMPANY</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-white/50 hover:text-accent transition-colors text-sm">
                  About Sean
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-white/50 hover:text-accent transition-colors text-sm">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-white/50 hover:text-accent transition-colors text-sm">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/50 hover:text-accent transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#resources" className="text-white/50 hover:text-accent transition-colors text-sm">
                  Free ebook
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/50 hover:text-accent transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-white/50 hover:text-accent transition-colors text-sm">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-display text-sm tracking-wider text-white mb-6">TRAINING</h3>
            <p className="text-white/50 text-sm mb-2">Virtual Sessions Worldwide</p>
            <p className="text-white/50 text-sm mb-6">Train from anywhere with live coaching via Zoom, FaceTime, or Skype</p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 text-accent hover:underline text-sm"
            >
              Schedule Free Consultation →
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Beckford Moves. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-white/40 hover:text-accent transition-colors text-sm"
          >
            <ArrowUp className="w-4 h-4" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
