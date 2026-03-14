-- Run once in Supabase SQL Editor (project piweqfwrfjhwtoupkzlv).
-- Allows the API (public schema) to read admin password without exposing beckford schema.

CREATE OR REPLACE VIEW public.beckford_admin_secrets AS
SELECT id, password_hash FROM beckford.admin_secrets;

GRANT SELECT ON public.beckford_admin_secrets TO service_role;
GRANT SELECT ON public.beckford_admin_secrets TO anon;
