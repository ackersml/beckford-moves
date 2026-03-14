# Deploy Next.js + Supabase to Vercel

This document covers environment variables, Vercel CLI commands, code verification, and step-by-step deployment so the app and `/admin` work in production.

---

## 1. Supabase-related environment variables (from `.env.local`)

These are the variables your app uses for Supabase and admin. All must be set in Vercel for production.

| Variable | Description | Mark as sensitive in Vercel |
|----------|-------------|-----------------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (e.g. `https://xxx.supabase.co`) | No |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous (public) key for client/server reads | No |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only; admin + content writes) | **Yes** |
| `ADMIN_COOKIE_SECRET` | Secret used to sign the admin session cookie (min 16 chars) | **Yes** |

Your `.env.local` contains exactly these four. Optional vars used elsewhere in the app (contact form, GA, Calendly, Notion) are not required for Supabase or admin; add them in Vercel only if you use those features.

---

## 2. Exact Vercel CLI commands to add environment variables

Run these from the **sean-site** directory. For each command, the CLI will prompt for the value; paste from your `.env.local`.

**Production only:**

```bash
cd "/Users/michelleackers/Desktop/portfolio-systems/Sean Beckford/sean-site"

vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production --sensitive
vercel env add ADMIN_COOKIE_SECRET production --sensitive
```

**If you also want Preview (e.g. PR previews) to use Supabase:**

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL preview
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview
vercel env add SUPABASE_SERVICE_ROLE_KEY preview --sensitive
vercel env add ADMIN_COOKIE_SECRET preview --sensitive
```

**Alternative – add for all environments in one go:**  
Run `vercel env add <NAME>` without `production`/`preview` and select the environments when prompted.

---

## 3. Admin route verification (`app/admin/page.tsx`)

- **No hardcoded localhost.** The admin page uses:
  - `createSupabaseAdmin()` and `siteContentTable()` from `@/lib/supabase`, which read URL/keys from `process.env` at runtime.
  - `isAdmin()` from `@/lib/admin-auth`, which uses `process.env.ADMIN_COOKIE_SECRET`.
- **No direct `process.env` in the page**; env is used only inside `supabase.ts` and `admin-auth.ts`, which is correct for server components and API routes.

The login API (`app/api/admin/login/route.ts`) uses `process.env.NODE_ENV === "production"` for the cookie `secure` flag and `createSupabaseAdmin()` for DB access. No localhost references.

No code changes are required in the admin route or login route for production.

---

## 4. Supabase client initialization (production behavior)

**File: `src/lib/supabase.ts`**

- **No localhost.** URL and keys come from `process.env` only:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
- **Env is read at call time** inside `createSupabaseClient()` and `createSupabaseAdmin()`, so Vercel’s production env vars are used automatically.
- **Error handling:** Missing env throws clear errors:
  - `NEXT_PUBLIC_SUPABASE_URL is required`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY is required`
  - `SUPABASE_SERVICE_ROLE_KEY is required for admin`

The client is production-ready as long as the variables above are set in Vercel.

---

## 5. Step-by-step deployment instructions

### 5.1 Link the project to Vercel

1. Open a terminal and go to the app directory:
   ```bash
   cd "/Users/michelleackers/Desktop/portfolio-systems/Sean Beckford/sean-site"
   ```
2. Run:
   ```bash
   vercel link
   ```
3. When prompted, choose your Vercel team/account and either select an existing project or create a new one. This creates/updates `.vercel/project.json` and links the folder to that project.

### 5.2 Add the environment variables

1. With the same terminal in `sean-site`, run the four commands from **Section 2** (production, or production + preview as needed).
2. When the CLI asks for the value, paste the corresponding value from your `.env.local`.
3. Confirm in the Vercel dashboard: Project → Settings → Environment Variables. All four variables should appear for the chosen environment(s).

### 5.3 Trigger a production deployment

**Option A – Vercel CLI**

```bash
cd "/Users/michelleackers/Desktop/portfolio-systems/Sean Beckford/sean-site"
vercel --prod
```

**Option B – Git**

1. Connect the Vercel project to your Git repo (if not already) in the dashboard.
2. Set the production branch (e.g. `main`).
3. Push to that branch; Vercel will build and deploy using the env vars you added.

**After changing env vars:** Redeploy so the new values are used: either run `vercel --prod --force` or use the dashboard: Deployments → ⋮ on the latest deployment → Redeploy.

---

## 6. Summary and post-deploy check

- **Env vars:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_COOKIE_SECRET` are documented in Section 1 and added via Section 2.
- **Admin route:** Uses `process.env` only through `supabase.ts` and `admin-auth.ts`; no localhost (Section 3).
- **Supabase client:** Env read at call time; clear errors for missing vars (Section 4).
- **Deploy steps:** Link (5.1), add env (5.2), deploy with `vercel --prod` or Git (5.3).

**Admin panel URL after deploy:** `https://<your-vercel-domain>/admin` (or your custom domain). Use the same password as in Supabase `beckford.admin_secrets`. The login cookie is `secure: true` in production.

---

## Note: `127.0.0.1:7247` in codebase

Some files (`get-site-content.ts`, `layout.tsx`, `page.tsx`) contain `fetch('http://127.0.0.1:7247/ingest/...')` for local debug/ingest. These calls are wrapped in `.catch(() => {})` and do not affect Supabase or production; they will simply no-op on Vercel. You can leave them or remove them for production.
