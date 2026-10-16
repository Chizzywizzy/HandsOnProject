import Link from "next/link";
import SiteNav from "@/components/SiteNav";

const FEATURES: Array<[string, string, string]> = [
  ["Members", "Keep every member's profile, department, and history in one searchable place.", "👥"],
  ["Visitors", "Register guests, assign follow-ups with due dates, and convert them to members.", "🤝"],
  ["Attendance", "Record services and meetings in bulk, with QR check-in and trends.", "✅"],
  ["Departments", "Organize ministries and cells, assign leaders, and track participation.", "🏛️"],
  ["Events", "Schedule activities with venues, Maps links, calendar sync, and notes.", "📅"],
  ["Follow-ups", "Overdue flags and clear ownership mean no visitor falls through.", "🔔"],
  ["Tasks", "Ownership, deadlines, statuses, and recurring work — all visible.", "📋"],
  ["Reports", "Filterable reports with CSV/PDF export plus human-reviewed AI summaries.", "📊"],
];

export default function Home() {
  return (
    <div className="lp-wrap">
      <a href="#main-content" className="lp-skip">
        Skip to content
      </a>
      <SiteNav />
      <main id="main-content">
        <div className="lp-inner lp-hero">
          <div>
            <span className="lp-eyebrow">Church operations + accountability</span>
            <h1 className="lp-h1">Manage Your Church. Strengthen Accountability. Grow Together.</h1>
            <p className="lp-lede">
              Bring member records, attendance, follow-ups, departmental activities, and
              responsibilities into one organized platform built to help church teams work
              together more effectively.
            </p>
            <div className="lp-cta-row">
              <Link href="#features" className="lp-btn lp-btn-teal">
                Explore CMAP
              </Link>
              <Link href="/login" className="lp-btn lp-btn-ghost">
                Sign In
              </Link>
            </div>
            <div className="lp-trust">
              <span>✓ Role-based access</span>
              <span>✓ Audit trail</span>
              <span>✓ Local-first data</span>
            </div>
          </div>
          <div className="lp-mock" aria-label="Illustrative preview of the CMAP dashboard">
            <span className="lp-mock-tag">Illustrative preview — sample data</span>
            <div className="lp-mock-grid">
              {[
                ["248", "Members"],
                ["36", "Visitors"],
                ["92%", "Attendance"],
                ["7", "Pending tasks"],
                ["2", "Overdue"],
                ["5", "Follow-ups"],
              ].map(([n, l]) => (
                <div key={l} className="lp-mock-card">
                  <div className="lp-mock-num">{n}</div>
                  <div className="lp-mock-lbl">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section id="features" className="lp-inner lp-section">
          <h2 className="lp-h2">Everything a church office juggles, in one place</h2>
          <p className="lp-sub">
            Each module below is working in CMAP today. AI summaries appear only where
            configured, always as drafts a person must review.
          </p>
          <div className="lp-feat-grid">
            {FEATURES.map(([t, d, ico]) => (
              <div key={t} className="lp-feat">
                <div className="lp-feat-ico" aria-hidden="true">
                  {ico}
                </div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="lp-section-alt">
          <div className="lp-inner lp-section" id="how-it-works">
            <h2 className="lp-h2">How it works</h2>
            <div className="lp-steps">
              <div className="lp-step">
                <div className="lp-step-num">1</div>
                <h3>Organize church information</h3>
                <p className="lp-sub">Members, visitors, departments, and events live in one system instead of scattered notebooks.</p>
              </div>
              <div className="lp-step">
                <div className="lp-step-num">2</div>
                <h3>Coordinate people and work</h3>
                <p className="lp-sub">Assign follow-ups and tasks with owners and deadlines everyone can see.</p>
              </div>
              <div className="lp-step">
                <div className="lp-step-num">3</div>
                <h3>Review and decide</h3>
                <p className="lp-sub">Dashboards and reports show pending, overdue, and done — with an audit trail behind every change.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="install" className="lp-inner lp-section">
          <h2 className="lp-h2">Get CMAP on your devices</h2>
          <p className="lp-sub">Three genuine ways to use it — pick what fits your church.</p>
          <div className="lp-dl-grid">
            <div className="lp-dl">
              <h3>Android app</h3>
              <p className="lp-sub">Installable APK built from this project (v1.1, ~2.4 MB, Android 7.0+).</p>
              <p>
                <a
                  className="lp-btn lp-btn-primary"
                  href="https://github.com/Chizzywizzy/HandsOnProject/releases/download/v1.1/CMAP-v1.1.apk"
                >
                  Download APK
                </a>
              </p>
              <p className="lp-sub">
                <small>Requires internet; signed release build. Details in the release notes.</small>
              </p>
            </div>
            <div className="lp-dl">
              <h3>Install as an app</h3>
              <p className="lp-sub">
                On Android Chrome use the in-app Install button; on iPhone use Share → Add to
                Home Screen; on desktop use the address-bar install icon.
              </p>
              <p>
                <Link className="lp-btn lp-btn-ghost" href="/login">
                  Open the app to install
                </Link>
              </p>
            </div>
            <div className="lp-dl">
              <h3>Use in the browser</h3>
              <p className="lp-sub">No install needed — CMAP runs on phones, tablets, and computers.</p>
              <p>
                <Link className="lp-btn lp-btn-ghost" href="/login">
                  Sign in now
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="lp-section-alt">
          <div className="lp-inner lp-section">
            <h2 className="lp-h2">Run a pilot in your church</h2>
            <p className="lp-sub">
              We onboard a small number of churches at a time so each team gets set up well:
              member import help, role setup, and a first-month review of follow-up completion.
              No payment is required to start a pilot conversation.
            </p>
            <p>
              <a
                className="lp-btn lp-btn-teal"
                href="mailto:ned.uz07@gmail.com?subject=CMAP%20pilot%20inquiry&body=Hello%20CMAP%20team%2C%0A%0AOur%20church%20would%20like%20to%20discuss%20a%20pilot.%0A%0AChurch%20name%3A%20%0AApproximate%20membership%3A%20%0A"
              >
                Request a pilot
              </a>
            </p>
          </div>
        </section>

        <section className="lp-inner lp-section" aria-labelledby="faq-heading">
          <h2 className="lp-h2" id="faq-heading">
            Frequently asked questions
          </h2>
          <div className="lp-faq">
            <details>
              <summary>How much does CMAP cost?</summary>
              <p>
                Pilot conversations are free and carry no obligation. No fixed pricing is
                published yet — contact us to discuss what your church needs.
              </p>
            </details>
            <details>
              <summary>Where is our church&apos;s data stored?</summary>
              <p>
                Records live in a managed hosted database. Access is role-based, and every
                important change is written to an audit trail showing who did what.
              </p>
            </details>
            <details>
              <summary>Does CMAP work offline?</summary>
              <p>
                The public pages are cached for poor connections, but member records, tasks,
                and reports need an internet connection — the app tells you clearly when
                you are offline instead of showing stale data.
              </p>
            </details>
            <details>
              <summary>Is the Android app safe to install?</summary>
              <p>
                Yes — it is a signed release build produced from this project&apos;s public
                source, distributed through our GitHub releases page. It needs internet
                access because your records stay on the server.
              </p>
            </details>
            <details>
              <summary>What does the AI actually do?</summary>
              <p>
                Only one thing today: it drafts plain-language summaries of reports you
                choose to summarize. Every summary is labeled AI-generated and must be
                reviewed by a person — it never makes membership, pastoral, or financial
                decisions.
              </p>
            </details>
          </div>
        </section>

        <section className="lp-final">
          <div className="lp-inner lp-section">
            <h2 className="lp-h2">Bring order to your church office.</h2>
            <p className="lp-sub">
              Join a pilot, install the app, or sign in — every record stays accountable.
            </p>
            <div className="lp-cta-row">
              <a
                className="lp-btn lp-btn-teal"
                href="mailto:ned.uz07@gmail.com?subject=CMAP%20pilot%20inquiry"
              >
                Start a pilot conversation
              </a>
              <Link className="lp-btn lp-btn-ghost" href="/login" style={{ background: "#fff" }}>
                Sign In
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="lp-inner lp-footer">
        <div className="lp-footer-row">
          <span>
            <strong>CMAP.</strong> © 2026 Church Management & Accountability Platform
          </span>
          <span>
            <Link href="/">Home</Link> · <Link href="#features">Features</Link> ·{" "}
            <Link href="/login">Sign In</Link> · <Link href="#contact">Contact</Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
