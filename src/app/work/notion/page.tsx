import { searchProjects } from "@/lib/notion";

export const metadata = { title: "Notion Projects" };

/** Avoid prerender at build time so missing/invalid NOTION_TOKEN does not fail the build. */
export const dynamic = "force-dynamic";

export default async function NotionProjectsPage() {
  if (!process.env.NOTION_TOKEN) {
    return (
      <section className="prose prose-zinc dark:prose-invert">
        <h1>Notion Projects</h1>
        <p>Set NOTION_TOKEN to enable Notion-sourced content.</p>
      </section>
    );
  }
  let items: Awaited<ReturnType<typeof searchProjects>>;
  try {
    items = await searchProjects("project", 12);
  } catch {
    return (
      <section className="prose prose-zinc dark:prose-invert">
        <h1>Notion Projects</h1>
        <p>Notion could not be loaded. Check NOTION_TOKEN and integration access.</p>
      </section>
    );
  }
  return (
    <section className="prose prose-zinc dark:prose-invert">
      <h1>Notion Projects</h1>
      <ul>
        {items.map((p) => (
          <li key={p.id}>
            <a href={p.url} target="_blank" rel="noreferrer">
              {p.title}
            </a>
            <span className="ml-2 text-sm text-zinc-500">(edited {new Date(p.lastEdited).toLocaleDateString()})</span>
          </li>
        ))}
      </ul>
    </section>
  );
}


