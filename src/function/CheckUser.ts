import { CheckUserApi } from "@/api/authApi"
import { useRouter } from "next/navigation"

export async function CheckUser() {
  const response = await CheckUserApi()
  const router = useRouter()

  console.log(response, '<-- respon check user dari api: /api/auth/user: src/function/CheckUser.ts')
  if (response.status === 401 || response.status === 403) {
    router.push('/login')
    return false
  } else {
    return true
  }
}