import prisma from "@/lib/prisma"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()

    const refreshToken = cookieStore.get('refresh-token')?.value
  
    await prisma.user.updateMany({
      where: {
        refresh_token: refreshToken
      },
      data: {
        refresh_token: ''
      }
    })
  
    cookies().delete('access-token')
    cookies().delete('refresh-token')

    return Response.json({ status: 200, message: 'Logout successfully' }, { status: 200 });
  } catch (error) {
    console.log({error}, '<-- error Logout')
    return Response.json({ status: 500, message: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect()
  }
}
