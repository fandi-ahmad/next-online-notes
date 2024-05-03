import { NextResponse, NextRequest } from 'next/server'
import { verify, sign } from "jsonwebtoken"
import { cookies } from 'next/headers';
import { CheckUserApi } from './api/authApi';

export async function middleware(request: NextRequest) {
  const refreshTokenCookie = request.cookies.get('refresh-token')
  
  if (!refreshTokenCookie) {
    // tidak ada refresh token di cookies
    return NextResponse.redirect(new URL('/login', request.url))
  }


  // const checkTokenByGetAllNote = await (await fetch('http://localhost:3000/api/notes/')).json()
  // console.log(checkTokenByGetAllNote, '<-- result get all note dari middleware')

  // if (checkTokenByGetAllNote.status == 403 || 401) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  // console.log(checkTokenByGetAllNote, '<-- result get all note from middleware')

}


export const config = {
  matcher: ['/']
}