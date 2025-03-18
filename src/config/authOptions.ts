import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import authServices from "@/services/auth.service";
import environment from "@/config/environment";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 24 jam
  },
  secret: environment.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined): Promise<UserExtended | null> {
        const { email, password } = credentials as { email: string; password: string };
        const result = await authServices.login({ email, password });
        const accessToken = result.data.data;
        const me = await authServices.getProfileWithToken(accessToken);
        const user = me.data.data;

        if (accessToken && result.status === 200 && me.status === 200) {
          user.accessToken = accessToken;
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWTExtended; user: UserExtended | null }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: { session: SessionExtended; token: JWTExtended }) {
      if (token) {
        session.user = token.user;
        session.accessToken = token.user?.accessToken;
      }
      return session;
    },
  },
};
