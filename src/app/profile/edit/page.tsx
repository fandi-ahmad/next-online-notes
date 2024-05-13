"use client"
import { SetStateAction, useState, useEffect } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import Image from "next/image"
import { useGlobalState } from "@/lib/state"
import { useRouter } from "next/navigation"
import BaseInput from "@/components/BaseInput"
import { UpdateUserApi } from "@/api/userApi"

export default function() {
  const [currentUsername, setCurrentUsername] = useGlobalState('currentUsername')
  const [profilePicture, setProfilePicture] = useGlobalState('profilePicture')
  const [idUser, setIdUser] = useGlobalState('idUser')
  const [newUsername, setNewUsername] = useState<string>('')
  const [newProfilePicture, setNewProfilePicture] = useState<any>('')
  const [newProfilePictureUrl, setNewProfilePictureUrl] = useState<any>('')
  const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    setNewUsername(currentUsername)
  }, [currentUsername])

  const handleInputFile = (e: any) => {
    const imageSelect = e.target.files[0]
    if (imageSelect.type === 'image/png' || imageSelect.type === 'image/jpg' || imageSelect.type === 'image/jpeg') {
      setNewProfilePicture(imageSelect)
      setNewProfilePictureUrl(URL.createObjectURL(imageSelect))
    } else {
      openAlert()
    }
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append('id', idUser.toString())
    formData.append('username', newUsername)
    formData.append('profile_picture', newProfilePicture)

    const result = await UpdateUserApi(formData)
    if (result.status === 200) {
      setCurrentUsername(newUsername)
      router.push('/profile')
    }
  }

  const openAlert = () => {
    setIsOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  return (
    <>
      <div className="mt-8 flex justify-center text-center">
        <div>
          <Image
            src={newProfilePictureUrl || profilePicture || '/images/blank-profile-picture.png'}
            alt="profile-picture"
            className="rounded-full w-48 h-48 mx-auto"
            width={124}
            height={124}
            priority
          /> <br />

          <div className="w-80">
            <BaseInput type="file" onChange={handleInputFile} />

            <BaseInput
              className="mt-4"
              placeholder="Username"
              value={newUsername}
              onChange={(e: { target: { value: SetStateAction<string> } }) => setNewUsername(e.target.value)}
            />
          </div>
          
          <Button onClick={handleUpdateProfile} className="capitalize mt-4" variant="contained" color="primary">
            simpan
          </Button>
        </div>
      </div>

      <Dialog
        open={isOpenAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">invalid file extension</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}