# Full Content Discovery and Seed Report (beckford-moves)

**Date:** 2026-03-14

## 1. Discovery scope

- **Scanned:** All frontend source files under `src/app` and `src/components` (recursive).
- **Patterns:** `getText(content, "key", ...)`, `getText(content, 'key', ...)`, `content["key"]`, `content['key']`.

## 2. Discovered content keys (unique, sorted)

| # | Key |
|---|-----|
| 1 | hero_body |
| 2 | hero_closing |
| 3 | hero_cta |
| 4 | hero_cta_secondary |
| 5 | hero_subtitle |
| 6 | hero_title |

**Total:** 6 keys. All are used in `src/app/page.tsx` via `getText(content, "key", fallback)`.

## 3. Seed script

- **Path:** `scripts/seed-full-content.ts`
- **Behavior:** Loads `.env.local`, discovers keys from source, connects to Supabase with Service Role, reads existing keys from public view `beckford_site_content`, inserts missing keys via RPC `upsert_beckford_site_content` with value `{ "text": "Default" }`.
- **Run:** `npx tsx scripts/seed-full-content.ts` from repo root (`sean-site`).
- **Note:** The `beckford` schema is not exposed to the API; the script uses the public view for reads and the existing RPC for writes.

## 4. Seed run result

```
Discovered keys: 6
  - hero_body
  - hero_closing
  - hero_cta
  - hero_cta_secondary
  - hero_subtitle
  - hero_title
Done. Inserted 0 new keys; 6 already existed.
```

All 6 keys were already present in `beckford.site_content` (previous seed). No new rows were inserted.

## 5. Admin Dashboard UI changes

- **File:** `src/app/admin/AdminDashboard.tsx`
- **Update:** Keys are grouped by **section** (key prefix before the first `_`). Each section is collapsible (click header to expand/collapse). Section headers show the prefix (e.g. `hero`) and key count. This supports large numbers of keys without a single long flat list.

## 6. Confirmation: Admin Dashboard shows all keys

- The Admin page (`/admin`) loads content server-side via `siteContentTable(supabase).select("id, key, value, updated_at").order("key")`, which reads from the same `beckford_site_content` view used by the seed script.
- After seeding, every discovered key exists in the database and is returned by that query. The dashboard receives them as `initialContent` and displays them, grouped by section. All 6 keys are available for editing.

## 7. Fail-loud behavior

- Missing `.env.local` or missing `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` throws and exits(1).
- Zero discovered keys throws (no keys in source).
- Supabase select or RPC errors throw with a clear message and exit(1).
