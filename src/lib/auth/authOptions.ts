import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/github';

const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXUTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // ...add more providers here
  ],
};

export default authOptions;