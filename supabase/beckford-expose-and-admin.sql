-- Run this entire file in Supabase Dashboard → SQL Editor (project piweqfwrfjhwtoupkzlv).
-- 1) Ensures beckford schema is granted so it can be exposed in API settings.
-- 2) Ensures one admin password row exists for /admin login.

-- Grants for beckford schema (required before exposing in API settings)
GRANT USAGE ON SCHEMA beckford TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA beckford TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA beckford TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA beckford TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA beckford GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA beckford GRANT ALL ON ROUTINES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA beckford GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;

-- Ensure admin_secrets has one row (password: Milo1234). Inserts only if table is empty.
INSERT INTO beckford.admin_secrets (password_hash)
SELECT '$2b$10$eCP3AW7/4MArykRJWeDoJeH3BWEGCwMg5AATwI2ZtHE9V0NsIUoJi'
WHERE NOT EXISTS (SELECT 1 FROM beckford.admin_secrets LIMIT 1);

-- If the table already has a row but no password_hash, run instead:
-- UPDATE beckford.admin_secrets SET password_hash = '$2b$10$eCP3AW7/4MArykRJWeDoJeH3BWEGCwMg5AATwI2ZtHE9V0NsIUoJi';
