import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET() {
  const e = await prisma.event.findMany({ orderBy: { date: "asc" }, include: { attendees: true, notes: true } });
  return NextResponse.json(e);
}
export async function POST(req: Request) {
  const b = await req.json();
  if (!b?.title?.trim()) return NextResponse.json({ error: "Title required" }, { status: 400 });
  const e = await prisma.event.create({ data: { title: String(b.title).trim(), date: b.date ? new Date(b.date) : new Date(), time: b.time || null, venue: b.venue || null, description: b.description || null, coordinator: b.coordinator || null, status: b.status || "Planned" } });
  await prisma.auditLog.create({ data: { actor: "local", action: "event.create", entity: "Event", entityId: String(e.id) } });
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