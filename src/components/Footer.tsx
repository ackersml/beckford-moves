export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>© {year} Beckford Fitness</p>
        <p className="space-x-4">
          <a className="hover:underline" href="/privacy">
            Privacy
          </a>
          <a className="hover:underline" href="/terms">
            Terms
          </a>
        </p>
      </div>
    </footer>
  );
}
