import prisma from "@/lib/prisma"
import { genSalt, hash } from "bcrypt"
import verifyToken from "../../middleware/verifyToken"


// /api/users
export async function GET() {
  try {
    const result = await prisma.user.findMany()
    return Response.json(result)
  } catch (error) {
    return Response.json({error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: Request) {
  const data = await request.json()

  const salt = await genSalt()
  const hashPassword = await hash(data.password, salt)

  const result = await prisma.user.create({
    data: {
      username: data.username,
      password: hashPassword
    },
  });

  const response = {
    status: 201,
    message: 'Register successfully!',
    data: result
  }

  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "Aplication/json"
    },
    status: 201
  })

}