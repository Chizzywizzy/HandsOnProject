import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { buildReportDigest, summarizeReport, AI_MODEL } from "@/lib/ai";

const prisma = new PrismaClient();
const VALID = ["members", "tasks", "attendance", "visitors"] as const;

// Simple per-user rate limit: 10 requests / 10 minutes. Local MVP only.
const hits = new Map<string, number[]>();
function limited(key: string): boolean {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < 600000);
  arr.push(now);
  hits.set(key, arr);
  return arr.length > 10;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const actor = String((session.user as any).email ?? "unknown");

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  const type = String(body.type ?? "");
  const dept = String(body.dept ?? "");
  const status = String(body.status ?? "");
  if (!(VALID as readonly string[]).includes(type))
    return NextResponse.json({ error: "Unknown report type." }, { status: 400 });
  if (limited(actor)) return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });

  // Same filters as GET /api/reports, capped; personal fields never leave this block.
  let rows: any[];
  if (type === "members") {
    rows = await prisma.member.findMany({
      where: { archived: false, ...(dept ? { departmentId: Number(dept) } : {}), ...(status ? { status } : {}) },
      select: { status: true, createdAt: true, department: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: 2000,
    });
  } else if (type === "tasks") {
    const all = await prisma.task.findMany({
      select: { status: true, priority: true, dueDate: true, departmentId: true },
      orderBy: { createdAt: "desc" },
      take: 2000,
    });
    rows = all.filter((t) => (!status || t.status === status) && (!dept || String(t.departmentId) === dept));
  } else if (type === "attendance") {
    rows = await prisma.attendanceSession.findMany({
      select: { service: true, records: { select: { present: true } } },
      orderBy: { date: "desc" },
      take: 500,
    });
  } else {
    rows = await prisma.visitor.findMany({
      select: { returning: true, followUps: { select: { status: true } } },
      orderBy: { createdAt: "desc" },
      take: 2000,
    });
  }

  const digest = buildReportDigest(type, rows);
  try {
    const summary = await summarizeReport(digest);
    await prisma.auditLog.create({
      data: { actor, action: "ai.summary", entity: "Report", entityId: `${type}:${digest.total}` },
    });
    return NextResponse.json({
      type,
      total: digest.total,
      summary,
      model: AI_MODEL,
      disclaimer: "AI-generated draft for review. Verify against source records before acting.",
    });
  } catch (err: any) {
    await prisma.auditLog.create({
      data: { actor, action: "ai.summary_error", entity: "Report", entityId: type },
    });
    const m = err?.message ?? "";
    if (m === "AI_NOT_CONFIGURED")
      return NextResponse.json(
        { error: "AI summaries are not configured. Ask an admin to set GEMINI_API_KEY." },
        { status: 503 },
      );
    if (m === "AI_TIMEOUT")
      return NextResponse.json({ error: "The AI service timed out. Retry." }, { status: 504 });
    return NextResponse.json({ error: "The AI service failed. Retry." }, { status: 502 });
  }
}
