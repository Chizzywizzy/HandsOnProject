import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(req: Request) {
  const b = await req.json();
  const f = await prisma.followUp.create({ data: { visitorId: Number(b.visitorId), assignee: b.assignee || null, dueDate: b.dueDate ? new Date(b.dueDate) : null, status: b.status || "Pending", outcome: b.outcome || null } });
  await prisma.auditLog.create({ data: { actor: "local", action: "followup.create", entity: "FollowUp", entityId: String(f.id) } });
  return NextResponse.json(f);
}
export async function PATCH(req: Request) {
  const b = await req.json();
  const f = await prisma.followUp.update({ where: { id: Number(b.id) }, data: { status: b.status ?? undefined, outcome: b.outcome ?? undefined, assignee: b.assignee ?? undefined } });
  await prisma.auditLog.create({ data: { actor: "local", action: "followup.update", entity: "FollowUp", entityId: String(f.id) } });
  return NextResponse.json(f);
}