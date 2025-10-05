import { supabaseAdmin } from "../lib/supabaseAdmin";
import { hashPassword } from "../lib/auth";

async function main() {
  const email = "admin@yourdomain.com";
  const pwd = "ChangeMe123!"; // change this after first login

  const { data } = await supabaseAdmin
    .from("users")
    .select("*").eq("email", email);

  if (data && data.length > 0) {
    console.log("Admin already exists");
    return;
  }

  const res = await supabaseAdmin.from("users").insert([{
    email,
    password_hash: hashPassword(pwd),
    name: "Site Admin",
    role: "admin"
  }]);

  console.log("Seeded admin:", res);
}

main().catch(console.error);