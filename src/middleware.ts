import { NextResponse, NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const isAuthenticated = true

  if (isAuthenticated) {
    return NextResponse.next()
  }

  return Response.redirect(new URL('/login', request.url))
}
 
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/',
  ],
}
