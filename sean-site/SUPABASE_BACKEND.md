# Supabase backend (Feb 19 deployment)

Backend is in project **piweqfwrfjhwtoupkzlv** (env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`).

## Schema `beckford`

| Table            | Purpose | Anon access | Service role |
|------------------|---------|-------------|--------------|
| `site_content`   | CMS key/value (hero, etc.) | SELECT only | Full (upsert) |
| `admin_secrets`  | Single row: bcrypt `password_hash` for `/admin` login | None | Full |

## RLS

- **site_content**: policy "Public read site_content" allows `anon` SELECT. Writes use service role in API route.
- **admin_secrets**: no policies for anon; only service role (used in `/api/admin/login`) can read.

## Migrations applied

- `beckford_site_content_and_admin`: schema + tables.
- `seed_beckford_site_content_defaults`: hero_title, hero_subtitle, hero_body, hero_closing, hero_cta, hero_cta_secondary.
- `grant_beckford_anon_access`: USAGE on schema beckford + SELECT on site_content for anon.

## Expose `beckford` schema (required for admin login)

The API only allows schemas listed in **Project Settings → API → Exposed schemas**. Add **beckford** there so the app can read `admin_secrets` and `site_content`.

## Set admin password

If login says "Admin not configured" or you need to reset the password:

1. **Expose schema** (see above): Dashboard → Project Settings → API → Exposed schemas → add `beckford`.
2. **Set password in DB**: In **SQL Editor**, run the contents of `scripts/set-admin-password.sql`. That sets the password to **admin** (bcrypt). To use a different password later, run `node scripts/set-admin-password.js yourpassword` (after step 1) so the script can update the row via the API.

## Using with the app

- **Local (dev:local)**: Ensure `.env.local` has the three Supabase vars; home page and admin use this backend.
- **Feb 19 proxy**: `npm run dev` serves the deployment URL only; that deploy used whatever env it had at build time. To have the Feb 19 front end talk to this backend, run the app locally (`npm run dev:local`) or redeploy with this project’s env vars.
