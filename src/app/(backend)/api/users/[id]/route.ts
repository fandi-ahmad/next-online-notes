import prisma from "@/lib/prisma"

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