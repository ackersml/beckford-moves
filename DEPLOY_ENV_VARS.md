# Environment variables for deployment (Netlify / Vercel)

Use these in **Project configuration → Environment variables**. Set **Scope** to **All** (or at least **Build** for vars used at build time).

---

## Minimum to get the build passing

The app can build with **no** variables set. If your build still fails, set **NODE_VERSION** so Netlify uses Node 20:

| Variable | Value | Where to get it |
|----------|--------|------------------|
| `NODE_VERSION` | `20` | (literal) Netlify → Environment variables → Add. Ensures Node 20 for Next 16. |

---

## Recommended (site works fully)

### Supabase (required if any code path uses Supabase client)

| Variable | Where to get it |
|----------|------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | [Supabase](https://supabase.com/dashboard) → your project → **Settings** → **API** → **Project URL** |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same page → **Project API keys** → **anon** (public) key |

### Contact form (Resend)

| Variable | Where to get it |
|----------|------------------|
| `RESEND_API_KEY` | [Resend](https://resend.com/api-keys) → Create API Key. Use the key value. |
| `CONTACT_TO_EMAIL` | Email where form submissions go (e.g. `sean@beckfordmoves.com`) |
| `CONTACT_FROM_EMAIL` | Sender address (must be a [verified domain](https://resend.com/domains) in Resend), e.g. `no-reply@beckfordmoves.com`. Optional; defaults to `no-reply@seanbeckford.site` if unset. |

---

## Optional

| Variable | Where to get it |
|----------|------------------|
| `NEXT_PUBLIC_GA_ID` | [Google Analytics 4](https://analytics.google.com/) → Admin → Data Streams → your web stream → **Measurement ID** (e.g. `G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_CALENDLY_URL` | Full Calendly scheduling URL, e.g. `https://calendly.com/beckford/30min` |
| `NOTION_TOKEN` | [Notion integrations](https://www.notion.so/my-integrations) → New integration → copy **Internal Integration Secret**. Share relevant pages with the integration. |

---

## Summary table (copy into Netlify)

| Key | Required | Notes |
|-----|----------|--------|
| `NODE_VERSION` | For build | Set to `20` |
| `NEXT_PUBLIC_SUPABASE_URL` | If using Supabase | Supabase → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | If using Supabase | Supabase → Settings → API → anon key |
| `RESEND_API_KEY` | For contact form email | Resend → API Keys |
| `CONTACT_TO_EMAIL` | For contact form | Destination email |
| `CONTACT_FROM_EMAIL` | Optional | Verified sender in Resend |
| `NEXT_PUBLIC_GA_ID` | Optional | GA4 Measurement ID |
| `NEXT_PUBLIC_CALENDLY_URL` | Optional | Calendly embed URL |
| `NOTION_TOKEN` | Optional | Only for Notion-backed pages |

After adding variables, trigger a **new deploy** (Deploys → Trigger deploy → Deploy site).
