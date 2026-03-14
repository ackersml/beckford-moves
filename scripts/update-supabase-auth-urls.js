#!/usr/bin/env node
/**
 * Optional: Update Supabase Auth Site URL and Redirect URLs via Management API.
 * Requires: SUPABASE_ACCESS_TOKEN (Personal Access Token from Supabase dashboard).
 * Project ref is from NEXT_PUBLIC_SUPABASE_URL (piweqfwrfjhwtoupkzlv).
 *
 * Usage: SUPABASE_ACCESS_TOKEN=your_pat node scripts/update-supabase-auth-urls.js
 */

const PROJECT_REF = "piweqfwrfjhwtoupkzlv";
const SITE_URL = "https://beckfordmoves.com";
const REDIRECT_URLS = "https://beckfordmoves.com/**";

const token = process.env.SUPABASE_ACCESS_TOKEN;
if (!token) {
  console.error("Set SUPABASE_ACCESS_TOKEN (from https://supabase.com/dashboard/account/tokens)");
  process.exit(1);
}

const url = `https://api.supabase.com/v1/projects/${PROJECT_REF}/config/auth`;
fetch(url, {
  method: "PATCH",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    site_url: SITE_URL,
    uri_allow_list: REDIRECT_URLS,
  }),
})
  .then((r) => {
    if (!r.ok) return r.text().then((t) => Promise.reject(new Error(`${r.status}: ${t}`)));
    return r.json();
  })
  .then(() => {
    console.log("Updated Supabase Auth config:");
    console.log("  Site URL:", SITE_URL);
    console.log("  Redirect URLs (uri_allow_list):", REDIRECT_URLS);
  })
  .catch((e) => {
    console.error("Failed:", e.message);
    process.exit(1);
  });
