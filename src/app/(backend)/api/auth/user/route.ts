import verifyToken from "@/app/(backend)/middleware/verifyToken";

// for check user login by token

export async function GET() {
  const resultVerify = await verifyToken();
  return Response.json(resultVerify, { status: resultVerify?.status });
}
