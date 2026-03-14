import { notFound } from "next/navigation";
import { allWorks } from "contentlayer/generated";
import { MDX } from "@/components/MDX";

export const dynamicParams = false;

export function generateStaticParams() {
  return allWorks.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const work = allWorks.find((w) => w.slug === params.slug);
  if (!work) return {};
  return {
    title: work.title,
    description: work.summary,
    openGraph: { images: work.cover ? [work.cover] : [] },
  };
}

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const work = allWorks.find((w) => w.slug === params.slug);
  if (!work) return notFound();
  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">{work.title}</h1>
        {work.summary && (
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">{work.summary}</p>
        )}
      </header>
      <MDX code={work.body.code} />
    </article>
  );
}


