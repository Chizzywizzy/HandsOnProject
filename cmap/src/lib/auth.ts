import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Shared NextAuth options (local Credentials + role in JWT/session).
// Imported by the auth route and by protected server routes.
export const authOptions = {
  session: { strategy: "jwt" as const },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(c: any) {
        const u = await prisma.user.findUnique({
          where: { email: String((c as any)?.email) },
        });
        if (!u) return null;
        const ok = await bcrypt.compare(String((c as any)?.password), u.password);
        if (!ok) return null;
        return { id: String(u.id), email: u.email, name: u.name, role: u.role } as any;
      },
    } as any),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }: any) {
      (session.user as any).role = token.role;
      return session;
    },
  },
};

// Session gate for API routes. Returns the session email, or a 401
// NextResponse when unauthenticated. Usage:
//   const gate = await requireSession();
//   if (gate instanceof NextResponse) return gate;
// Public kiosk exception: POST /api/attendance (QR self-check-in) stays open
// by design and is documented in Docs/CMAP-PRODUCT-ASSESSMENT.md.
export async function requireSession(): Promise<string | NextResponse> {
  const session = await getServerSession(authOptions);
  const email = (session?.user as any)?.email;
  if (!email) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  return String(email);
}
