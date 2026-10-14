import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
export async function GET() {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;
  const base = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const p = new URLSearchParams({ client_id: process.env.GOOGLE_CLIENT_ID!, redirect_uri: `${base}/api/google/callback`, response_type: "code", scope: "https://www.googleapis.com/auth/calendar.events", access_type: "offline", prompt: "consent" });
  return NextResponse.redirect("https://accounts.google.com/o/oauth2/v2/auth?" + p.toString());
}