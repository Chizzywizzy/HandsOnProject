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
