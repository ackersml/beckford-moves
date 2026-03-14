const NOTION_API_BASE = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

export type NotionProject = {
  id: string;
  title: string;
  url: string;
  lastEdited: string;
};

async function notionRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const token = process.env.NOTION_TOKEN;
  if (!token) throw new Error("NOTION_TOKEN not set");
  const res = await fetch(`${NOTION_API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    ...init,
  });
  if (!res.ok) throw new Error(`Notion error: ${res.status}`);
  return res.json();
}

export async function searchProjects(query = "project", limit = 10): Promise<NotionProject[]> {
  const body = {
    query,
    page_size: limit,
    sort: { direction: "descending", timestamp: "last_edited_time" },
  };
  const data = await notionRequest<any>(`/search`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const results = (data.results || []) as any[];
  return results
    .filter((r) => r.object === "page")
    .map((page) => {
      const props = page.properties || {};
      let title = "Untitled";
      for (const key of Object.keys(props)) {
        if (props[key]?.type === "title") {
          title = (props[key].title || []).map((t: any) => t.plain_text).join("") || "Untitled";
          break;
        }
      }
      return {
        id: page.id,
        title,
        url: `https://www.notion.so/${page.id.replace(/-/g, "")}`,
        lastEdited: page.last_edited_time,
      } satisfies NotionProject;
    });
}

















