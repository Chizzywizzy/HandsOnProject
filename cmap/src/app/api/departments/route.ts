import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET() {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;
  const d = await prisma.department.findMany({ orderBy: { createdAt: "desc" }, include: { _count: { select: { members: true } } } });
  return NextResponse.json(d);
}
export async function POST(req: Request) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;
  const b = await req.json();
  if (!b?.name?.trim()) return NextResponse.json({ error: "Name required" }, { status: 400 });
  const d = await prisma.department.create({ data: { name: String(b.name).trim(), type: b.type || "Department" } });
  await prisma.auditLog.create({ data: { actor: session, action: "department.create", entity: "Department", entityId: String(d.id) } });
  return NextResponse.json(d);
}