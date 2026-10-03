import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const members = await prisma.member.findMany({
    where: q ? { name: { contains: q } } : undefined,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(members);
}
export async function POST(req: Request) {
  const b = await req.json();
  const m = await prisma.member.create({ data: { name: String(b.name), email: b.email || null, phone: b.phone || null, status: b.status || "Active", skills: b.skills || null, roles: b.roles || null, groupName: b.groupName || null } });
  await prisma.auditLog.create({ data: { actor: "local", action: "member.create", entity: "Member", entityId: String(m.id) } });
  return NextResponse.json(m);
}