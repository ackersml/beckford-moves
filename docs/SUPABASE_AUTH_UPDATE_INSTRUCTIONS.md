# Supabase Auth: Site URL and Redirect URLs for beckfordmoves.com

Update your Supabase project so Auth uses **https://beckfordmoves.com** as the Site URL and allows redirects to **https://beckfordmoves.com/**.

---

## Option A: Dashboard (recommended)

1. Open: **https://supabase.com/dashboard/project/piweqfwrfjhwtoupkzlv/auth/url-configuration**
2. **Site URL:** set to `https://beckfordmoves.com` (replace any `http://localhost:3000` or other value).
3. **Redirect URLs:** add this line (or ensure it is in the list):
   - `https://beckfordmoves.com/**`
   Wildcard `**` allows all paths under the origin.
4. Click **Save**.

---

## Option B: Management API script (optional)

If you have a Supabase **Personal Access Token** (PAT) from https://supabase.com/dashboard/account/tokens:

1. Create a token with scope that allows **auth** config (e.g. project access or auth write).
2. Run (replace `YOUR_PAT` and run from repo root):

```bash
# Set once
export SUPABASE_ACCESS_TOKEN="YOUR_PAT"
export SUPABASE_PROJECT_REF="piweqfwrfjhwtoupkzlv"

# Update Site URL
curl -s -X PATCH "https://api.supabase.com/v1/projects/${SUPABASE_PROJECT_REF}/config/auth" \
  -H "Authorization: Bearer ${SUPABASE_ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"site_url":"https://beckfordmoves.com","uri_allow_list":"https://beckfordmoves.com/**"}'
```

If your project already has other redirect URLs, `uri_allow_list` may need to be a comma-separated list of all allowed URLs (check current value in the dashboard first).

---

## Verify

- In **Authentication → URL Configuration**, confirm:
  - **Site URL** = `https://beckfordmoves.com`
  - **Redirect URLs** includes `https://beckfordmoves.com/**`
