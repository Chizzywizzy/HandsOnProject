import { describe, it } from "node:test";
import assert from "node:assert/strict";
// Runs under node --test with type stripping (excluded from tsc; see tsconfig).
import { buildReportDigest, summarizeReport } from "./ai.ts";

const PII = ["Adaeze Okafor", "ada@example.com", "08012345678", "Pastoral note: counselling"];

describe("buildReportDigest", () => {
  it("members: aggregates only, no personal data leaks", () => {
    const rows = [
      { name: "Adaeze Okafor", email: "ada@example.com", phone: "08012345678", status: "Active", createdAt: new Date().toISOString(), department: { name: "Choir" } },
      { name: "John Doe", status: "Inactive", createdAt: "2020-01-01", department: null },
    ];
    const d = buildReportDigest("members", rows);
    assert.equal(d.total, 2);
    assert.equal(d.breakdown["status:Active"], 1);
    assert.equal(d.breakdown["dept:Choir"], 1);
    const s = JSON.stringify(d);
    for (const p of PII) assert.ok(!s.includes(p), `leaked: ${p}`);
  });

  it("tasks: overdue math without personal data", () => {
    const rows = [
      { title: "Follow up", status: "Not Started", priority: "High", dueDate: "2020-01-01" },
      { title: "Done thing", status: "Completed", priority: "Low", dueDate: "2020-01-01" },
    ];
    const d = buildReportDigest("tasks", rows);
    const s = JSON.stringify(d);
    assert.ok(!s.includes("Follow up"));
    assert.ok(s.includes("overdue:1"));
  });

  it("attendance: totals present without member identities", () => {
    const rows = [
      { service: "Sunday", records: [{ present: true }, { present: false }] },
      { service: "Sunday", records: [{ present: true }] },
    ];
    const d = buildReportDigest("attendance", rows);
    assert.ok(JSON.stringify(d).includes("total_present:2"));
  });

  it("visitors: pending follow-ups counted, notes excluded", () => {
    const rows = [{ returning: true, followUps: [{ status: "Pending" }, { status: "Done" }] }];
    const d = buildReportDigest("visitors", rows);
    const s = JSON.stringify(d);
    assert.ok(s.includes("pending_followups:1"));
    assert.ok(!s.includes("Pastoral note: counselling"));
  });
});

describe("summarizeReport", () => {
  it("missing key fails closed with safe code", async () => {
    const saved = process.env.GEMINI_API_KEY;
    delete process.env.GEMINI_API_KEY;
    try {
      await assert.rejects(() => summarizeReport(buildReportDigest("members", [])), /AI_NOT_CONFIGURED/);
    } finally {
      if (saved !== undefined) process.env.GEMINI_API_KEY = saved;
    }
  });
});
