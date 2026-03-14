# Admin setup status (beckford-moves / Milo1234)

## Completed

### 1. Exposed `beckford` schema in Supabase
- **Where:** Integrations → Data API → Settings  
  https://supabase.com/dashboard/project/piweqfwrfjhwtoupkzlv/integrations/data_api/settings
- **What:** Added **beckford** to "Exposed schemas" and saved. Green "Successfully saved settings" was shown. Screenshot: `supabase-api-settings-beckford-exposed.png` (in Cursor screenshots folder).

### 2. Bcrypt hash for password "Milo1234"
- **Hash:** `$2b$10$Qyj7q0gzz0YNL.4WAUvAVeHp/QDWxYMrnvoMB8FEW9QUcqrtnBI3K`
- Generated with: `node -e "const bcrypt=require('bcryptjs'); bcrypt.hash('Milo1234',10).then(h=>console.log(h));"`

### 3. Apply hash to database (manual step required)
- **Issue:** PostgREST still returns `The schema must be one of the following: public, graphql_public` for `beckford` after saving in the UI. So either:
  - Schema config has not reloaded (run `NOTIFY pgrst, 'reload schema';` in SQL Editor), or
  - `pgrst.db_schemas` for the authenticator role must be set via SQL.
- **What you need to do:** In Supabase **SQL Editor** (project piweqfwrfjhwtoupkzlv), run the contents of **`scripts/set-admin-password-milo1234.sql`** (sets password to Milo1234 and includes `NOTIFY pgrst, 'reload schema';`). Then run `node scripts/set-admin-password.js Milo1234` again if the API still did not see `beckford` before the NOTIFY.
- **If you get a permission error** when running that SQL, the task cannot be completed without a role that can write to `beckford.admin_secrets` and notify pgrst.

### 4. Local access
- **App (with backend):** `npm run dev:local` → http://localhost:3000
- **Admin login:** http://localhost:3000/admin → password **Milo1234** (after step 3 is done).
- **Current state:** Login still shows "Admin not configured" until the DB has the new hash and the API can read `beckford.admin_secrets`.

### 5. Production deploy
- **Command run:** `npx vercel --prod --force --yes`
- **Result:** Deployment completed. Production URL: https://beckfordmoves.com (aliased). Project: sean-site (michelle-ackers).
- **Env vars:** In Vercel → Project **sean-site** (or the one aliased to beckfordmoves.com) → Settings → Environment Variables, ensure for **Production**:
  - `NEXT_PUBLIC_SUPABASE_URL` = `https://piweqfwrfjhwtoupkzlv.supabase.co`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (anon key for project piweqfwrfjhwtoupkzlv)
  - `SUPABASE_SERVICE_ROLE_KEY` = (service role key for same project)
  - `ADMIN_COOKIE_SECRET` = (same as in .env.local, e.g. beckford-admin-session-secret-32ch)

## Final status

| Item | Status |
|------|--------|
| beckford schema exposed in dashboard | Done (saved) |
| Bcrypt hash for Milo1234 | Generated and captured |
| Hash applied in DB | **Pending** – run `scripts/set-admin-password-milo1234.sql` in SQL Editor |
| "Admin not configured" resolved | **Pending** – depends on step above and API seeing beckford |
| Local admin login at :3000 | Will work after DB + API are fixed |
| Production deploy | Done – https://beckfordmoves.com |
| Admin panel URL (production) | https://beckfordmoves.com/admin (ready once env vars and DB are set) |

**Conclusion:** The beckford schema was exposed in the UI and the hash was generated. Applying the hash and fixing the API schema visibility must be done in the Supabase SQL Editor as above. After that, admin password **Milo1234** will work at http://localhost:3000/admin and https://beckfordmoves.com/admin (with correct Vercel env vars).
