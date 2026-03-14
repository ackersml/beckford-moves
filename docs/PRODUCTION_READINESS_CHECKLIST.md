# Production Readiness Checklist – beckford-moves (beckfordmoves.com)

**Last run:** After final `vercel --prod --force` deployment.  
**Production URL:** https://beckfordmoves.com  
**Vercel project:** beckford-moves  

---

## 1. Supabase Auth (Site URL + Redirect URLs)

**Status:** Manual step required (or use optional script with PAT).

- **Instructions:** See **`docs/SUPABASE_AUTH_UPDATE_INSTRUCTIONS.md`**.
- **Actions:**
  1. Set **Site URL** to `https://beckfordmoves.com` in Supabase Dashboard → Auth → URL Configuration.
  2. Add **Redirect URL** `https://beckfordmoves.com/**`.
- **Optional script:** `SUPABASE_ACCESS_TOKEN=your_pat node scripts/update-supabase-auth-urls.js` (requires Personal Access Token from Supabase).

---

## 2. Environment variable audit (Vercel Production)

**Status:** Complete.

| Variable | In Vercel Production | Notes |
|----------|----------------------|--------|
| NEXT_PUBLIC_SUPABASE_URL | Yes | Encrypted |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Yes | Encrypted |
| SUPABASE_SERVICE_ROLE_KEY | Yes | Encrypted |
| ADMIN_COOKIE_SECRET | Yes | Encrypted |

All four keys are set for **Production**. To confirm values match `.env.local` without committing secrets: run `npx vercel env pull .env.production --environment=production` in a safe location and compare keys; delete `.env.production` after.

---

## 3. Cookie security

**Status:** Complete.

- **Login** (`src/app/api/admin/login/route.ts`): `secure: process.env.NODE_ENV === "production"`, `sameSite: "lax"`, `httpOnly: true`, `path: "/"`.
- **Logout** (`src/app/api/admin/logout/route.ts`): Updated to set `secure` and `sameSite: "lax"` when clearing the cookie so logout works correctly on https://beckfordmoves.com.

Cookies are secure and sameSite for production.

---

## 4. Final deployment

**Status:** Complete.

- Ran: `npx vercel --prod --force --yes`.
- Production deployment aliased to **https://beckfordmoves.com**.
- SSL for beckfordmoves.com is being provisioned asynchronously by Vercel (may take a few minutes if the domain was just configured).

---

## 5. Verification script

**Status:** Added.

- **Script:** `scripts/check-live-admin.js`
- **Usage:** `node scripts/check-live-admin.js [baseUrl]`
- **Default baseUrl:** `https://beckfordmoves.com`
- **What it does:** POSTs to `/api/admin/login`; expects 400 or 401 (backend up, auth required). Exit 0 = backend responding.

**Example:**

```bash
node scripts/check-live-admin.js
# or
node scripts/check-live-admin.js https://beckford-moves.vercel.app
```

- **Result at run time:** Backend on **beckford-moves.vercel.app** responded with 400. **beckfordmoves.com** may need a few minutes for DNS/SSL; re-run the script once the domain shows "Valid Configuration" in Vercel.

---

## 6. What is live

| Item | Status | URL / note |
|------|--------|------------|
| Production deployment | Live | https://beckford-moves.vercel.app |
| Custom domain | Live (SSL may be provisioning) | https://beckfordmoves.com |
| Homepage | Live | https://beckfordmoves.com/ |
| Admin login API | Live | https://beckfordmoves.com/api/admin/login |
| Admin UI | Live | https://beckfordmoves.com/admin |
| Admin logout | Live | https://beckfordmoves.com/api/admin/logout |
| Supabase Auth (Site URL / Redirect URLs) | Pending | Update in dashboard (see §1) |
| beckford schema exposed in Supabase | Pending if not done | Required for /admin login to read password hash |
| admin_secrets row (password hash) | Pending if not done | Run SQL in Supabase or ensure-admin-secret after exposing schema |

---

## 7. Is the /admin panel ready for the client?

**Conditional yes**, once the following are done:

1. **Supabase Auth:** Site URL and Redirect URLs set to https://beckfordmoves.com (and https://beckfordmoves.com/**) as in §1.
2. **Supabase Data API:** Schema **beckford** exposed in Project Settings → API → Exposed schemas (so the app can read `beckford.admin_secrets`).
3. **Admin password:** At least one row in `beckford.admin_secrets` with a bcrypt `password_hash` (e.g. run `sean-site/supabase/beckford-expose-and-admin.sql` in SQL Editor, or use `scripts/ensure-admin-secret.js` after exposing the schema).
4. **Custom domain:** If https://beckfordmoves.com still shows "Invalid Configuration" in Vercel, wait for DNS/SSL to finish, then re-run `node scripts/check-live-admin.js` to confirm the backend on the custom domain.

**Client handoff:**

- **Admin URL:** https://beckfordmoves.com/admin  
- **Login:** Use the password whose hash is stored in `beckford.admin_secrets` (e.g. the one set by the SQL script or ensure-admin-secret).
- **Cookie:** HttpOnly, Secure, SameSite=Lax; no localhost references in production.

---

*Checklist generated as part of final production readiness check.*
