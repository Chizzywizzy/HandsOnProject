import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET() {
  const v = await prisma.visitor.findMany({ orderBy: { createdAt: "desc" }, include: { followUps: true } });
  return NextResponse.json(v);
}
export async function POST(req: Request) {
  const b = await req.json();
  if (!b?.name?.trim()) return NextResponse.json({ error: "Name required" }, { status: 400 });
  const v = await prisma.visitor.create({ data: { name: String(b.name).trim(), contact: b.contact || null, source: b.source || null, notes: b.notes || null, returning: !!b.returning } });
  await prisma.auditLog.create({ data: { actor: "local", action: "visitor.create", entity: "Visitor", entityId: String(v.id) } });
  return NextResponse.json(v);
}
export async function PATCH(req: Request) {
  const b = await req.json();
  if (b.convert) {
    const v = await prisma.visitor.findUnique({ where: { id: Number(b.id) } });
    if (!v) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const m = await prisma.member.create({ data: { name: v.name, phone: v.contact || null, roles: v.notes || null } });
    await prisma.auditLog.create({ data: { actor: "local", action: "visitor.convert", entity: "Visitor", entityId: String(v.id) } });
    return NextResponse.json(m);
  }
  return NextResponse.json({ error: "Unknown op" }, { status: 400 });
}