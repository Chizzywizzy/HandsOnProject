"use client";
import { useEffect, useState } from "react";

// Registers /sw.js once. Shows a small "Update available — Reload" banner
// when a new service worker takes over. No prompts, no nagging.
export default function ServiceWorkerRegister() {
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    // If no controller yet, this is the first install — not an update.
    const hadController = !!navigator.serviceWorker.controller;
    let cancelled = false;
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        reg.addEventListener("updatefound", () => {
          const w = reg.installing;
          if (!w) return;
          w.addEventListener("statechange", () => {
            if (w.state === "activated" && hadController && !cancelled) setUpdate(true);
          });
        });
      })
      .catch(() => {});
    const onControl = () => {
      if (hadController) setUpdate(true);
    };
    navigator.serviceWorker.addEventListener("controllerchange", onControl);
    return () => {
      cancelled = true;
      navigator.serviceWorker.removeEventListener("controllerchange", onControl);
    };
  }, []);

  if (!update) return null;
  return (
    <div
      role="status"
      style={{
        position: "fixed",
        bottom: 76,
        right: 16,
        zIndex: 60,
        background: "#1B2A4A",
        color: "#fff",
        borderRadius: 10,
        padding: "10px 14px",
        fontFamily: "system-ui",
        display: "flex",
        gap: 10,
        alignItems: "center",
      }}
    >
      <span>New version available</span>
      <button
        onClick={() => window.location.reload()}
        style={{ background: "#C9A227", border: 0, borderRadius: 8, padding: "6px 12px", fontWeight: 700 }}
      >
        Reload
      </button>
    </div>
  );
}
