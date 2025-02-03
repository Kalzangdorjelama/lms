import NextAuth from "next-auth";
import Googleprovider from "next-auth/providers/google";
import dbConnect from "@/database/connection";
import User from "@/database/models/user.schema";
import { profile } from "console";

const handler = NextAuth({
  providers: [
    Googleprovider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // browser ko session lai lock gare ko hai simple to remember

  // An external database is a database that is not part of an organization's main system. It is typically hosted and maintained by a third party on off-site servers, and is accessible over the internet. 
  callbacks: {
    async signIn({ user }): Promise<boolean> {
      try {
        await dbConnect();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            username: user.name,
            email: user.email,
            profileImage: user.image,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
