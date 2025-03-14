//bring in google provider
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import TwitchProvider from "next-auth/providers/twitch";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import type { Account } from "next-auth";

// Add types to include roles in the session and JWT
declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      roles: string[];
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    roles?: string[];
  }
}

//we need an authOptions object
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
    }),
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID ?? "",
      clientSecret: process.env.TWITCH_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    // This callback is called when creating a JWT on sign in
    async jwt({ token, account }: { token: JWT; account: Account | null }) {
      // If we have a user signing in, get or create their DB entry to get roles
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    // This callback is called whenever a session is checked
    async session({ session, token }: { session: Session; token: JWT }) {
      // Add roles from token to session
      if (session?.user) {
        session.user.roles = token.roles || [];
      }
      return session;
    },
  },
  // Add explicit secret configuration
  secret: process.env.NEXTAUTH_SECRET,
};
