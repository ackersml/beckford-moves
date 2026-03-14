import { allWorks } from "contentlayer/generated";
import Link from "next/link";

export const metadata = { title: "Work" };

export default function WorkPage() {
  const works = allWorks.sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <section className="prose prose-zinc dark:prose-invert">
      <h1>Work / Portfolio</h1>
      <ul>
        {works.map((w) => (
          <li key={w._id}>
            <Link href={`/work/${w.slug}`}>{w.title}</Link>
            {w.summary ? <p>{w.summary}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}


