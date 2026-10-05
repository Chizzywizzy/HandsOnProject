import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET() {
  const t = await prisma.task.findMany({ orderBy: { createdAt: "desc" }, include: { comments: true } });
  const now = new Date();
  return NextResponse.json(t.map(x => ({ ...x, computed: x.status !== "Completed" && x.status !== "Cancelled" && x.dueDate && new Date(x.dueDate) < now ? "Overdue" : x.status })));
}
export async function POST(req: Request) {
  const b = await req.json();
  if (!b?.title?.trim()) return NextResponse.json({ error: "Title required" }, { status: 400 });
  const t = await prisma.task.create({ data: { title: String(b.title).trim(), description: b.description || null, owner: b.owner || null, departmentId: b.departmentId ? Number(b.departmentId) : null, priority: b.priority || "Medium", dueDate: b.dueDate ? new Date(b.dueDate) : null, status: "Not Started" } });
  await prisma.auditLog.create({ data: { actor: "local", action: "task.create", entity: "Task", entityId: String(t.id) } });
  return NextResponse.json(t);
}
export async function PATCH(req: Request) {
  const b = await req.json();
  if (b.op === "comment") {
    const c = await prisma.taskComment.create({ data: { taskId: Number(b.id), text: String(b.text) } });
    return NextResponse.json(c);
  }
  const t = await prisma.task.update({ where: { id: Number(b.id) }, data: { status: b.status ?? undefined, owner: b.owner ?? undefined, completionNotes: b.completionNotes ?? undefined } });
  await prisma.auditLog.create({ data: { actor: "local", action: "task." + (b.status === "Completed" ? "close" : "update"), entity: "Task", entityId: String(t.id) } });
  return NextResponse.json(t);
}