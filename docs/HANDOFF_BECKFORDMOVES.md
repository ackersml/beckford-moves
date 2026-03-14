# Handoff: beckfordmoves.com Production & Admin Panel

**Project:** beckford-moves (app: sean-site)  
**Custom domain:** https://beckfordmoves.com  
**Vercel:** https://vercel.com/michelle-ackers/sean-site  

---

## Domain migration to sean-site (2026-03-09)

**Completed:** beckfordmoves.com was removed from project **beckford-moves** (Vercel Dashboard → beckford-moves → Settings → Domains → Remove) and added to **sean-site** via `npx vercel domains add beckfordmoves.com`. Production deploy aliased the domain: `Aliased: https://beckfordmoves.com`. SSL is provisioned asynchronously by Vercel.

**DNS (if status is Invalid Configuration):** At your registrar, set an **A record** for the root domain:
- **Name/Host:** `@` (or blank for root)
- **Value:** `216.198.79.1`

Screenshot of sean-site Domains after migration: `docs/screenshots/vercel-sean-site-domains-beckfordmoves.png`.

**Admin panel:** https://beckfordmoves.com/admin — password **Milo1234** (advise client to change immediately).

**Verification:** Once DNS has propagated and SSL is active, run: `node scripts/check-live-admin.js https://beckfordmoves.com` (400 or 401 = SUCCESS).

---

## Production run 2026-03-09 – status

| Step | Status | Notes |
|------|--------|------|
| 1. Extract .env.local | Done | Values used in memory only; Vercel CLI authenticated |
| 2. Bcrypt hash Milo1234 | Done | Hash generated (in memory only; use SQL below to apply if needed) |
| 3. Supabase admin password | Done | SQL Editor used; table has UUID id (use UPDATE without WHERE). Password: Milo1234. Screenshot: `docs/screenshots/supabase-sql-admin-password-milo1234.png` |
| 4. Vercel env | Done | All four keys in Production; pull + diff + rm .env.production |
| 5. Custom domain | Done | beckfordmoves.com moved from beckford-moves to sean-site; alias confirmed in deploy |
| 6. Cookie security | Done | `secure`, `sameSite: 'lax'`, `httpOnly: true` in login + logout; build OK |
| 7. Production deploy | Done | `npx vercel --prod --force --yes`; Production: sean-site-o3urp9ro5-michelle-ackers.vercel.app; Aliased: sean-site-six.vercel.app |
| 8. Verification | Pending DNS/SSL | sean-site-six.vercel.app OK (400). beckfordmoves.com: run after DNS propagates; A record @ → 216.198.79.1 |
| 9. Handoff doc | Done | This file; screenshots in `docs/screenshots/` |
| 10. Security | Done | No secrets in repo; `.env.production` removed |

### Manual actions required (copy-paste)

**A. Supabase Auth (Site URL + Redirect URLs)**  
Open: https://supabase.com/dashboard/project/piweqfwrfjhwtoupkzlv/auth/url-configuration  
Set **Site URL** = `https://beckfordmoves.com`, **Redirect URLs** = `https://beckfordmoves.com/**`, then Save.  
Or with a Personal Access Token:
```bash
export SUPABASE_ACCESS_TOKEN="your_pat"
curl -s -X PATCH "https://api.supabase.com/v1/projects/piweqfwrfjhwtoupkzlv/config/auth" \
  -H "Authorization: Bearer ${SUPABASE_ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"site_url":"https://beckfordmoves.com","uri_allow_list":"https://beckfordmoves.com/**"}'
```

**B. Admin password in Supabase**  
**Admin password in use:** `Milo1234` (advise client to change immediately after first login; do not commit the password).

Table `beckford.admin_secrets` has a **UUID** primary key (do not use `WHERE id = 1`). In Supabase SQL Editor (project piweqfwrfjhwtoupkzlv), run:

To update the single admin row (no WHERE; updates all rows):
```sql
UPDATE beckford.admin_secrets SET password_hash = '<bcrypt-hash-for-Milo1234>';
```

To insert if the table is empty:
```sql
INSERT INTO beckford.admin_secrets (password_hash) VALUES ('<bcrypt-hash>');
```

Generate the bcrypt hash locally: `node -e "const bcrypt=require('bcryptjs'); bcrypt.hash('Milo1234',10).then(h=>console.log(h));"` then paste the printed hash into the SQL.  
Screenshot of SQL Editor run: `docs/screenshots/supabase-sql-admin-password-milo1234.png`.

**C. beckfordmoves.com on Vercel**  
**Done (2026-03-09):** beckfordmoves.com has been **moved to the sean-site project**. It was removed from project **beckford-moves** (Dashboard → beckford-moves → Settings → Domains) and added to **sean-site** via CLI. Production deploy aliases the domain. If Vercel shows "Invalid Configuration," set at your registrar: **A record** Name `@`, Value `216.198.79.1`. Screenshot: `docs/screenshots/vercel-sean-site-domains-beckfordmoves.png`. After DNS/SSL is Valid, run: `node scripts/check-live-admin.js https://beckfordmoves.com`

---

## 1. Supabase Authentication (Site URL + Redirect URLs)

**Completed (2026-03-08):** Site URL and Redirect URLs configured via dashboard.  
Screenshots: `docs/screenshots/supabase-url-config-site-only.png`, `docs/screenshots/supabase-url-config-final.png` (Site URL + Total URLs: 1).

### Option A: Dashboard (for future changes)

1. Open: **https://supabase.com/dashboard/project/piweqfwrfjhwtoupkzlv/auth/url-configuration**
2. **Site URL:** set to `https://beckfordmoves.com`
3. **Redirect URLs:** add `https://beckfordmoves.com/**`
4. Click **Save**

### Option B: Script (requires Supabase Personal Access Token)

From project root:

```bash
cd sean-site
SUPABASE_ACCESS_TOKEN=your_pat node scripts/update-supabase-auth-urls.js
```

Get a PAT at: https://supabase.com/dashboard/account/tokens

### Option C: curl (same as script)

```bash
export SUPABASE_ACCESS_TOKEN="your_pat"
curl -s -X PATCH "https://api.supabase.com/v1/projects/piweqfwrfjhwtoupkzlv/config/auth" \
  -H "Authorization: Bearer ${SUPABASE_ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"site_url":"https://beckfordmoves.com","uri_allow_list":"https://beckfordmoves.com/**"}'
```

**Verify:** In Supabase → Authentication → URL Configuration, confirm Site URL and Redirect URLs.

---

## 2. Vercel Production Environment Variables – Audit

**Checked (2026-03-09):** All four required keys exist in **Production** for michelle-ackers/sean-site.

| Variable | In Vercel Production |
|----------|------------------------|
| NEXT_PUBLIC_SUPABASE_URL | Yes (Encrypted) |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Yes (Encrypted) |
| SUPABASE_SERVICE_ROLE_KEY | Yes (Encrypted) |
| ADMIN_COOKIE_SECRET | Yes (Encrypted) |

**Verification commands (run from `sean-site`):**
```bash
npx vercel env ls production
npx vercel env pull .env.production --environment=production
diff -u .env.local .env.production   # NEXT_PUBLIC_* values match; sensitive vars redacted in pull
rm .env.production
```

`.env.production` was pulled for review and then removed (no secrets committed).

---

## 3. Admin Cookie Settings (Production)

**Where the cookie is set:** `src/app/api/admin/login/route.ts` (and cleared in `src/app/api/admin/logout/route.ts`).  
`src/lib/admin-auth.ts` only provides the token/signing; it does not set cookie options.

**Confirmed:**

- **Login** (`/api/admin/login`): `secure: process.env.NODE_ENV === "production"`, `sameSite: "lax"`, `httpOnly: true`, `path: "/"`
- **Logout** (`/api/admin/logout`): Same `secure` and `sameSite: "lax"` when clearing the cookie

So in production (beckfordmoves.com) the admin cookie is **secure** and **sameSite: "lax"**.

---

## 4. Forced Production Deployment

**Command run:**

```bash
cd sean-site
npx vercel --prod --force --yes
```

**Result (2026-03-09):** Deployment completed. Production URLs:

- **https://sean-site-six.vercel.app** (production alias for michelle-ackers/sean-site)
- **https://sean-site-o3urp9ro5-michelle-ackers.vercel.app** (deployment-specific)
- **https://beckfordmoves.com** – currently assigned to another Vercel project; to use with sean-site, remove from other project then add to sean-site in Domains.

Confirm custom domain: Vercel → sean-site → Settings → Domains.

---

## 5. Verification Script (check-live-admin.js)

**Purpose:** POST to the admin login API; 400 or 401 = backend is up and responding.

**Location:** `sean-site/scripts/check-live-admin.js`

**Usage:**

```bash
cd sean-site
node scripts/check-live-admin.js
# or with explicit URL:
node scripts/check-live-admin.js https://beckfordmoves.com
node scripts/check-live-admin.js https://beckford-moves.vercel.app
```

**Behavior:** POSTs to `{baseUrl}/api/admin/login` with empty body. Treats **400** (password required) or **401** (invalid password) as success (exit 0). **500** is treated as “backend up but admin not configured” (exit 0). Any other status or network error = exit 1.

**Last run (2026-03-09):**  
- `https://sean-site-six.vercel.app`: **OK** (400).  
- `https://beckfordmoves.com`: Domain moved to sean-site; deploy aliased it. If fetch still fails, wait for DNS/SSL propagation and ensure A record @ → 216.198.79.1. Re-run: `node scripts/check-live-admin.js https://beckfordmoves.com`

---

## 6. Final Checklist

| Item | Status |
|------|--------|
| **Production deploy** | Live on **sean-site-six.vercel.app** and **beckfordmoves.com** (domain moved to sean-site) |
| **Custom domain** | beckfordmoves.com on sean-site; A record @ → 216.198.79.1 if Invalid Configuration |
| **Admin UI** | https://beckfordmoves.com/admin |
| **Admin login API** | https://beckfordmoves.com/api/admin/login |
| **Admin logout** | https://beckfordmoves.com/api/admin/logout (POST or GET) |
| **Cookie security** | `secure: true` and `sameSite: "lax"` in production |
| **Vercel env** | All four keys present in Production |
| **Supabase Auth** | Manual: set Site URL and Redirect URLs per §1 |
| **Verification script** | `node scripts/check-live-admin.js` (and optional URL arg) |
| **Screenshots** | `docs/screenshots/supabase-url-config-site-only.png`, `supabase-url-config-final.png`, `supabase-sql-admin-password-milo1234.png`, `vercel-sean-site-domains-beckfordmoves.png` |

**Admin password (no secrets in repo):** Run `supabase/beckford-expose-and-admin.sql` in Supabase SQL Editor. The script uses an INSERT/UPDATE with a bcrypt hash; the default password is noted in the script comments only. Store the client’s password in a password manager or secure handoff; do not commit it.

**If domain shows "Invalid Configuration" in Vercel:** Capture the Domains panel screenshot; provide the registrar with the DNS records Vercel shows (typically A record to Vercel’s IP or CNAME as instructed). If SSL is still provisioning, re-run `node scripts/check-live-admin.js https://beckfordmoves.com` after the domain becomes Valid.

**DNS/SSL troubleshooting:** If the script fails with "fetch failed" on beckfordmoves.com: (1) In Vercel Domains, confirm beckfordmoves.com is added and status is Valid. (2) At your registrar, ensure A or CNAME matches Vercel's instructions. (3) Wait for SSL provisioning. (4) Re-run the script. To confirm backend is up, run `node scripts/check-live-admin.js https://sean-site-six.vercel.app`.

---

## 7. /admin Panel – Ready for Client

**Yes**, once:

1. **Supabase Auth** – Site URL = `https://beckfordmoves.com`, Redirect URLs include `https://beckfordmoves.com/**` (see §1; done 2026-03-08).
2. **Supabase Data API** – Schema **beckford** must be exposed in Project Settings → API → Exposed schemas. Then ensure one admin row: run **`supabase/beckford-expose-and-admin.sql`** in Supabase SQL Editor (project piweqfwrfjhwtoupkzlv). That script inserts/updates `beckford.admin_secrets` with a bcrypt hash; the default password is documented only in that file’s comments (do not commit plaintext elsewhere). Alternatively, after exposing the schema, run `node scripts/ensure-admin-secret.js` (it will output a one-time generated password to store securely).

**Client handoff:**

- **Admin URL:** https://beckfordmoves.com/admin (or https://sean-site-six.vercel.app/admin)
- **Login:** Admin password is set to **Milo1234**. Advise client to change immediately after first login. Password hash is in Supabase `beckford.admin_secrets`. If you used `beckford-expose-and-admin.sql`, the default is in that script’s comments; store it in a password manager or secure channel for the client. Do not put the raw password in this repo.
- **Cookie:** HttpOnly, Secure, SameSite=Lax in production.

---

## Quick reference – files and commands

| What | Where / Command |
|------|------------------|
| Supabase Auth instructions | `docs/SUPABASE_AUTH_UPDATE_INSTRUCTIONS.md` |
| Supabase Auth script | `scripts/update-supabase-auth-urls.js` |
| Verification script | `node scripts/check-live-admin.js [baseUrl]` |
| Redeploy production | `npx vercel --prod --force --yes` |
| Pull env to compare | `npx vercel env pull .env.production --environment=production` |
