import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from '../database'
import EmailProvider from "next-auth/providers/email"
import { createTransport } from "nodemailer"

export const { auth, handlers, signIn, signOut } = NextAuth({
  trustHost: true,
  pages: {
    signIn: '/auth',
    signOut: '/auth',
    error: '/auth',
    verifyRequest: '/auth',
    newUser: '/app/flooding-notification',
  },
  // callbacks: {
  //   async session({ session, user }) {
  //     if (session.user) {
  //       session.user.id = user.id
  //     }
  //     return session
  //   },
  //   async redirect({ url, baseUrl }) {
  //     if (url.startsWith(baseUrl)) return url
  //     if (url.startsWith("/")) return baseUrl + url
  //     return baseUrl
  //   },
  // },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' 
      ? '__Secure-authjs.session-token'
      : 'authjs.session-token',
      // name: `authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    }
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({
        identifier: email,
        url,
        provider: { server, from },
      }) => {
        const transport = createTransport(server)
        const { host } = new URL(url)
        
        await transport.sendMail({
          to: email,
          from: from,
          subject: `Faça Login no Alaga Help`,
          text: `Clique no link para fazer login: ${url}`,
          html: `
            <div style="background: #f9f9f9; padding: 20px;">
              <table style="max-width: 600px; margin: auto; background: white; border-radius: 10px; padding: 20px;">
                <tr>
                  <td style="text-align: center; padding: 20px;">
                    <h1>Bem-vindo ao Alaga Help</h1>
                    <p>Clique no botão abaixo para fazer login:</p>
                    <a 
                      href="${url}" 
                      style="background: #346df1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0px;"
                    >
                      Fazer Login
                    </a>
                    <p style="color: #666; font-size: 14px;">
                      Se você não solicitou este email, pode ignorá-lo com segurança.
                    </p>
                     <a 
                      href="https://github.com/seiler-emerson" 
                    >
                      Acesse o github do projeto aqui!
                    </a>
                  </td>
                </tr>
              </table>
            </div>
          `
        })
      }
    }),
  ],
})