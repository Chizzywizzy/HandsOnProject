import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(req: Request) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const members = await prisma.member.findMany({
    where: { archived: false, ...(q ? { name: { contains: q } } : {}) },
    orderBy: { createdAt: "desc" },
    include: { department: true },
  });
  return NextResponse.json(members);
}
export async function POST(req: Request) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;
  const b = await req.json();
  if (!b?.name?.trim()) return NextResponse.json({ error: "Name required" }, { status: 400 });
  const m = await prisma.member.create({ data: { name: String(b.name).trim(), email: b.email || null, phone: b.phone || null, status: b.status || "Active", skills: b.skills || null, roles: b.roles || null, groupName: b.groupName || null, departmentId: b.departmentId ? Number(b.departmentId) : null, photoUrl: b.photoUrl || null } });
  await prisma.auditLog.create({ data: { actor: session, action: "member.create", entity: "Member", entityId: String(m.id) } });
  return NextResponse.json(m);
}
export async function PATCH(req: Request) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;
  const b = await req.json();
  const data: any = {};
  if (b.archived !== undefined) data.archived = !!b.archived;
  if (b.departmentId !== undefined) data.departmentId = b.departmentId ? Number(b.departmentId) : null;
  if (!Object.keys(data).length) data.archived = true;
  const m = await prisma.member.update({ where: { id: Number(b.id) }, data });
  await prisma.auditLog.create({ data: { actor: session, action: "member.update", entity: "Member", entityId: String(m.id) } });
  return NextResponse.json(m);
}