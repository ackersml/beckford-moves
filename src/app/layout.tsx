import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GA";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Beckford Fitness",
    template: "%s — Beckford Fitness",
  },
  description: "1 on 1 personal training, life coaching, and nutrition guidance.",
  metadataBase: new URL("https://beckfordfitness.com"),
  openGraph: {
    title: "Beckford Fitness",
    description: "Personal training, coaching, and nutrition — in person and virtual.",
    url: "https://beckfordfitness.com",
    siteName: "Beckford Fitness",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Beckford Fitness" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beckford Fitness",
    description: "Personal training, coaching, and nutrition — in person and virtual.",
    images: ["/og.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main className="mx-auto min-h-[70vh] max-w-6xl px-6 py-10">{children}</main>
        <Footer />
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
