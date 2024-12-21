import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from '../database'
import Nodemailer from "next-auth/providers/nodemailer"
import EmailProvider from "next-auth/providers/email"

export const { auth, handlers, signIn, signOut } = NextAuth({
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