"use client";

import { useState } from "react";
import { CalendlyEmbed } from "@/components/Calendly";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setMessage("Thanks! We’ll be in touch shortly.");
    } catch (e) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="prose prose-zinc dark:prose-invert">
      <h1 className="text-4xl font-bold mb-4">SPEAK TO SEAN</h1>
      <h2 className="text-3xl font-semibold mb-6">Request a Consultation Call</h2>
      <p className="text-lg mb-6">Have questions about which package is right for you? Want to learn more about how we can work together? Schedule a free consultation call to discuss your goals and how we can help you achieve them.</p>
      <form
        action={handleSubmit}
        className="not-prose mt-6 grid max-w-xl gap-4"
      >
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <input id="name" name="name" required className="rounded-md border border-zinc-300 bg-white p-2 outline-none ring-0 transition-shadow focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)] dark:border-zinc-700 dark:bg-zinc-900" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input id="email" type="email" name="email" required className="rounded-md border border-zinc-300 bg-white p-2 outline-none ring-0 transition-shadow focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)] dark:border-zinc-700 dark:bg-zinc-900" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="message" className="text-sm font-medium">Message</label>
          <textarea id="message" name="message" required rows={5} className="rounded-md border border-zinc-300 bg-white p-2 outline-none ring-0 transition-shadow focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)] dark:border-zinc-700 dark:bg-zinc-900" />
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-fit rounded-md bg-black px-4 py-2 text-white transition-opacity hover:opacity-90 disabled:opacity-60 dark:bg-white dark:text-black"
        >
          {status === "submitting" ? "Sending…" : "Send"}
        </button>
        {message && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{message}</p>
        )}
      </form>
    </section>
  );
}


