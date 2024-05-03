import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";


export async function POST(request: Request) {
  try {
    const data = await request.json();

    const dataUser = await prisma.user.findFirst({
      where: {
        username: data.username
      }
    });

    if (!dataUser) {
      // user by username is not found
      return Response.json({ message: 'username or password is wrong' }, { status: 406 });
    }

    const match = await compare(data.password, dataUser.password);
    // password is not match
    if (!match) return Response.json({ message: 'username or password is wrong' }, { status: 406 });

    const userId = dataUser.id;
    const userUsername = dataUser.username;


    const accessTokenEnv: any = process.env.NEXT_PUBLIC_ONLINE_NOTES_ACCESS_TOKEN;
    const refreshTokenEnv: any = process.env.NEXT_PUBLIC_ONLINE_NOTES_REFRESH_TOKEN;

    const accessToken = sign({ userId, userUsername }, accessTokenEnv, {
      expiresIn: '30s'
    });

    const refreshToken = sign({ userId, userUsername }, refreshTokenEnv, {
      expiresIn: '1d'
    });

    await prisma.user.update({
      where: { id: userId },
      data: { refresh_token: refreshToken }
    });

    const responseData = {
      status: 200,
      message: 'Login successfully!',
    };


    cookies().set({
      name: 'access-token',
      value: accessToken,
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 30
    });

    cookies().set({
      name: 'refresh-token',
      value: refreshToken,
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24
    });

    return Response.json(responseData);

  } catch (error) {
    console.log(error, '<-- error login user');
    return Response.json({ message: 'Internal server error' }, { status: 500 });
  }
}
