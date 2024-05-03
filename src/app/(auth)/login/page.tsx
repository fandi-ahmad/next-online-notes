"use client"
import AuthLayout from "../layout";
import BaseInput from "@/components/BaseInput";
import BaseButton from "@/components/BaseButton";
import Link from "next/link";
import { LoginUserApi } from "@/api/authApi";
import { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()

  const handleLogin = async () => {
    const response = await LoginUserApi({
      username: username,
      password: password
    })

    if (response.status === 200) {
      router.push('/')
    }
  }


  return (
    <AuthLayout title="Login">

      <BaseInput
        text="Username"
        placeholder="Username"
        value={username}
        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setUsername(e.target.value)}
      />

      <BaseInput 
        text="Create password"
        placeholder="****"
        type="password"
        value={password}
        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)}
      />


      <BaseButton
        text="Login"
        className="w-full bg-blue-400 text-white hover:text-black"
        onClick={handleLogin}
      />

      <div className="text-sm flex justify-center mt-2">
        <p>
          Not have an account? <Link href={'/register'} className="text-blue-600 hover:underline cursor-pointer">Register</Link>
        </p>
      </div>

    </AuthLayout>
  )
}