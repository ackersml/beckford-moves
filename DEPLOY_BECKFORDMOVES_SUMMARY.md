# beckfordmoves.com deploy summary (Mar 2026)

## 1. Environment variables (.env.local)

Identified Supabase-related variables:

- `NEXT_PUBLIC_SUPABASE_URL` – Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` – anon key (public)
- `SUPABASE_SERVICE_ROLE_KEY` – server-only (sensitive)
- `ADMIN_COOKIE_SECRET` – server-only (sensitive)

## 2. Vercel env

All four variables are already set in Vercel **Production** for project `beckford-moves`. No CLI changes were made. To add or rotate them:

```bash
cd sean-site
npx vercel env add NEXT_PUBLIC_SUPABASE_URL production
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
npx vercel env add SUPABASE_SERVICE_ROLE_KEY production   # mark sensitive when prompted
npx vercel env add ADMIN_COOKIE_SECRET production          # mark sensitive when prompted
```

## 3. Production deployment

A production deployment was triggered and completed successfully.

- **Vercel project:** beckford-moves  
- **Production URL:** https://beckford-moves.vercel.app  
- **Custom domain:** Add `beckfordmoves.com` in Vercel Dashboard → Project → Settings → Domains if not already set. Then use https://beckfordmoves.com.

## 4. Supabase Authentication (manual)

Set in [Supabase Dashboard](https://supabase.com/dashboard) → your project → **Authentication** → **URL Configuration**:

- **Site URL:** `https://beckfordmoves.com`
- **Redirect URLs:** add `https://beckfordmoves.com/**`

(If you use Supabase Management API with a PAT, you can PATCH `site_url` and `uri_allow_list` via `PATCH /v1/projects/{ref}/config/auth`.)

## 5. beckford.admin_secrets (admin password)

The `beckford` schema is not in the project’s **exposed API schemas** (only `public` and `graphql_public` are). So:

1. **Option A – Expose `beckford`:**  
   Supabase Dashboard → Project Settings → API → Expose the `beckford` schema so the app (and `scripts/ensure-admin-secret.js`) can access `admin_secrets` via the API.

2. **Option B – Use SQL Editor:**  
   In Dashboard → SQL Editor, run one of the following.

   If the table has no row (or you want to insert a default):

   ```sql
   INSERT INTO beckford.admin_secrets (password_hash)
   VALUES ('$2b$10$eCP3AW7/4MArykRJWeDoJeH3BWEGCwMg5AATwI2ZtHE9V0NsIUoJi');
   ```

   Default password for that hash: **Milo1234**. To set a new password, generate a bcrypt hash (e.g. with `scripts/ensure-admin-secret.js` or `node -e "require('bcryptjs').hashSync('YourPassword', 10)"`) and use it in the `INSERT` or in:

   ```sql
   UPDATE beckford.admin_secrets SET password_hash = '<bcrypt_hash>';
   ```

## 6. Admin route and localhost

- `/admin` and `/api/admin/*` use `process.env` only (no hardcoded localhost).
- Debug/agent logging in `get-site-content.ts` that used `http://127.0.0.1:7247/...` is now wrapped in `process.env.NODE_ENV !== "production"`, so no localhost requests in production.

## 7. Live URLs

| What        | URL |
|------------|-----|
| Frontend   | https://beckford-moves.vercel.app (or https://beckfordmoves.com once domain is added and DNS set) |
| Admin      | https://beckford-moves.vercel.app/admin (or https://beckfordmoves.com/admin) |

Sign in at `/admin` with the password stored in `beckford.admin_secrets` (e.g. Milo1234 if you used the SQL above).
