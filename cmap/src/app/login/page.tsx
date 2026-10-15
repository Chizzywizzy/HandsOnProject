"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Enter your email and password to continue.");
      return;
    }
    setError("");
    setBusy(true);
    try {
      const r = await signIn("credentials", { email: email.trim(), password, redirect: false });
      if (r?.error) {
        setError("Those details were not recognized. Check them and try again.");
        return;
      }
      router.push("/");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="login-shell">
      <div className="login-card">
        <Link href="/" style={{ color: "#4b5563", fontSize: 14 }}>
          ← Back to home
        </Link>
        <h1 style={{ margin: "12px 0 4px", fontSize: 26 }}>Welcome Back</h1>
        <p style={{ margin: 0, color: "#4b5563", fontSize: 14 }}>
          Sign in to manage your church&apos;s members, attendance, tasks, and reports.
        </p>
        <form onSubmit={submit} noValidate>
          <label htmlFor="cmap-email">Email address</label>
          <input
            id="cmap-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.org"
          />
          <label htmlFor="cmap-password">Password</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              id="cmap-password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "Hide password" : "Show password"}
              aria-pressed={show}
              style={{ padding: "11px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "#fff" }}
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
          {error && (
            <div className="login-err" role="alert">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={busy}
            className="lp-btn lp-btn-primary"
            style={{ width: "100%", marginTop: 18, opacity: busy ? 0.7 : 1 }}
          >
            {busy ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <p style={{ color: "#6b7280", fontSize: 13, marginTop: 16 }}>
          Accounts are created by your church administrator — there is no public sign-up.
        </p>
      </div>
    </main>
  );
}
