"use client"
import BaseInput from "@/components/BaseInput";
import Link from "next/link";
import AuthLayout from "../layout";
import { CreateUserApi } from "@/api/userApi";
import { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckUserApi } from "@/api/authApi";
import LoadingScreen from "@/components/LoadingScreen";
import { useGlobalState } from "@/lib/state";
import { Button } from "@mui/material";

export default function Register() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [isLoadingScreen, setIsLoadingScreen] = useGlobalState('isLoadingScreen')
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

  const checkUserLoginBefore = async () => {
    const response = await CheckUserApi()
    response.status === 200 ? router.push('/') : setIsLoadingScreen(false)
  }

  useEffect(() => {
    checkUserLoginBefore()
  }, [])


  return (
    <>
      {isLoadingScreen ? <LoadingScreen/> : null}
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

        <Button variant="contained" color="primary" className="w-full capitalize" onClick={handleRegisterUser}>
          Register Now
        </Button>

        <div className="text-sm flex justify-center mt-2">
          <p>
            Have an account? <Link href={'/login'} className="text-blue-600 hover:underline cursor-pointer">Login</Link>
          </p>
        </div>

      </AuthLayout>
    </>
  )
}