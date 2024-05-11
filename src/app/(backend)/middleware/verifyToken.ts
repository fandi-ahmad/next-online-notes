import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { verify, sign } from "jsonwebtoken"

const resposeUnauthorized = {
  status: 401,
  message: 'Unauthorized'
}

const responseForbidden = {
  status: 403,
  message: 'Forbidden'
}

const responOk = {
  status: '201',
  message: 'ok'
}

export default async function verifyToken() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('access-token')?.value
  const refreshToken = cookieStore.get('refresh-token')?.value
  
  const accessTokenEnv: any = process.env.NEXT_PUBLIC_ONLINE_NOTES_ACCESS_TOKEN
  const refreshTokenEnv: any = process.env.NEXT_PUBLIC_ONLINE_NOTES_REFRESH_TOKEN

  console.log({accessToken})

  if (!accessToken) {

    console.log('tidak ada access token, periksa refresh token')
    if (!refreshToken) {
      console.log('tidak ada refresh token, jangan berikan akses')
      return resposeUnauthorized
    }

    console.log('ada refresh token, lakukan verifikasi refresh token')

    const userByRefreshToken = await prisma.user.findFirst({
      where: {
        refresh_token: refreshToken,
      }
    })

    if (!userByRefreshToken) return responseForbidden

    verify(refreshToken, refreshTokenEnv, (err: any, decode: any) => {
      // token tidak valid (expired)
      if (err) return responseForbidden
      const userId = userByRefreshToken.id
      const userUsername = userByRefreshToken.username
      const accessToken = sign({userId, userUsername}, accessTokenEnv, {
        expiresIn: '30s'
      })
      
      cookies().set({
        name: 'access-token',
        value: accessToken,
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 30
      })
    })

    return {
      status: 200,
      message: 'ok',
      data: {
        username: userByRefreshToken.username,
        profile_picture: userByRefreshToken.profile_picture
      }
    }
  }

  const userByRefreshToken = await prisma.user.findFirst({
    where: {
      refresh_token: refreshToken,
    }
  })

  return {
    status: 200,
    message: 'ok',
    data: {
      username: userByRefreshToken?.username,
      profile_picture: userByRefreshToken?.profile_picture
    }
  }
}