"use client";
import { useEffect, useState } from "react";

const DISMISS_KEY = "cmap-install-dismissed";
const SNOOZE_MS = 30 * 86400000;

type Guide = "ios" | "desktop" | "unsupported";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}
interface StandaloneNavigator extends Navigator {
  standalone?: boolean;
}

function isInstalled(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as StandaloneNavigator).standalone === true
  );
}

function isDismissed(): boolean {
  try {
    const v = localStorage.getItem(DISMISS_KEY);
    return !!v && Date.now() - Number(v) < SNOOZE_MS;
  } catch {
    return false;
  }
}

function platform(): Guide {
  const ua = navigator.userAgent;
  const ios =
    /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (ios) return "ios";
  if (/Chrome|Edg|SamsungBrowser/.test(ua)) return "desktop";
  return "unsupported";
}

// Visible Install App action (global, bottom-right): native prompt where
// supported, friendly guidance otherwise. Never nags: dismissal snoozes 30d,
// installed state hides it entirely.
export default function InstallAppButton() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  // NOTE: must be checked in an effect, not a state initializer — SSR hydration
  // reuses server-rendered state, so an initializer would never see localStorage.
  const [gone, setGone] = useState(false);
  const [dialog, setDialog] = useState<Guide | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-only persisted-state check
    if (isInstalled() || isDismissed()) setGone(true);
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setDeferred(null);
      setDialog(null);
      setGone(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (gone) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
    setDialog(null);
    setGone(true);
  };

  async function handleClick() {
    if (deferred) {
      const d = deferred;
      setDeferred(null);
      await d.prompt();
      const choice = await d.userChoice.catch(() => null);
      if (choice?.outcome === "accepted") {
        setGone(true);
        return;
      }
    }
    setDialog(platform());
  }

  return (
    <>
      <button
        onClick={handleClick}
        aria-label="Install CMAP app"
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#B91C1C",
          color: "#fff",
          border: 0,
          borderRadius: 999,
          padding: "12px 18px",
          fontWeight: 700,
          fontSize: 15,
          fontFamily: "system-ui",
          boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
          cursor: "pointer",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 19h16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Install App
      </button>
      {dialog && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="How to install CMAP"
          onClick={(e) => e.target === e.currentTarget && setDialog(null)}
          onKeyDown={(e) => e.key === "Escape" && setDialog(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 55,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            fontFamily: "system-ui",
          }}
        >
          <div style={{ background: "#fff", borderRadius: 12, padding: 22, maxWidth: 380 }}>
            <h2 style={{ margin: "0 0 8px", fontSize: 19 }}>Install CMAP</h2>
            {dialog === "ios" && (
              <ol style={{ paddingLeft: 20, lineHeight: 1.7 }}>
                <li>
                  Tap the <strong>Share</strong> button in Safari&apos;s toolbar.
                </li>
                <li>
                  Choose <strong>Add to Home Screen</strong>, then <strong>Add</strong>.
                </li>
              </ol>
            )}
            {dialog === "desktop" && (
              <ol style={{ paddingLeft: 20, lineHeight: 1.7 }}>
                <li>Open CMAP in Chrome or Edge on this computer.</li>
                <li>
                  Click the <strong>install icon</strong> in the address bar, or menu <strong>⋮ → Install CMAP…</strong>
                </li>
              </ol>
            )}
            {dialog === "unsupported" && (
              <p style={{ lineHeight: 1.6 }}>
                This browser can&apos;t install apps. Open CMAP in <strong>Chrome or Edge</strong> (Android,
                computer) or <strong>Safari</strong> (iPhone/iPad) to install it.
              </p>
            )}
            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <button
                onClick={() => setDialog(null)}
                autoFocus
                style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff" }}
              >
                Close
              </button>
              <button
                onClick={dismiss}
                style={{ padding: "8px 14px", borderRadius: 8, border: 0, background: "#f3f4f6" }}
              >
                Don&apos;t show again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
