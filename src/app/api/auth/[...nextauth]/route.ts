// src/auth.ts (or app/auth.ts if using App Router)
import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

// The Web3 authentication logic requires a custom flow. 
// We will implement the actual message signing check on the API endpoint, 
// and use the Credentials provider here for simplicity and to handle the session creation.
// NOTE: For a production app, you MUST use a database adapter with NextAuth.

export const config = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    // Custom Wallet/Credentials Provider for Web3 Auth
    Credentials({
      name: "WalletAuth",
      credentials: {
        address: { label: "Wallet Address", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials) {
        // Cast the address to its expected type, allowing for undefined
        const address = credentials.address as string | undefined;

        // 🛠️ FIX: Check for address existence and type before calling .slice()
        if (address && typeof address === 'string' && credentials.signature) {
          
          // The address is now confirmed to be a string, so .slice() is safe.
          const truncatedAddress = address.slice(0, 6) + '...' + address.slice(-4);

          // Placeholder logic: Always succeed for now, as the actual signing is on the client.
          return { 
                id: address, 
                name: truncatedAddress 
            };
        }
        
        return null;
      },
    }),
    // Email/Password provider (requires nodemailer setup or similar)
    // Placeholder - typically handled via a custom form and database lookup
    Credentials({
        name: "EmailPassword",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          
            // Your actual database lookup and password verification logic goes here
            if (credentials.email === "test@actora.xyz" && credentials.password === "password") {
                return { id: "email-user-123", name: "Actora User" };
            }
            return null;
        }
    })
  ],
  // ... other NextAuth options (pages, callbacks, session, etc.)
  pages: {
    signIn: '/auth/signin',
  }
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);