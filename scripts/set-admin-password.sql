-- Run this in Supabase Dashboard: SQL Editor (project piweqfwrfjhwtoupkzlv)
-- Sets admin login password to: admin

DO $$
BEGIN
  UPDATE beckford.admin_secrets
  SET password_hash = '$2b$10$TkKd.9mt1FsFgt0zj4LmwezQPGxWmWKcqVErWwW16DtJ8BZlc2sBG'
  WHERE id = (SELECT id FROM beckford.admin_secrets LIMIT 1);
  IF NOT FOUND THEN
    INSERT INTO beckford.admin_secrets (password_hash)
    VALUES ('$2b$10$TkKd.9mt1FsFgt0zj4LmwezQPGxWmWKcqVErWwW16DtJ8BZlc2sBG');
  END IF;
END $$;
