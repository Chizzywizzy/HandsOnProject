import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
export async function POST(req: Request) {
  const f = (await req.formData()).get("file") as File;
  if (!f) return NextResponse.json({ error: "No file" }, { status: 400 });
  const buf = Buffer.from(await f.arrayBuffer());
  const name = Date.now() + "-" + f.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  await writeFile(path.join(process.cwd(), "public/uploads", name), buf);
  return NextResponse.json({ url: "/uploads/" + name });
}