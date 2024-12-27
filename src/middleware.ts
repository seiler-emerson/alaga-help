import { NextRequest, NextResponse } from 'next/server'
import { getUrl } from './lib/get-url'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const token = request.cookies.get('authjs.session-token')

  // Tratamento para a rota raiz
  if (pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL(getUrl('/app/flooding-notification')))
    }
    return NextResponse.redirect(new URL(getUrl('/auth')))
  }

  if (pathname === '/auth') {

    if (token) {
      return NextResponse.redirect(new URL(getUrl('/app/flooding-notification')))
    }
    return NextResponse.next()
  }

  if (pathname.startsWith('/auth')) {
    if (pathname === '/auth/verify') {
      // Permitir a rota de verificação, independentemente do token
      return NextResponse.next();
    }

    if (token) {
      return NextResponse.redirect(new URL(getUrl('/app/flooding-notification')));
    }
    return NextResponse.next();
  }

  if (pathname.includes('/app')) {
    try {

      if (!token) {
        return NextResponse.redirect(new URL(getUrl('/auth')))
      }
      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL(getUrl('/auth')))
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
