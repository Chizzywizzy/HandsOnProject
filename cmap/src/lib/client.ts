"use client";

// Same-origin API helper: sends the user to /login on 401 instead of letting
// pages crash on the { error } body. Callers keep working unchanged otherwise.
export async function apiFetch(input: string, init?: RequestInit): Promise<Response> {
  const r = await fetch(input, init);
  if (r.status === 401 && typeof window !== "undefined") {
    window.location.href = "/login";
    // Never resolve: halts the caller chain without an unhandled rejection.
    await new Promise(() => {});
  }
  return r;
}
