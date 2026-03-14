/**
 * Set admin password in beckford.admin_secrets. Run from repo root with .env.local present.
 * Usage: node scripts/set-admin-password.js [password]
 * Default password if none given: admin
 */
const path = require("path");
const fs = require("fs");

function loadEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) {
    console.error("Missing .env.local");
    process.exit(1);
  }
  const content = fs.readFileSync(envPath, "utf8");
  content.split("\n").forEach((line) => {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
  });
}

loadEnvLocal();

const { createClient } = require("@supabase/supabase-js");
const { hash } = require("bcryptjs");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceRoleKey) {
  console.error("Need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const password = process.argv[2] || "admin";
const supabase = createClient(url, serviceRoleKey);
const table = supabase.schema("beckford").from("admin_secrets");

async function main() {
  const hashed = await hash(password, 10);
  const { data: existing } = await table.select("id").limit(1).maybeSingle();
  if (existing?.id) {
    const { error } = await table.update({ password_hash: hashed }).eq("id", existing.id);
    if (error) {
      console.error("Update failed:", error.message);
      process.exit(1);
    }
    console.log("Admin password updated.");
  } else {
    const { error } = await table.insert({ password_hash: hashed });
    if (error) {
      console.error("Insert failed:", error.message);
      process.exit(1);
    }
    console.log("Admin password set.");
  }
  console.log("Log in at /admin with the password you used.");
}

main();