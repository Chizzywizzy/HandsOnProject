import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import InstallAppButton from "@/components/InstallAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neducmap-1207.netlify.app"),
  title: "CMAP – Church Management & Accountability Platform",
  description:
    "Manage members, attendance, events, tasks and reports with clear accountability. AI assists. Humans decide.",
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "CMAP", statusBarStyle: "default" },
  icons: { icon: "/icons/icon-192.png", apple: "/icons/apple-touch-icon.png" },
  applicationName: "CMAP",
  openGraph: {
    title: "CMAP – Church Management & Accountability Platform",
    description:
      "Member records, attendance, follow-ups, tasks, and reports in one accountable system.",
    url: "/",
    siteName: "CMAP",
    type: "website",
    images: [{ url: "/icons/icon-512.png", width: 512, height: 512, alt: "CMAP app icon" }],
  },
  twitter: {
    card: "summary",
    title: "CMAP – Church Management & Accountability Platform",
    description:
      "Member records, attendance, follow-ups, tasks, and reports in one accountable system.",
    images: ["/icons/icon-512.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#B91C1C",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ServiceWorkerRegister />
        <InstallAppButton />
      </body>
    </html>
  );
}
