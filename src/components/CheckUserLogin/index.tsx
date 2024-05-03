import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckUserApi } from "@/api/authApi";
import { useGlobalState } from "@/lib/state";

export default function() {
  const router = useRouter()
  const [isLoadingScreen, setIsLoadingScreen] = useGlobalState('isLoadingScreen')

  const checkUser = async () => {
    const response = await CheckUserApi()
    if (response.status === 401 || response.status === 403) {
      router.push('/login')
    } else {
      setIsLoadingScreen(false)
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  return <></>
}