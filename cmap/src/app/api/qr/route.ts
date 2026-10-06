import { NextResponse } from "next/server";
import QRCode from "qrcode";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sid = searchParams.get("sessionId") ?? "";
  const base = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const url = `${base}/checkin/${sid}`;
  const qr = await QRCode.toDataURL(url);
  return NextResponse.json({ url, qr });
}