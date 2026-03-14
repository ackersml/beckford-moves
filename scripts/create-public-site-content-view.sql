-- Run in Supabase SQL Editor. Allows API to read/write site_content without exposing beckford schema.

CREATE OR REPLACE VIEW public.beckford_site_content AS
SELECT id, key, value, updated_at FROM beckford.site_content;

GRANT SELECT ON public.beckford_site_content TO anon;
GRANT SELECT ON public.beckford_site_content TO service_role;

CREATE OR REPLACE FUNCTION public.upsert_beckford_site_content(p_key text, p_value jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = beckford, public
AS $$
BEGIN
  INSERT INTO beckford.site_content (key, value)
  VALUES (p_key, p_value)
  ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();
END;
$$;
GRANT EXECUTE ON FUNCTION public.upsert_beckford_site_content(text, jsonb) TO service_role;
