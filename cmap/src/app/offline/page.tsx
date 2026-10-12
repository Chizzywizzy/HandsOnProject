import Link from "next/link";

export default function Offline() {
  return (
    <main style={{ padding: 32, fontFamily: "system-ui", textAlign: "center" }}>
      <h1>You are offline</h1>
      <p style={{ color: "#6b7280" }}>
        CMAP needs a connection for church records — nothing is stored or changed on this device while
        offline.
      </p>
      <Link href="/" style={{ color: "#B91C1C", fontWeight: 700 }}>
        Retry — back to CMAP home
      </Link>
    </main>
  );
}
