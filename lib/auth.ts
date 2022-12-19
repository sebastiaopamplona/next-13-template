import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "local_user",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null

        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

        return user
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      return { id: "1", name: "J Smith", email: "jsmith@example.com" }
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.JWT_SECRET,
}
