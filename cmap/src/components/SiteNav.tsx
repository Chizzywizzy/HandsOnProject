"use client";
import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#install", label: "Install" },
  { href: "#contact", label: "Contact" },
];

// Public site navigation: desktop row + accessible mobile menu.
export default function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lp-nav">
      <div className="lp-inner lp-nav-row">
        <Link href="/" className="lp-brand">
          CMAP<span className="lp-brand-dot">.</span>
        </Link>
        <nav className="lp-links" aria-label="Primary">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="lp-nav-cta">
          <Link href="/login">Sign In</Link>
          <Link href="#install" className="lp-btn lp-btn-primary">
            Get Started
          </Link>
          <button
            className="lp-menu-btn"
            aria-expanded={open}
            aria-controls="cmap-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕ Close" : "☰ Menu"}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="cmap-mobile-menu"
          className="lp-inner lp-mobile-menu"
          aria-label="Mobile"
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        >
          {[{ href: "/", label: "Home" }, ...LINKS].map((l) => (
            <Link key={l.href + l.label} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setOpen(false)}>
            Sign In
          </Link>
        </nav>
      )}
    </div>
  );
}
