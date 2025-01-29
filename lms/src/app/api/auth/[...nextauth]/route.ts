import NextAuth from "next-auth";
import Googleprovider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    Googleprovider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
