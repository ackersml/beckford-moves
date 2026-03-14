-- Run in Supabase SQL Editor (project piweqfwrfjhwtoupkzlv)
-- 1) Set admin password to Milo1234
-- 2) Reload PostgREST so API sees beckford schema (if you added it in Data API Settings)

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM beckford.admin_secrets) THEN
        UPDATE beckford.admin_secrets SET password_hash = '$2b$10$Qyj7q0gzz0YNL.4WAUvAVeHp/QDWxYMrnvoMB8FEW9QUcqrtnBI3K';
    ELSE
        INSERT INTO beckford.admin_secrets (id, password_hash) VALUES (gen_random_uuid(), '$2b$10$Qyj7q0gzz0YNL.4WAUvAVeHp/QDWxYMrnvoMB8FEW9QUcqrtnBI3K');
    END IF;
END $$;

NOTIFY pgrst, 'reload schema';

SELECT count(*) AS admin_secrets_count FROM beckford.admin_secrets;
