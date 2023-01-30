import NextAuth, { type NextAuthOptions } from "next-auth";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  // session: {
  //   strategy: "jwt",
  // },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    // session: async ({ session, token }) => {
    //   if (token) {
    //     session.id = token.id;
    //   }

    //   return session;
    // },
    async signIn({ user, profile }) {
      console.log("callback.signIn (user): ", user);
      console.log("callback.signIn (profile): ", profile);
      return Promise.resolve(true);
    },
  },

  adapter: PrismaAdapter(prisma),

  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      // profile(profile: GithubProfile) {
      //   return {
      //     id: profile.id.toString(),
      //     name: profile.name,
      //     email: profile.email,
      //     image: profile.avatar_url,
      //     user: profile,
      //   };
      // },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
