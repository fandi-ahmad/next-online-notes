"use client"
import { MenuItem, Menu } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LogoutUserApi } from "@/api/authApi";
import { useRouter } from "next/navigation";

export default function() {
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
      router.push('/login')
    }
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
            src='/profile-picture.png'
            alt="profile-picture"
            className="rounded-full cursor-pointer"
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
          <MenuItem onClick={handleCloseMenuProfile}>My account</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </nav>
      
    </>
  )
}