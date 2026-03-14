export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <section className="prose prose-zinc dark:prose-invert max-w-3xl">
      <h1 className="text-4xl font-bold mb-4">Get to Know Your Coach</h1>
      <h2 className="text-3xl font-semibold mb-6">My Story</h2>
      
      <h3 className="text-2xl font-semibold mb-4">Hi! I'm Sean</h3>
      
      <p className="mb-4">
        I've been a Fitness Trainer for 11 years and I've been fortunate to learn from the best at some of the top fitness gyms in North America throughout my career. My journey in fitness began with a passion for helping people transform not just their bodies, but their entire approach to health and wellness.
      </p>
      
      <p className="mb-4">
        I put everything I have into ensuring my clients improve their bodies and lives. My commitment to continuing education throughout my fitness journey has helped me deliver a great service to my clients through functional movement, nutrition and recovery methods. I believe that true transformation happens when we address the whole person—mind, body, and spirit. That's why my approach goes beyond traditional personal training to include life coaching, nutrition guidance, and holistic wellness practices.
      </p>
      
      <p className="mb-4">
        What sets my practice apart is the personalized attention I give to each client. Every program is tailored specifically to your goals, circumstances, and preferences. Whether you're training for a specific event, recovering from an injury, or simply looking to improve your overall quality of life, I work with you to create a sustainable path forward.
      </p>
      
      <p className="mb-4">
        My training philosophy centers on functional movement, proper form, and evidence-based methods. I combine strength training, mobility work, and recovery techniques to help you move better, feel stronger, and live more fully. Through my iOS and Android app, powered by Trainerize, you'll have access to your programming, video demonstrations, and direct communication with me 24/7.
      </p>
      
      <p className="mb-8">
        I'm looking forward to supporting you in your fitness journey. Whether you're just starting out or you're an experienced athlete looking to break through plateaus, I'm here to guide you every step of the way. Together, we'll build strength, improve mobility, and create lasting habits for long-term health and wellness.
      </p>
      
      <h3 className="text-2xl font-semibold mb-4">My current certifications include:</h3>
      <ul className="mb-8 space-y-2">
        <li>• (NSCA) Certified Strength and Conditioning Specialist – National Strength and Conditioning Association</li>
        <li>• Registered Massage Therapist (In Training)</li>
        <li>• Fascial Stretch Therapist (Level 2)</li>
        <li>• Registered Yoga Teacher (Yoga Alliance Certified)</li>
        <li>• Precision Nutrition Level 1 & 2 Coach</li>
        <li>• Certified Pre and Post Natal Coach (CPPC) – Girls' Gone Strong</li>
        <li>• TRX Coach</li>
        <li>• FMT Rocktape Level 1 (Kinesology Taping – KT)</li>
        <li>• Agatsu Speed & Strength Specialist</li>
      </ul>
      
      <p className="mb-8">
        These certifications reflect my dedication to staying current with the latest research and techniques in fitness, nutrition, and recovery. I'm committed to providing you with the highest quality coaching and support as you work toward your goals.
      </p>
      
      <p className="not-prose">
        <a href="/contact" className="inline-block rounded-md bg-black px-6 py-3 text-white hover:opacity-90 dark:bg-white dark:text-black mr-4">
          Schedule a Free Consultation
        </a>
        <a href="/packages" className="inline-block rounded-md border border-zinc-300 px-6 py-3 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900">
          View Packages
        </a>
      </p>
    </section>
  );
}

















