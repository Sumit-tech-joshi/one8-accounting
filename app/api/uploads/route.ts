import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name}`;
  const { error } = await supabaseAdmin.storage.from("images").upload(filename, buffer, { contentType: file.type });

  if (error) return NextResponse.json({ error }, { status: 500 });

  const { data } = supabaseAdmin.storage.from("images").getPublicUrl(filename);
  return NextResponse.json({ url: data.publicUrl });
}
