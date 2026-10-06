import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET() {
  const [members, visitors, sessions, events, tasks, followUps] = await Promise.all([
    prisma.member.count({ where: { archived: false } }),
    prisma.visitor.count(),
    prisma.attendanceSession.findMany({ include: { records: true }, orderBy: { date: "desc" }, take: 5 }),
    prisma.event.findMany({ orderBy: { date: "asc" }, take: 5 }),
    prisma.task.findMany(),
    prisma.followUp.count({ where: { status: "Pending" } }),
  ]);
  const now = new Date();
  const pending = tasks.filter(t => t.status !== "Completed" && t.status !== "Cancelled").length;
  const overdue = tasks.filter(t => t.status !== "Completed" && t.status !== "Cancelled" && t.dueDate && new Date(t.dueDate) < now).length;
  const attendance = sessions.reduce((n, s) => n + s.records.filter(r => r.present).length, 0);
  return NextResponse.json({ members, visitors, attendance, upcomingEvents: events.length, pending, overdue, followUps, sessions, events });
}