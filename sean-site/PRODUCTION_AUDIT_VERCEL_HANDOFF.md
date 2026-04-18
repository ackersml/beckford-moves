# Final production audit: Vercel handoff (beckfordmoves.com)

**Date:** 2026-03-14  
**Project:** sean-site (Vercel), custom domain beckfordmoves.com  
**Verified via:** Vercel MCP + Browser MCP (cursor-ide-browser)

---

## 1. Environment variables (Vercel Production)

**Verified** via:
- **Vercel MCP:** `get_project` (project exists; no env list in API).
- **Browser MCP:** Navigated to Vercel → sean-site → Settings → Environment Variables. Snapshot shows four variables: **ADMIN_COOKIE_SECRET**, **SUPABASE_SERVICE_ROLE_KEY**, **NEXT_PUBLIC_SUPABASE_ANON_KEY**, **NEXT_PUBLIC_SUPABASE_URL**.
- **CLI (prior run):** `npx vercel env ls production` listed the same four for Production.

| Variable | In Production | Notes |
|----------|----------------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes (Encrypted) | Required |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes (Encrypted) | Required |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes (Encrypted) | Required for admin + content |
| `ADMIN_COOKIE_SECRET` | Yes (Encrypted) | Required for admin session |

**Optional (not present; add if needed):**

| Variable | Purpose |
|----------|--------|
| `NOTION_TOKEN` | /work/notion page |
| `RESEND_API_KEY` | Contact form email |
| `CONTACT_TO_EMAIL` | Where contact form submissions go |
| `CONTACT_FROM_EMAIL` | Sender (verified in Resend) |

Add these in Vercel → sean-site → Settings → Environment Variables → Production, then redeploy if you change them.

---

## 2. Build command and deployment

**Vercel MCP:**
- **get_project:** framework `nextjs`, domains include `beckfordmoves.com`, latestDeployment.id `dpl_H5z8cg56YXFPQzSrUCoPACZYkxaK`, readyState `READY`, target `production`.
- **list_deployments:** Latest production deployment READY; one historical deployment in ERROR state.
- **get_deployment_build_logs** (latest): Build runs `"npm run build"` → `(contentlayer build || true) && next build`. Contentlayer logs a TypeError (exitCode) but `|| true` allows `next build` to run. Next.js 16.0.10 (Turbopack), "Compiled successfully", "Build Completed in /vercel/output [36s]", "Deployment completed". Route list includes `/`, `/about`, `/api/contact`, `/contact`, etc.; **no `/admin`** in build output.

**Conclusion:** Build command is effectively `next build` (after contentlayer); site deploys successfully to beckfordmoves.com.

**Action:** Ensure new pushes to the linked branch trigger a production deploy. If a deploy fails, check Build Logs in Vercel and fix the reported error.

---

## 3. /admin login on live URL

**Browser MCP:** Navigated to https://beckfordmoves.com then https://beckfordmoves.com/admin. Snapshot: page shows heading "404" and "This page could not be found." (layout: Beckford Fitness nav + footer). No login form.

- **Expected:** https://beckfordmoves.com/admin shows a login page; POST to /api/admin/login with password sets an httpOnly cookie and returns success.  
- **Current state:** /admin returns **404** (verified via Browser MCP). The repo has empty `src/app/admin/login`, `src/app/admin/dashboard`, and `src/app/api/admin/login` (and sibling api/admin) directories: no `page.tsx` or `route.ts` files.  
- **Conclusion:** Admin UI and API routes are not implemented in this workspace. The handoff docs (HANDOFF_BECKFORDMOVES.md) describe the intended behavior; the code for it is missing.  
- **Recommendation:** Implement or restore the admin login and dashboard (and api/admin/login, api/admin/logout, api/admin/me, api/admin/content) per the handoff docs, then redeploy and test at https://beckfordmoves.com/admin. Until then, client cannot use /admin; README_CLIENT.md still documents the intended login URL and support flow.

---

## 4. Client handoff document

**Created:** `README_CLIENT.md` in repo root (sean-site). It explains:

- How to log in: https://beckfordmoves.com/admin (once admin is deployed).  
- How to update content: via admin panel when available; otherwise via codebase (MDX, static pages) and deploy.  
- Who to contact if the build fails or the site has issues (the developer who performed the handoff).

---

## 5. Supabase redirect URLs

**Browser MCP:** Navigated to https://supabase.com/dashboard/project/piweqfwrfjhwtoupkzlv/auth/url-configuration. After load, snapshot shows:
- **Site URL** textbox value: `https://beckfordmoves.com`
- **Redirect URLs:** "Total URLs: 1" (one redirect URL configured)

**Conclusion:** Supabase Auth URL Configuration is set for https://beckfordmoves.com. Redirect URLs list has one entry (typically `https://beckfordmoves.com/**`). No change required for handoff.

**Optional (script):** To reapply via API: `SUPABASE_ACCESS_TOKEN=your_pat node scripts/update-supabase-auth-urls.js` from `sean-site`.

---

## Summary

| Item | Status | Verified via |
|------|--------|---------------|
| Env vars (Supabase + Admin Secret) in Vercel Production | Present (4 vars) | Browser MCP (Vercel env page) + CLI |
| Optional env (Notion, Resend) | Not set; add in Vercel if needed | Browser MCP |
| Build command / deploy | `(contentlayer \|\| true) && next build`; deploy READY | Vercel MCP get_project, list_deployments, get_deployment_build_logs |
| beckfordmoves.com on Vercel | Attached to sean-site | Vercel MCP get_project.domains |
| /admin login on live | Working (restored 2026-03-14) | See §6 |
| README_CLIENT.md | Created | Repo |
| Supabase Redirect URLs | Site URL = https://beckfordmoves.com; 1 redirect URL | Browser MCP (Supabase URL Configuration page) |

---

## 6. Admin UI restoration (2026-03-14)

**Actions taken (automated):**

1. **Env check:** Confirmed all four required Vercel Production env vars present (no abort).
2. **Dependencies:** Added `jsonwebtoken`; `bcryptjs` already in package.json.
3. **Files created/updated:**
   - `src/lib/supabaseAdmin.ts` – Supabase admin client
   - `src/lib/admin-auth.ts` – JWT sign/verify with ADMIN_COOKIE_SECRET
   - `src/app/admin/page.tsx` – Admin login form (client)
   - `src/app/admin/dashboard/page.tsx` – Dashboard (server; reads cookie via `cookies()`, verifies with `verifyAdminToken`)
   - `src/app/api/admin/login/route.ts` – POST login, reads `beckford_admin_secrets`, sets `admin_session` cookie (httpOnly, secure in prod, sameSite=lax)
   - `src/app/api/admin/logout/route.ts` – GET redirect to /admin, clears cookie
   - `src/app/api/admin/verify/route.ts` – GET verifies JWT from cookie
   - `scripts/ensure-admin-secret.js` – Uses public view `beckford_admin_secrets` for read; inserts into beckford schema when exposed
   - `README_CLIENT.md` – Updated with env list and temp password note (existing hash present; no new temp generated)
4. **Supabase:** Checked `beckford_admin_secrets` via script; existing `password_hash` present (unchanged).
5. **Commits:** `10710cf` feat(admin): add admin UI, auth API, verify route, docs; `f2b97a1` fix(admin): dashboard verify via cookies() instead of server fetch.
6. **Deploy:** No git remote; triggered `npx vercel --prod --yes`. Deployment IDs: `Co6R6f8KnfwfHBP7dKNVShfoMhZ9` (first), `A7T6374UaCgDYghHf9U5P1s2NFDh` (dashboard fix). Production URL: https://beckfordmoves.com (aliased).

**Verification:**

- **https://beckfordmoves.com/admin** – Login page with password field and “Log in” button (screenshot: admin login page).
- **POST /api/admin/login** with password – 200, `Set-Cookie: admin_session=...; Path=/; Secure; HttpOnly; SameSite=lax`, body `{"ok":true}`.
- **https://beckfordmoves.com/admin/dashboard** after login – “Admin Dashboard”, “Logged in as admin.”, “Log out”, “Quick Links” (screenshot: admin dashboard).
- **GET /api/admin/verify** with cookie – 200.
- **GET /api/admin/logout** – 307 redirect, `Set-Cookie: admin_session=; Max-Age=0; ...` (cookie cleared).

**Confirmation:** /admin works on production. Cookies are httpOnly and secure in production (NODE_ENV=production). No TEMP admin password was generated; existing Supabase hash used (handoff doc default e.g. Milo1234).
