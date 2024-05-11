"use client"
import { MenuItem, Menu } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoutUserApi, CheckUserApi } from "@/api/authApi";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/lib/state";

export default function() {
  const [currentUsername, setCurrentUsername] = useGlobalState('currentUsername')
  const [profilePicture, setProfilePicture] = useGlobalState('profilePicture')
  const [idUser, setIdUser] = useGlobalState('idUser')

  const checkUserLoginData = async () => {
    const result = await CheckUserApi()
    if (result.data) {
      setIdUser(result.data.id)
      setCurrentUsername(result.data.username)
      setProfilePicture(result.data.profile_picture)
    }
  }

  useEffect(() => {
    checkUserLoginData()
  }, [currentUsername])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleClickProfilePicture = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenuProfile = () => setAnchorEl(null);

  const router = useRouter()
  const logout = async () => {
    const response = await LogoutUserApi()
    if (response.status === 200) {
      handleCloseMenuProfile()
      router.push('/login')
    }
  }

  const goToProfilePage = () => {
    handleCloseMenuProfile()
    router.push('/profile')
  }


  return (
    <>
      <nav className="flex justify-between items-center mb-4">
        <Link href={'/'}>
          <h1 className="text-xl font-semibold text-gray-800">Online Notes</h1>
        </Link>
        <button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickProfilePicture}
        >
          <Image
            src={profilePicture ? profilePicture : '/images/blank-profile-picture.png'}
            alt="profile-picture"
            className="rounded-full cursor-pointer w-10 h-10"
            width={48}
            height={48}
            priority
          />

        </button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenuProfile}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={goToProfilePage}>My Profile</MenuItem>
          <MenuItem onClick={handleCloseMenuProfile}>Change Password</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </nav>
      
    </>
  )
}