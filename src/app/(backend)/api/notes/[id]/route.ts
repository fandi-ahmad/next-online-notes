import prisma from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const result = await prisma.note.findFirst({
    where: {
      id: parseInt(params.id)
    }
  })

  return Response.json({
    message: 'get one note',
    data: result
  })
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const result = await prisma.note.update({
      where: {
        id: parseInt(params.id)
      },
      data: {
        head: data.head,
        body: data.body
      }
    })
  
    return Response.json({
      status: 200,
      message: 'update note successfully!',
      data: result
    })
  } catch (error) {
    return Response.json({message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await prisma.note.delete({
      where: {
        id: parseInt(params.id)
      }
    })
  
    const message = {
      status: 200,
      message: 'delete note successfully',
      data: result
    }
  
    return Response.json(message)
  } catch (error) {
    return Response.json({message: 'Internal server error' }, { status: 500 });
  }
  
}