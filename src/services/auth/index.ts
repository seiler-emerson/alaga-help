import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from '../database'
import EmailProvider from "next-auth/providers/email"

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth',
    signOut: '/auth',
    error: '/auth',
    verifyRequest: '/auth',
    newUser: '/app/dashboard',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    // Nodemailer = opcao oficial na documentacao, mas apos enviar esta direcionando para outro form, ao inves de usar o form ja definido
    // Nodemailer({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
})