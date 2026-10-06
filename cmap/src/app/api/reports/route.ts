import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") ?? "members";
  const dept = searchParams.get("dept") ?? "";
  const status = searchParams.get("status") ?? "";
  if (type === "members") {
    const rows = await prisma.member.findMany({ where: { archived: false, ...(dept ? { departmentId: Number(dept) } : {}), ...(status ? { status } : {}) }, include: { department: true }, orderBy: { createdAt: "desc" } });
    return NextResponse.json({ type, count: rows.length, rows });
  }
  if (type === "tasks") {
    const rows = await prisma.task.findMany({ orderBy: { createdAt: "desc" } });
    const f = rows.filter(t => (!status || t.status === status) && (!dept || String(t.departmentId) === dept));
    return NextResponse.json({ type, count: f.length, rows: f });
  }
  if (type === "attendance") {
    const rows = await prisma.attendanceSession.findMany({ orderBy: { date: "desc" }, include: { records: true } });
    return NextResponse.json({ type, count: rows.length, rows });
  }
  const rows = await prisma.visitor.findMany({ orderBy: { createdAt: "desc" }, include: { followUps: true } });
  return NextResponse.json({ type, count: rows.length, rows });
}