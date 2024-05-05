import { NextResponse, NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const refreshTokenCookie = request.cookies.get('refresh-token')
  
  if (!refreshTokenCookie) {
    // tidak ada refresh token di cookies
    return NextResponse.redirect(new URL('/login', request.url))
  }

}


export const config = {
  matcher: ['/']
}