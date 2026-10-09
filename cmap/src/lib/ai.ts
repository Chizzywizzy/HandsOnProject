// Server-side only. Never import this module from client components.
//
// Transport note: this module calls the official Gemini REST API directly
// with fetch. The official @google/generative-ai SDK was tried first and
// its generateContent call hangs without resolving inside this Next.js dev
// server (verified: identical call succeeds in plain Node), so REST is used.
// API key stays server-side: sent only as a query parameter over HTTPS,
// never logged, never returned to the browser.
const MODEL = "gemini-3.8-flash";
const TIMEOUT_MS = 25000;

export function aiConfigured(): boolean {
  return !!process.env.GEMINI_API_KEY;
}

export type ReportDigest = {
  type: string;
  generatedAt: string;
  total: number;
  breakdown: Record<string, number>;
  notes: string[];
};

/**
 * Reduce raw report rows to aggregate counts only.
 * Strips every personal field (names, emails, phones, notes, photos)
 * before anything may leave the server. Pure function — unit-tested.
 */
export function buildReportDigest(type: string, rows: any[]): ReportDigest {
  const breakdown: Record<string, number> = {};
  const notes: string[] = [];
  const bump = (k: string) => {
    breakdown[k] = (breakdown[k] ?? 0) + 1;
  };

  if (type === "members") {
    const cutoff = Date.now() - 30 * 86400000;
    let recent = 0;
    for (const r of rows) {
      bump(`status:${r.status ?? "Unknown"}`);
      bump(`dept:${r.department?.name ?? "Unassigned"}`);
      if (r.createdAt && new Date(r.createdAt).getTime() >= cutoff) recent++;
    }
    notes.push(`new_last_30d:${recent}`);
  } else if (type === "tasks") {
    const now = Date.now();
    let overdue = 0;
    for (const r of rows) {
      bump(`status:${r.status ?? "Unknown"}`);
      bump(`priority:${r.priority ?? "Medium"}`);
      if (
        r.status !== "Completed" &&
        r.status !== "Cancelled" &&
        r.dueDate &&
        new Date(r.dueDate).getTime() < now
      )
        overdue++;
    }
    notes.push(`overdue:${overdue}`);
  } else if (type === "attendance") {
    let present = 0;
    for (const s of rows) {
      const p = (s.records ?? []).filter((r: any) => r.present).length;
      present += p;
      bump(`service:${s.service ?? "Unknown"}`);
    }
    notes.push(`sessions:${rows.length}`, `total_present:${present}`);
  } else {
    // visitors
    let returning = 0;
    let pending = 0;
    for (const v of rows) {
      if (v.returning) returning++;
      for (const f of v.followUps ?? []) if (f.status === "Pending") pending++;
    }
    notes.push(`returning:${returning}`, `pending_followups:${pending}`);
  }

  return { type, generatedAt: new Date().toISOString(), total: rows.length, breakdown, notes };
}

/**
 * Ask Gemini for a plain-language admin summary of an aggregate digest.
 * Sends counts only — never personal data. Throws with safe messages.
 */
export async function summarizeReport(digest: ReportDigest): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    const e = new Error("AI_NOT_CONFIGURED") as Error & { code: string };
    e.code = "AI_NOT_CONFIGURED";
    throw e;
  }
  const prompt = [
    "You summarize church admin reports. Rules:",
    "- Describe trends and notable changes from the counts only.",
    "- Suggest 1-3 areas that may need administrative attention.",
    "- Never label people (no faithful/unfaithful/committed/uncommitted/good/bad).",
    "- Never invent facts beyond the counts. Keep under 150 words, plain language.",
    `Report: ${digest.type}. Total: ${digest.total}.`,
    `Breakdown: ${JSON.stringify(digest.breakdown)}.`,
    `Extra: ${digest.notes.join(", ")}.`,
  ].join("\n");

  let res: Response;
  try {
    // Key as query parameter: the x-goog-api-key header form hangs without
    // resolving inside this Next.js dev server (verified repeatedly), while
    // the query form succeeds. Key stays server-side; never logged/returned.
    res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      },
    );
  } catch (err: any) {
    if (err?.name === "TimeoutError") throw new Error("AI_TIMEOUT");
    throw new Error("AI_PROVIDER_ERROR");
  }
  if (!res.ok) throw new Error("AI_PROVIDER_ERROR");
  let text = "";
  try {
    const j = (await res.json()) as any;
    text = (j.candidates?.[0]?.content?.parts ?? []).map((p: any) => p.text ?? "").join("");
  } catch {
    throw new Error("AI_PROVIDER_ERROR");
  }
  if (!text.trim()) throw new Error("AI_EMPTY_RESPONSE");
  return text.trim();
}

export const AI_MODEL = MODEL;
