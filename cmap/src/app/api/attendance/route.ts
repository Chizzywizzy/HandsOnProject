import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(req: Request) {
  const b = await req.json();
  const recs = (b.records ?? []).map((r: any) => ({ sessionId: Number(b.sessionId), memberId: r.memberId ? Number(r.memberId) : null, visitorId: r.visitorId ? Number(r.visitorId) : null, present: !!r.present }));
  await prisma.attendanceRecord.deleteMany({ where: { sessionId: Number(b.sessionId) } });
  await prisma.attendanceRecord.createMany({ data: recs });
  await prisma.auditLog.create({ data: { actor: "local", action: "attendance.mark", entity: "AttendanceSession", entityId: String(b.sessionId) } });
  return NextResponse.json({ count: recs.length });
}