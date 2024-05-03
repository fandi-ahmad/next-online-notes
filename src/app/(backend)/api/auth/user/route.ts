import verifyToken from "@/app/(backend)/middleware/verifyToken";

// for check user login by token

export async function GET() {
  const resultVerify = await verifyToken();
  if (resultVerify?.status !== 403 && resultVerify?.status !== 401) return Response.json({
    status: 200,
    message: 'user is login'
  }, { status: 200 });
  return Response.json(resultVerify, { status: resultVerify?.status });
}
