# Do these 3 steps for beckfordmoves.com

## Step 1: Vercel – add beckfordmoves.com and DNS

**Problem:** `beckfordmoves.com` is already on another Vercel project, so it must be moved.

1. Open the **other** project that currently has the domain:  
   [Vercel Dashboard](https://vercel.com/dashboard) → find the project that lists **beckfordmoves.com** under **Settings → Domains**.
2. In that project: **Settings → Domains** → remove **beckfordmoves.com**.
3. In the **beckford-moves** project: **Settings → Domains** → **Add** → enter `beckfordmoves.com` → Add.
4. DNS: Vercel will show the records. Either:
   - Use **Vercel nameservers** at your registrar: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`, or  
   - Add the **A** and/or **CNAME** records Vercel shows for `beckfordmoves.com` at your current DNS provider.

After DNS propagates, the site will be live at **https://beckfordmoves.com**.

---

## Step 2: Supabase – Auth Site URL and Redirect URLs

1. Open:  
   **https://supabase.com/dashboard/project/piweqfwrfjhwtoupkzlv/auth/url-configuration**
2. Set **Site URL** to: `https://beckfordmoves.com`
3. Under **Redirect URLs**, add: `https://beckfordmoves.com/**`
4. Save.

---

## Step 3: Supabase – expose `beckford` and ensure admin password

### 3a. Run the SQL (grants + admin password)

1. Open:  
   **https://supabase.com/dashboard/project/piweqfwrfjhwtoupkzlv/sql/new**
2. Open the file **`sean-site/supabase/beckford-expose-and-admin.sql`** in this repo.
3. Copy its full contents into the SQL Editor and click **Run**.
4. Admin password after this: **Milo1234** (used at `/admin`).

### 3b. Expose the `beckford` schema in the Data API

1. Open:  
   **https://supabase.com/dashboard/project/piweqfwrfjhwtoupkzlv/settings/api**
2. In **Data API** (or **API**) settings, find **“Exposed schemas”** (or **“Schema”**).
3. Add **beckford** to the exposed schemas list (in addition to `public` if present).
4. Save.

Then the app and `/admin` login will work with `beckford.admin_secrets`.

---

## Quick links

| Step | Link |
|------|------|
| Vercel domains | https://vercel.com/dashboard → select **beckford-moves** → Settings → Domains |
| Supabase Auth URL config | https://supabase.com/dashboard/project/piweqfwrfjhwtoupkzlv/auth/url-configuration |
| Supabase SQL Editor | https://supabase.com/dashboard/project/piweqfwrfjhwtoupkzlv/sql/new |
| Supabase API (expose schema) | https://supabase.com/dashboard/project/piweqfwrfjhwtoupkzlv/settings/api |

## After you finish

- Site: **https://beckfordmoves.com** (once DNS is set)
- Admin: **https://beckfordmoves.com/admin** — sign in with **Milo1234** (or the password you set in SQL)
