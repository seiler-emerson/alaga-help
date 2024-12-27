import { NextRequest, NextResponse } from 'next/server'
import { getUrl } from './lib/get-url'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const token = request.cookies.get('authjs.session-token')
  if (pathname === '/auth') {

    if (token) {
      return NextResponse.redirect(new URL(getUrl('/app/flooding-notification')))
    }
    return NextResponse.next()
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
