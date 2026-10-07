import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function googleToken() {
  const r = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: process.env.GOOGLE_CLIENT_ID!, client_secret: process.env.GOOGLE_CLIENT_SECRET!, refresh_token: process.env.GOOGLE_REFRESH_TOKEN!, grant_type: "refresh_token" }) });
  const j = await r.json();
  return j.access_token as string;
}
export async function GET() {
  const e = await prisma.event.findMany({ orderBy: { date: "asc" }, include: { attendees: true, notes: true } });
  return NextResponse.json(e);
}
export async function POST(req: Request) {
  const b = await req.json();
  if (!b?.title?.trim()) return NextResponse.json({ error: "Title required" }, { status: 400 });
  const e = await prisma.event.create({ data: { title: String(b.title).trim(), date: b.date ? new Date(b.date) : new Date(), time: b.time || null, venue: b.venue || null, description: b.description || null, coordinator: b.coordinator || null, status: b.status || "Planned" } });
  await prisma.auditLog.create({ data: { actor: "local", action: "event.create", entity: "Event", entityId: String(e.id) } });
  try {
    if (process.env.GOOGLE_REFRESH_TOKEN) {
      const at = await googleToken();
      await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", { method: "POST", headers: { Authorization: "Bearer " + at, "Content-Type": "application/json" }, body: JSON.stringify({ summary: e.title, location: e.venue || undefined, description: (e.description || "") + `\nCMAP event #${e.id}`, start: { dateTime: new Date(e.date).toISOString() }, end: { dateTime: new Date(new Date(e.date).getTime() + 3600000).toISOString() } }) });
    }
  } catch {}
  return NextResponse.json(e);
}
export async function PATCH(req: Request) {
  const b = await req.json();
  if (b.op === "attend") {
    const a = await prisma.eventAttendee.create({ data: { eventId: Number(b.id), memberId: b.memberId ? Number(b.memberId) : null, name: b.name || null } });
    return NextResponse.json(a);
  }
  if (b.op === "note") {
    const n = await prisma.eventNote.create({ data: { eventId: Number(b.id), text: String(b.text) } });
    return NextResponse.json(n);
  }
  const e = await prisma.event.update({ where: { id: Number(b.id) }, data: { status: b.status } });
  return NextResponse.json(e);
}