import prisma from "@/lib/prisma";
import { genSalt, hash, compare } from "bcrypt"

interface dataRequestType {
  id: number,
  old_password: string,
  new_password: string,
}

export async function PUT(request: Request) {
  const data: dataRequestType = await request.json()

  const userById = await prisma.user.findFirst({
    where: { id: data.id }
  })

  if (userById) {
    const match = compare(data.old_password, userById.password)
    if (!match) {
      return Response.json({ status: 400, message: 'old password is not match' }, { status: 400 });
    }

    const salt = await genSalt()
    const hashPassword = await hash(data.new_password, salt)
  
    const result = await prisma.user.update({
      where: { id: data.id },
      data: { password: hashPassword },
    });
  
    const response = {
      status: 200,
      message: 'ok',
      data: result
    }
  
    return Response.json(response, { status: 200 });

  // user by id tidak ditemukan
  } else {
    return Response.json({ status: 400, message: 'user is not found' }, { status: 400 });
  }

}