import prisma from "@/lib/prisma"
import verifyToken from "../../middleware/verifyToken"

// /api/notes
export async function GET() {
  try {
    const resultVerify = await verifyToken()
    if (resultVerify?.status === 401) return Response.json(resultVerify, { status: 401 });
    if (resultVerify?.status === 403) return Response.json(resultVerify, { status: 403 });

    const result = await prisma.note.findMany()
    const response = {
      message: 'get all notes successfully',
      data: result
    }
    return Response.json(response)
    

  } catch (error) {
    console.log(error, '<-- error get /api/notes')
    return Response.json({message: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    if (!data.id_user || !data.head || !data.body) {
      return Response.json({message: 'request has not been fulfilled' }, { status: 406 });
    }

    const dataUser = await prisma.user.findFirst({
      where: {
        id: data.id_user,
      }
    })

    if (!dataUser) {
      return Response.json({message: 'invalid user' }, { status: 406 });
    } else {
      const result = await prisma.note.create({
        data: {
          id_user: data.id_user,
          head: data.head,
          body: data.body
        },
      });
    
      
      return new Response(JSON.stringify({
        status: 201,
        message: 'create note successfully',
        data: result
      }), {
        headers: {
          "Content-Type": "Aplication/json"
        },
        status: 201
      })
    }
  } catch (error) {
    return Response.json({message: 'Internal server error' }, { status: 500 });
  }
}