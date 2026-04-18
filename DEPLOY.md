# Deploy Beckford Moves (Vercel + Keystatic)

This document matches **`ackersml/beckford-moves`**: the Next.js app and Keystatic content files should live at the **repository root** (same level as `package.json`). Vercel **Root Directory** should be **`.`** (empty) unless you intentionally use a monorepo subfolder.

## 1. Repository layout (required for Keystatic)

Keystatic reads YAML from **`process.cwd()`** during build. On Vercel that is the configured project root. These directories must sit **next to** `package.json` and `keystatic.config.ts`:

| Singleton key (config) | Folder |
|------------------------|--------|
| `homepage` | `homepage/index.yaml` |
| `howItWorks` | `howItWorks/index.yaml` |
| `about` | `about/index.yaml` |
| `packages` | `packages/index.yaml` |
| `successStories` | `successStories/index.yaml` |
| `fstMassageTherapy` | `fstMassageTherapy/index.yaml` |
| `blog` | `blog/index.yaml` |
| `contact` | `contact/index.yaml` |

Do not nest the whole app under another folder (for example `beckford-site-feb19-source/`) in the GitHub repo unless Vercel **Root Directory** is set to that folder and the same folders exist there.

## 2. Vercel project

1. Import **GitHub** → **`ackersml/beckford-moves`**, branch **`main`** (or your production branch).
2. **Root Directory**: leave default **`.`** if the Next app is at the repo root.
3. **Build Command**: `npm run build` (default).
4. **Output**: Next.js default (no static export).
5. **Install Command**: `npm install` (default).

After connecting Git, every push triggers a deployment. Keystatic saves commit to GitHub and should trigger a new deploy the same way.

## 3. Environment variables (Production)

Copy names from **`env.example`**. Set values in **Vercel → Project → Settings → Environment Variables** (at least **Production**; add **Preview** if you use preview URLs for Keystatic).

| Variable | Required | Purpose |
|----------|----------|---------|
| `KEYSTATIC_SECRET` | Yes (CMS) | Random secret for Keystatic session/crypto. Generate locally: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `KEYSTATIC_GITHUB_CLIENT_ID` | Yes (CMS) | GitHub OAuth App **Client ID** |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | Yes (CMS) | GitHub OAuth App **Client secret** |
| `KEYSTATIC_GITHUB_REPO` | Optional | Defaults to `ackersml/beckford-moves` in `keystatic.config.ts`. Set if the CMS should target another repo. |
| `KEYSTATIC_LOCAL` | Optional | Set to `true` only for local dev to use filesystem storage without GitHub login. **Do not** set on Vercel. |
| `NEXT_PUBLIC_*` / `SANITY_*` | If using Sanity | See `env.example`. |
| `STRIPE_*` | If using Stripe | See `env.example`. |

Redeploy after changing env vars (**Deployments → Redeploy** or an empty commit).

## 4. GitHub OAuth app (Keystatic login)

Create or edit a **GitHub OAuth App** (not necessarily Keystatic Cloud):

- **Application name**: e.g. Beckford Moves CMS  
- **Homepage URL**: `https://www.beckfordmoves.com`  
- **Authorization callback URL**: add **both** of these (GitHub allows multiple):

  1. `https://www.beckfordmoves.com/api/keystatic/github/oauth/callback`  
  2. `https://beckfordmoves.com/api/keystatic/github/oauth/callback`  

The site redirects apex → `www` for pages, but OAuth may hit either host depending on how the user opened the admin. Both callbacks avoid login failures.

**Local development**: add `http://localhost:3000/api/keystatic/github/oauth/callback` (or your dev port) to the same OAuth app while testing.

Register the app, copy **Client ID** and generate **Client secret** into Vercel as above.

## 5. Repo access for editors

Anyone using `/keystatic` must be able to **push** to **`ackersml/beckford-moves`** (or the repo in `KEYSTATIC_GITHUB_REPO`). Add them as a collaborator or use a team account with write access.

## 6. Sanity / Stripe

If the site uses Sanity or Stripe, configure those variables per `env.example`. They are independent of Keystatic.

## 7. Syncing this folder with GitHub

This folder (`beckford-site-feb19-source` in **portfolio-systems**) is the **canonical app snapshot**. To align **`ackersml/beckford-moves`**:

1. Replace the contents of that repo’s root with this tree (preserving `.git`).  
2. Ensure no duplicate nested copy of the app unless Vercel Root Directory matches.  
3. Commit and push; confirm Vercel builds green and `/keystatic` loads after env vars are set.
