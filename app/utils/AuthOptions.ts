import { connectToDatabase } from '@/lib/mongodb';

import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import user from '@/models/user';

interface User {
  email: string;
  id: string;
  fullName: string;
}

export const AuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          await connectToDatabase();

          const chkUser = await user.findOne({ email });
          if (!chkUser) {
            throw new Error('No user found with the provided email.');
          }

          const match = await bcrypt.compare(password, chkUser.password);
          if (!match) {
            throw new Error('Incorrect password.');
          }

          return {
            email: chkUser.email,
            id: chkUser._id,
            fullName: chkUser.fullName,
          };
        } catch (error) {
          console.error('Authorize error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/login`;
      }
      return baseUrl;
    },
  },
};
