import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { notifyTelegram } from "@/lib/notify";
const prisma = new PrismaClient();
export async function POST(req: Request) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;
  const b = await req.json();
  const f = await prisma.followUp.create({ data: { visitorId: Number(b.visitorId), assignee: b.assignee || null, dueDate: b.dueDate ? new Date(b.dueDate) : null, status: b.status || "Pending", outcome: b.outcome || null } });
  await prisma.auditLog.create({ data: { actor: session, action: "followup.create", entity: "FollowUp", entityId: String(f.id) } });
  try {
    await notifyTelegram(`Follow-up #${f.id} assigned to ${f.assignee || "unassigned"}${f.dueDate ? " due " + new Date(f.dueDate).toLocaleDateString() : ""}`);
    await prisma.notification.create({ data: { channel: "telegram", to: process.env.TG_CHAT_ID ?? "leader", body: `Follow-up #${f.id}`, status: "sent" } });
  } catch {}
  return NextResponse.json(f);
}
export async function PATCH(req: Request) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;
  const b = await req.json();
  const f = await prisma.followUp.update({ where: { id: Number(b.id) }, data: { status: b.status ?? undefined, outcome: b.outcome ?? undefined, assignee: b.assignee ?? undefined } });
  await prisma.auditLog.create({ data: { actor: session, action: "followup.update", entity: "FollowUp", entityId: String(f.id) } });
  return NextResponse.json(f);
}