export function CalendlyEmbed() {
  const url = process.env.NEXT_PUBLIC_CALENDLY_URL;
  if (!url) return null;
  return (
    <div className="not-prose mt-8">
      <iframe
        src={url}
        className="h-[800px] w-full rounded-md border border-zinc-200 dark:border-zinc-800"
        title="Schedule time"
      />
    </div>
  );
}

















