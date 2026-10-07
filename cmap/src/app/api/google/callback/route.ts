import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const code = new URL(req.url).searchParams.get("code") ?? "";
  const r = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ code, client_id: process.env.GOOGLE_CLIENT_ID!, client_secret: process.env.GOOGLE_CLIENT_SECRET!, redirect_uri: "http://localhost:3000/api/google/callback", grant_type: "authorization_code" }) });
  const j = await r.json();
  return NextResponse.json({ refresh_token: j.refresh_token ?? null, note: j.refresh_token ? "Paste as GOOGLE_REFRESH_TOKEN in .env, restart dev" : "No token — check consent/test-user", raw: j });
}