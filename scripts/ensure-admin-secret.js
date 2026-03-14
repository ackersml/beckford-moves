/**
 * One-off: ensure beckford.admin_secrets has a password_hash.
 * Loads .env.local and uses SUPABASE_SERVICE_ROLE_KEY.
 * Run from repo root: node scripts/ensure-admin-secret.js
 */
const { readFileSync } = require("fs");
const { join } = require("path");
const { createClient } = require("@supabase/supabase-js");
const { hashSync } = require("bcryptjs");

function loadEnvLocal() {
  const path = join(__dirname, "..", ".env.local");
  try {
    const raw = readFileSync(path, "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
    }
  } catch (e) {
    console.error("Failed to load .env.local:", e.message);
    process.exit(1);
  }
}

function randomPassword(length = 16) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let s = "";
  for (let i = 0; i < length; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

async function main() {
  loadEnvLocal();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required in .env.local");
    process.exit(1);
  }

  const supabase = createClient(url, key, { db: { schema: "beckford" } });
  const table = supabase.from("admin_secrets");

  const { data: row, error: selectError } = await table.select("id, password_hash").limit(1).maybeSingle();
  if (selectError) {
    console.error("Select error:", selectError.message);
    process.exit(1);
  }

  if (row?.password_hash) {
    console.log("Admin password hash already present in beckford.admin_secrets.");
    return;
  }

  const password = randomPassword(16);
  const passwordHash = hashSync(password, 10);

  if (row?.id) {
    const { error: updateError } = await table.update({ password_hash: passwordHash }).eq("id", row.id);
    if (updateError) {
      console.error("Update error:", updateError.message);
      process.exit(1);
    }
    console.log("Updated existing row with new password hash.");
  } else {
    const { error: insertError } = await table.insert({ password_hash: passwordHash });
    if (insertError) {
      console.error("Insert error:", insertError.message);
      process.exit(1);
    }
    console.log("Inserted new admin_secrets row with password hash.");
  }

  console.log("\nGenerated admin password (save it; not stored elsewhere):", password);
  console.log("Use this to sign in at /admin.");
}

main();
