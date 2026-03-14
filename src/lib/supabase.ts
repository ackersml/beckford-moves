import { createClient } from "@supabase/supabase-js";

export type SiteContentRow = { id: string; key: string; value: Record<string, unknown>; updated_at: string };

function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL is required");
  return url;
}

function getAnonKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is required");
  return key;
}

function getServiceRoleKey(): string | undefined {
  return process.env.SUPABASE_SERVICE_ROLE_KEY;
}

/** Client for public reads (anon). Use in client components or server for public data. Uses env at call time so production URL is used on Vercel. */
export function createSupabaseClient() {
  return createClient(getSupabaseUrl(), getAnonKey());
}

/** Server-only: bypasses RLS. Use for admin login check and content writes. */
export function createSupabaseAdmin() {
  const serviceRoleKey = getServiceRoleKey();
  if (!serviceRoleKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for admin");
  return createClient(getSupabaseUrl(), serviceRoleKey);
}

const BECKFORD_SCHEMA = "beckford";

/** Read: use public view. Write: use upsert RPC (beckford schema not exposed via API). */
export function siteContentTable(admin: ReturnType<typeof createSupabaseAdmin>) {
  return admin.from("beckford_site_content");
}

/** Read via public view so API works when beckford schema is not exposed. */
export function adminSecretsTable(admin: ReturnType<typeof createSupabaseAdmin>) {
  return admin.from("beckford_admin_secrets");
}
