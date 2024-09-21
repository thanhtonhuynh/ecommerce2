import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import db from "@/_db/prisma";
import { LoginSchema } from "./_schemas";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    role: "ADMIN" | "USER";
    createdAt: Date;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "ADMIN" | "USER";
    createdAt: Date;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await db.user.findUnique({
            where: { email: email.toLowerCase() },
          });

          if (!user || !user.hashedPassword) return null;

          const passwordMatch = await bcrypt.compare(
            password,
            user.hashedPassword,
          );

          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
          id: token.sub,
          createdAt: token.createdAt,
        },
      };
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.createdAt = user.createdAt;
      }

      return token;
    },
  },
});
