"use client"
import { Button } from "@mui/material"
import Image from "next/image"
import { useGlobalState } from "@/lib/state"
import { useRouter } from "next/navigation"

export default function () {
  const [currentUsername, setCurrentUsername] = useGlobalState('currentUsername')
  const [profilePicture, setProfilePicture] = useGlobalState('profilePicture')
  const router = useRouter()

  return (
    <>
      <div className="mt-8 flex justify-center text-center">
        <div>
          <Image
            src={profilePicture ? profilePicture : '/images/blank-profile-picture.png'}
            alt="profile-picture"
            className="rounded-full cursor-pointer w-48 h-48"
            width={124}
            height={124}
            priority
          />

          <p className="mt-4 text-xl">{currentUsername ? currentUsername : ''}</p>
          
          <Button onClick={() => router.push('/profile/edit')} className="capitalize mt-4" variant="contained" color="primary">
            edit profile
          </Button>
        </div>
      </div>
    </>
  )
}