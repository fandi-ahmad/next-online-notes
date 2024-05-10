import prisma from "@/lib/prisma"
import { genSalt, hash } from "bcrypt"
import verifyToken from "../../middleware/verifyToken"
import path from "path"
import { writeFile, unlink } from "fs/promises"

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

export async function PUT(req: { formData: () => any }, res: any) {
  const formData = await req.formData();
  const id = parseInt(formData.get('id'))
  const username = formData.get('username')
  const profile_picture = formData.get("profile_picture");

  try {
    // ada profile_picture
    if (profile_picture) {
      const filename = profile_picture.name.replaceAll(" ", "_");
      const newFilename = `${Date.now()}_${filename}`;
      const filePath = path.join(process.cwd(), 'public/images/', newFilename)
      const filePathInPublic = '/images/' + newFilename
    
      // Convert the file data to a Buffer
      const buffer = Buffer.from(await profile_picture.arrayBuffer());

      const userById = await prisma.user.findFirst({
        where: { id: id }
      })

      if (userById?.profile_picture) {
        const existingFilePath = path.join(process.cwd(), 'public/', userById.profile_picture);
        await unlink(existingFilePath);
      }

      // save file to directory
      await writeFile(filePath, buffer)
      await prisma.user.update({
        where: { id: id },
        data: {
          username: username,
          profile_picture: filePathInPublic
        }
      })
    
    // TIDAK ada profile_picture
    } else {
      await prisma.user.update({
        where: { id: id },
        data: { username: username }
      })
    }

    // return NextResponse.json({ Message: "Success", status: 201 });
    return Response.json({ status: 200, message: 'Ok' }, {status: 200})
  } catch (error) {
    console.log(error, '<-- error update user: api/auth/users')
    return Response.json({ status: 500, message: 'Internal server error' }, {status: 500})
  } finally {
    await prisma.$disconnect()
  } 
}
