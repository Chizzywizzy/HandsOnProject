import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
const handler = NextAuth({
  session: { strategy: "jwt" },
  providers: [Credentials({
    credentials: { email: {}, password: {} },
    async authorize(c) {
      const u = await prisma.user.findUnique({ where: { email: String(c?.email) } });
      if (!u) return null;
      const ok = await bcrypt.compare(String(c?.password), u.password);
      if (!ok) return null;
      return { id: String(u.id), email: u.email, name: u.name, role: u.role } as any;
    }} as any)],
  callbacks: {
    async jwt({ token, user }: any) { if (user) token.role = user.role; return token; },
    async session({ session, token }: any) { (session.user as any).role = token.role; return session; },
  },
});
export { handler as GET, handler as POST };