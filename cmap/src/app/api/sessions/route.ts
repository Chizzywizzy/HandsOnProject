import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET() {
  const s = await prisma.attendanceSession.findMany({ orderBy: { date: "desc" }, include: { records: true } });
  return NextResponse.json(s);
}
export async function POST(req: Request) {
  const b = await req.json();
  if (!b?.service?.trim()) return NextResponse.json({ error: "Service required" }, { status: 400 });
  const s = await prisma.attendanceSession.create({ data: { service: String(b.service).trim(), date: b.date ? new Date(b.date) : new Date(), departmentId: b.departmentId ? Number(b.departmentId) : null, groupName: b.groupName || null, eventTitle: b.eventTitle || null } });
  await prisma.auditLog.create({ data: { actor: "local", action: "session.create", entity: "AttendanceSession", entityId: String(s.id) } });
  return NextResponse.json(s);
}