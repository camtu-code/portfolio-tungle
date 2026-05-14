import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

const DEFAULT_USERS = [
  { email: "admin@example.com", name: "Admin", password: "admin123" },
  { email: "editor@example.com", name: "Editor", password: "editor123" },
  { email: "manager@example.com", name: "Manager", password: "manager123" },
] as const;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;
        const defaultUser = DEFAULT_USERS.find((u) => u.email === email);

        if (defaultUser && defaultUser.password === password) {
          try {
            const hashedPassword = await bcrypt.hash(defaultUser.password, 10);
            const bootstrappedUser = await prisma.user.upsert({
              where: { email: defaultUser.email },
              update: {
                name: defaultUser.name,
                password: hashedPassword,
              },
              create: {
                email: defaultUser.email,
                name: defaultUser.name,
                password: hashedPassword,
              },
            });

            return {
              id: bootstrappedUser.id,
              email: bootstrappedUser.email,
              name: bootstrappedUser.name,
            };
          } catch {
            return {
              id: `hardcoded:${defaultUser.email}`,
              email: defaultUser.email,
              name: defaultUser.name,
            };
          }
        }

        let user;
        try {
          user = await prisma.user.findUnique({
            where: {
              email
            }
          });
        } catch {
          return null;
        }

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  }
})
