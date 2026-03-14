# DNS Configuration for beckfordmoves.com (Vercel – beckford-moves)

**Project:** beckford-moves  
**Custom domain:** beckfordmoves.com  
**Dashboard:** https://vercel.com/michelle-ackers/beckford-moves/settings/domains  

---

## 1. Current status (from Vercel dashboard)

- **beckford-moves.vercel.app:** Valid Configuration (Production).
- **beckfordmoves.com:** **Invalid Configuration** (Production).  
  The domain is added to the project but DNS at your registrar does not yet match what Vercel expects. Once the records below are set and propagated, status will change to **Valid Configuration**.

---

## 2. Required DNS records (at your domain registrar)

Vercel shows: *“The DNS records at your provider must match the following records to verify and connect your domain to Vercel.”*

### A record (apex/root domain – required)

Use this so **beckfordmoves.com** (without www) points to Vercel.

| Field    | Value         | Notes |
|----------|---------------|--------|
| **Type** | `A`           | IPv4 address record |
| **Name** | `@`           | Apex/root (or “blank” / “beckfordmoves.com” at some registrars) |
| **Value**| `216.198.79.1`| Vercel’s current recommended IP for this project |

**Exact values to give your registrar:**

- **A record**
  - **Name/Host:** `@` (or leave blank if the registrar uses “root”)
  - **Value/Points to/Answer:** `216.198.79.1`
  - **TTL:** 3600 (or default) unless your registrar advises otherwise

### CNAME record (optional – for www)

If you want **www.beckfordmoves.com** to work and redirect to the main site:

| Field    | Value                  | Notes |
|----------|------------------------|--------|
| **Type** | `CNAME`                | Alias for another hostname |
| **Name** | `www`                  | Subdomain www |
| **Value**| `cname.vercel-dns.com` | Vercel’s CNAME target |

**Exact values to give your registrar:**

- **CNAME record**
  - **Name/Host:** `www`
  - **Value/Points to/Answer:** `cname.vercel-dns.com`
  - **TTL:** 3600 (or default)

**Note:** Vercel has introduced a new A record IP (`216.198.79.1`). The older A record `76.76.21.21` and CNAME `cname.vercel-dns.com` still work, but Vercel recommends using the new A record above for the root domain.

---

## 3. Step-by-step: updating DNS at your registrar

1. **Log in** to the account where **beckfordmoves.com** is registered (e.g. GoDaddy, Namecheap, Cloudflare, Google Domains, etc.).
2. **Open DNS management**  
   Find “DNS”, “DNS settings”, “Manage DNS”, “Nameservers” or similar for beckfordmoves.com.
3. **Add or edit the A record**
   - **Add new:** Create a new record, choose type **A**.
   - **Edit existing:** If there is already an A record for `@` (or root), edit it.
   - Set **Name/Host** to `@` (or as your registrar requires for the root domain).
   - Set **Value/Points to** to `216.198.79.1`.
   - Save.
4. **Optional – add CNAME for www**
   - Add a new record, type **CNAME**.
   - **Name/Host:** `www`
   - **Value/Points to:** `cname.vercel-dns.com`
   - Save.
5. **Remove conflicting records**  
   If you have an old A record for `@` pointing to a different IP, replace it with `216.198.79.1` (or remove the old one and add the new one). Do not leave two different A records for `@`.
6. **Save** all DNS changes at the registrar.

You can send this to your registrar: *“For the domain beckfordmoves.com, please set an A record for the root (@) to 216.198.79.1, and optionally a CNAME for www to cname.vercel-dns.com.”*

---

## 4. Alternative: switch to Vercel nameservers

Instead of adding A/CNAME records at your current DNS provider, you can **point the domain to Vercel’s nameservers**. Then Vercel can manage DNS for beckfordmoves.com.

### Nameservers to set at your registrar

At the registrar, where it asks for “Nameservers” or “Delegate domain”, set:

1. `ns1.vercel-dns.com`  
2. `ns2.vercel-dns.com`  

(Some registrars allow only two; if they allow more, you can add only these two.)

### Benefits of using Vercel nameservers

- **Automatic records:** Vercel can create the right A/CNAME records for your project; you don’t have to copy IPs or targets.
- **Wildcards:** Easier to add wildcard domains (e.g. `*.beckfordmoves.com`) if needed later.
- **Single place:** DNS and deployment are both in Vercel.
- **Fewer mistakes:** No risk of typos in IP or CNAME when editing at a third-party DNS.

### How to switch

1. At your registrar, open the nameserver/delegation settings for **beckfordmoves.com**.
2. Replace the current nameservers with:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
3. Save.  
4. In Vercel, open **Domains** for the project and use the **“Vercel DNS”** tab for this domain if you want to add or adjust records there.

**Warning:** If you had custom DNS records (email, subdomains, etc.) at your previous DNS provider, those will stop working until you re-create them in Vercel (or elsewhere). Copy any important records before switching.

---

## 5. DNS propagation and verification

### Propagation time

- **Typical:** 5 minutes to 48 hours.
- **Often:** Within 1–2 hours.
- Depends on your registrar and global DNS caches (TTL).

### How to verify

1. **Vercel dashboard**  
   Go to:  
   **https://vercel.com/michelle-ackers/beckford-moves/settings/domains**  
   - Expand **beckfordmoves.com**.  
   - When the domain status changes from **“Invalid Configuration”** to **“Valid Configuration”**, DNS is correct and the site will be served at https://beckfordmoves.com.

2. **Check A record from your machine**  
   In a terminal:
   ```bash
   dig beckfordmoves.com A +short
   ```
   You should see `216.198.79.1` (and possibly other Vercel IPs).  
   Or use: https://dnschecker.org/#A/beckfordmoves.com

3. **Open the site**  
   After status is Valid, visit **https://beckfordmoves.com**; it should load the beckford-moves production deployment.

---

## 6. Screenshots (for documentation)

Screenshots are in **`sean-site/docs/screenshots/`**:

| File | Description |
|------|--------------|
| `page-2026-03-08T16-02-09-870Z.png` | Domains list: beckford-moves.vercel.app (Valid), beckfordmoves.com (Invalid Configuration), with “Learn more” and “Edit”. |
| `page-2026-03-08T16-02-22-858Z.png` | DNS Records tab for beckfordmoves.com: required A record (Type A, Name @, Value 216.198.79.1), IP expansion note, propagation message. |
| `page-2026-03-08T16-02-39-719Z.png` | Same DNS configuration view (alternate capture). |

Use these when sharing with your registrar or for internal documentation.

---

## 7. Quick reference (copy for registrar)

**Domain:** beckfordmoves.com  
**Purpose:** Point domain to Vercel project “beckford-moves”.

**Required:**

- **A record**
  - Name: `@` (root)
  - Value: `216.198.79.1`

**Optional (for www):**

- **CNAME record**
  - Name: `www`
  - Value: `cname.vercel-dns.com`

**Alternative:** Use Vercel nameservers: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`.

---

*Document generated from Vercel dashboard (beckford-moves project, Domains).*
