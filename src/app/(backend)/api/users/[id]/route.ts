import prisma from "@/lib/prisma"

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json()
  const result = await prisma.user.update({
    where: {
      id: parseInt(params.id)
    },
    data: {
      username: data.username,
      password: data.password
    }
  })

  return Response.json(result)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const result = await prisma.user.delete({
    where: {
      id: parseInt(params.id)
    }
  })

  const message = {
    status: 200,
    message: 'delete user successfully',
    data: result
  }

  return Response.json(message)
}