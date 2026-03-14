export const metadata = {
  title: "Newsletter",
};

export default function NewsletterPage() {
  return (
    <section className="prose prose-zinc dark:prose-invert max-w-2xl">
      <h1 className="text-4xl font-bold mb-6">Sign up to Move with Sean!</h1>
      <p className="text-lg mb-4">You'll be receiving content all on how to move well whether you're in a gym, at home or on the go.</p>
      <p className="mb-4">Find out how to balance fitness within your life, and not jump from one random workout program to another.</p>
      <p className="mb-4">In the newsletter, you'll also be receiving information on nutrition topics covering blending aesthetics & performance.</p>
      <p className="mb-8">Be sure to subscribe for more updates.</p>

      <form className="not-prose mt-6 grid max-w-md gap-4">
        <div className="grid gap-2">
          <label htmlFor="firstName" className="text-sm font-medium">First Name *</label>
          <input id="firstName" name="firstName" required className="rounded-md border border-zinc-300 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-900" placeholder="First Name" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="lastName" className="text-sm font-medium">Last Name *</label>
          <input id="lastName" name="lastName" required className="rounded-md border border-zinc-300 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-900" placeholder="Last Name" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">Email Address *</label>
          <input id="email" type="email" name="email" required className="rounded-md border border-zinc-300 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-900" placeholder="Email Address" />
        </div>
        <button className="rounded-md bg-black px-6 py-3 text-white hover:opacity-90 dark:bg-white dark:text-black" type="submit">
          Subscribe
        </button>
      </form>
    </section>
  );
}









