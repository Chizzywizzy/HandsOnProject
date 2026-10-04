import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET() {
  const d = await prisma.department.findMany({ orderBy: { createdAt: "desc" }, include: { _count: { select: { members: true } } } });
  return NextResponse.json(d);
}
export async function POST(req: Request) {
  const b = await req.json();
  if (!b?.name?.trim()) return NextResponse.json({ error: "Name required" }, { status: 400 });
  const d = await prisma.department.create({ data: { name: String(b.name).trim(), type: b.type || "Department" } });
  await prisma.auditLog.create({ data: { actor: "local", action: "department.create", entity: "Department", entityId: String(d.id) } });
  return NextResponse.json(d);
}