import { NextRequest, NextResponse } from 'next/server'
import { getUrl } from './lib/get-url'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  console.log('Pathname:', pathname)

  // Permitir todas as chamadas de API de autenticação
  if (pathname.startsWith('/api/auth')) {
    console.log('Permitindo acesso à API de auth')
    return NextResponse.next()
  }

  const token = request.cookies.get('authjs.session-token') || request.cookies.get('__Secure-authjs.session-token')
console.log('Token presente:', !!token)

  if (pathname === '/auth') {
    console.log('cheguei em /auth');
    
    if (token) {
      console.log('cheguei em /auth e tenho token');
      return NextResponse.redirect(new URL(getUrl('/app/flooding-notification')))
    }
    return NextResponse.next()
  }
  
  if (pathname.includes('/app')) {
    console.log('cheguei em /app');
    try {
      if (!token) {
        console.log('cheguei em /app e nao tenho token');
        return NextResponse.redirect(new URL(getUrl('/auth')))
      }
      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL(getUrl('/auth')))
    }
  }
  return NextResponse.next()
}

export const config = {
  // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/api/auth/callback/:path*'
  ]
}

// import { NextRequest, NextResponse } from 'next/server'
// import { getUrl } from './lib/get-url'

// export async function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname
//   const token = request.cookies.get('authjs.session-token')
  
//   // Permitir acesso livre às rotas de autenticação
//   if (pathname.startsWith('/api/auth')) {
//     return NextResponse.next()
//   }

//   // Rota de autenticação
//   if (pathname === '/auth') {
//     if (token) {
//       return NextResponse.redirect(new URL(getUrl('/app/flooding-notification')))
//     }
//     return NextResponse.next()
//   }

//   // Rotas protegidas
//   if (pathname.startsWith('/app')) {
//     if (!token) {
//       return NextResponse.redirect(new URL(getUrl('/auth')))
//     }
//     return NextResponse.next()
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: [
//     '/auth',
//     '/app/:path*',
//     '/api/auth/:path*'
//   ]
// }
