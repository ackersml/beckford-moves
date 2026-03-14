/**
 * Force-set admin password in beckford.admin_secrets using Service Role.
 * Loads .env.local; run from repo root: npx tsx scripts/force-admin-password.ts
 */
import * as fs from "fs";
import * as path from "path";
import { createClient } from "@supabase/supabase-js";
import { hash } from "bcryptjs";

function loadEnvLocal(): void {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) throw new Error("Missing .env.local");
  const content = fs.readFileSync(envPath, "utf8");
  content.split("\n").forEach((line) => {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
  });
}

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
if (!url || !serviceRoleKey) {
  throw new Error("Need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local");
}

const PASSWORD = "Milo1234";

async function main(): Promise<void> {
  const hashed = await hash(PASSWORD, 10);
  const supabase = createClient(url, serviceRoleKey);
  const table = supabase.schema("beckford").from("admin_secrets");

  const { data: existing, error: selectError } = await table.select("id").limit(1).maybeSingle();
  if (selectError) {
    console.error("Select error:", selectError.message);
    process.exit(1);
  }

  if (existing?.id) {
    const { error: updateError } = await table.update({ password_hash: hashed }).eq("id", existing.id);
    if (updateError) {
      console.error("Update error:", updateError.message);
      process.exit(1);
    }
    console.log("Admin password updated in beckford.admin_secrets.");
  } else {
    const { error: insertError } = await table.insert({ password_hash: hashed });
    if (insertError) {
      console.error("Insert error:", insertError.message);
      process.exit(1);
    }
    console.log("Admin password inserted into beckford.admin_secrets.");
  }
  console.log("Login at /admin with password:", PASSWORD);
}

main();
