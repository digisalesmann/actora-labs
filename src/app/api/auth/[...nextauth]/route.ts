import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      // This comment explicitly tells ESLint to ignore the "unused variables" rule for the next line.
      // This is the most definitive way to solve this specific warning.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(_credentials, _req) {
        // Your real user authentication logic will go here later.
        // For now, we return a mock user to make the setup work.
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        if (user) {
          return user;
        }
        return null;
      }
    })
  ],
});

export { handler as GET, handler as POST };
