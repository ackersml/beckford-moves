export default function Home() {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-4">
          1 on 1 Personal Training, Life Coaching and Nutrition Guidance
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-6">
          Transform your fitness journey with personalized 1-on-1 training, life coaching, and
          nutrition guidance. Sean Beckford brings 11 years of experience and 9 professional
          certifications to create custom programs that deliver real results.
        </p>
        <p className="text-lg mb-6">
          Train virtually from anywhere or in-person in Downtown Toronto. Access your programming,
          video demonstrations, and 24/7 support through the beckfordfitness app. Flexible packages
          from $299/month or individual sessions available.
        </p>
        <p className="mb-8">
          Our holistic approach combines functional movement, evidence-based nutrition, and recovery
          methods to help you achieve lasting transformation.
        </p>
        <p className="not-prose">
          <a
            href="/contact"
            className="inline-block rounded-md bg-black px-6 py-3 text-white hover:opacity-90 dark:bg-white dark:text-black mr-4"
          >
            <strong>Schedule a Free Consultation</strong>
          </a>
          <a
            href="/packages"
            className="inline-block rounded-md border border-zinc-300 px-6 py-3 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            View Packages
          </a>
        </p>
      </section>

      {/* How It Works Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">How It Works</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Onboarding</h3>
            <p>
              Upon signup you will receive a personal, 1 on 1 video consultation to help me
              understand your goals, circumstances and preferences.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p>
              When you begin your training program with me, you get unlimited instant messaging
              access to address any questions you may have and provide assistance.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Training Program</h3>
            <p>
              I use the information provided to me during our assessment to build a training program
              to your needs and goals. This removes the guessing from your workout plans.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">iOS & Android App</h3>
            <p>
              All your programming is easily accessible via the beckfordfitness app on iOS & Android
              devices powered by Trainerize. You&apos;ll also be able to upload information and chat
              with me directly.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Meal Plan</h3>
            <p>
              A complete guide to healthy eating, tailored for you. Caloric intake, macronutrient
              profiles, easy recipes and shopping lists.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Beyond Fitness</h3>
            <p>
              I can help set you up for success through all aspects of a healthy lifestyle, including
              mindfulness, yoga, reflection and life coaching.
            </p>
          </div>
        </div>
        <p>
          <a href="/how-it-works">See the full process →</a>
        </p>
      </section>

      {/* Success Stories Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-4">Client Transformations</h2>
        <p className="text-lg mb-6">
          Real results from clients building strength, mobility, and confidence.
        </p>
        <p>
          <a href="/success-stories">View success stories →</a>
        </p>
      </section>

      {/* Instagram Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-4">Fitness & Lifestyle Content</h2>
        <p className="mb-4">
          Follow @beckford_sean for daily fitness tips, workout inspiration, and lifestyle content.
        </p>
        <p className="not-prose">
          <a
            href="https://instagram.com/beckford_sean"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-white hover:opacity-90"
          >
            Follow on Instagram
          </a>
        </p>
      </section>

      {/* Newsletter Section */}
      <section className="mb-16 bg-zinc-50 dark:bg-zinc-900 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Sign up to Move with Sean!</h2>
        <p className="mb-4">
          You&apos;ll be receiving content all on how to move well whether you&apos;re in a gym, at
          home or on the go.
        </p>
        <p className="mb-4">
          Find out how to balance fitness within your life, and not jump from one random workout
          program to another.
        </p>
        <p className="mb-4">
          In the newsletter, you&apos;ll also be receiving information on nutrition topics covering
          blending aesthetics & performance.
        </p>
        <p className="mb-6">Be sure to subscribe for more updates.</p>
        <p className="not-prose">
          <a
            href="/newsletter"
            className="inline-block rounded-md bg-black px-6 py-3 text-white hover:opacity-90 dark:bg-white dark:text-black"
          >
            Subscribe to Newsletter
          </a>
        </p>
      </section>
    </div>
  );
}
