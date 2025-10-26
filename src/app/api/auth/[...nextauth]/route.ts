import NextAuth, { type AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";

export const authConfig: AuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    Credentials({
      name: "WalletAuth",
      credentials: {
        address: { label: "Wallet Address", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials) {
        const address = credentials?.address as string | undefined;
        if (address && typeof address === "string" && credentials?.signature) {
          const truncated = `${address.slice(0, 6)}...${address.slice(-4)}`;
          return { id: address, name: truncated };
        }
        return null;
      },
    }),
    Credentials({
      name: "EmailPassword",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === "test@actora.xyz" &&
          credentials?.password === "password"
        ) {
          return { id: "email-user-123", name: "Actora User" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
};

// ✅ Correct NextAuth v5 export for Next.js App Router
export const { GET, POST } = NextAuth(authConfig);
