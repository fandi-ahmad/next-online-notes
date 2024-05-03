"use client"
import BaseInput from "@/components/BaseInput";
import BaseButton from "@/components/BaseButton";
import Link from "next/link";
import AuthLayout from "../layout";
import { CreateUserApi } from "@/api/userApi";
import { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const router = useRouter()

  const handleRegisterUser = ()  => {
    !username || !password || !confirmPassword
      ? alert('Input can not be empty!')
      : password !== confirmPassword ? alert('Confirm password is not same!') : createUser()   
  }

  const createUser = async () => {
    const result = await CreateUserApi({
      username: username,
      password: password
    })
    alert(result.message)
    if (result.status == 201) router.push('/')
  }


  return (
    <AuthLayout title="Register">

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

      <BaseInput
        text="Confirm password"
        placeholder="****"
        type="password"
        value={confirmPassword}
        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setConfirmPassword(e.target.value)}
      />

      <BaseButton onClick={handleRegisterUser} text="Register Now" className="w-full bg-blue-400 text-white hover:text-black" />

      <div className="text-sm flex justify-center mt-2">
        <p>
          Have an account? <Link href={'/login'} className="text-blue-600 hover:underline cursor-pointer">Login</Link>
        </p>
      </div>

    </AuthLayout>
  )
}