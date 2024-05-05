"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetNoteApi, DeleteNoteApi } from "@/api/noteApi";
import BaseButton from "@/components/BaseButton";
import BaseInput from "@/components/BaseInput";
import BaseCard from "@/components/BaseCard";
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import LoadingScreen from "@/components/LoadingScreen";
import CheckUserLogin from "@/components/CheckUserLogin";
import { useGlobalState } from "@/lib/state";

interface iNote {
  id: number,
  id_user: number,
  head: string,
  body: string
}

export default function Home() {
  const [listNotes, setListNotes] = useState<iNote[]>([])
  const [isLoad, setIsload] = useState<boolean>(true)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenBackdrop, setIsOpenBackdrop] = useState<boolean>(false)
  const [idDeleted, setIdDeleted] = useState<number>(NaN)
  const [isLoadingScreen, setIsLoadingScreen] = useGlobalState('isLoadingScreen')

  const getAllNotes = async () => {
    const result = await GetNoteApi()
    setIsload(false)
    if (result.data) {
      setListNotes(result.data)
    }
  }

  const deleteNote = async () => {
    setIsOpenModal(false)
    setIsOpenBackdrop(true)
    const result = await DeleteNoteApi(idDeleted)
    setIsOpenBackdrop(false)
    if (result.status == 200) {
      getAllNotes()
      setIdDeleted(NaN)
    }
  }

  const clickOpenDeleteModal = (id: number) => {
    setIsOpenModal(true)
    setIdDeleted(id)
  }

  const handleCloseDeleteModal = () => {
    setIsOpenModal(false)
    setIdDeleted(NaN)
  };

  useEffect(() => {
    if (!isLoadingScreen) getAllNotes()
  }, [isLoadingScreen])

  return (
    <>
      <CheckUserLogin/>
      {isLoadingScreen ? <LoadingScreen/> : null}

      <div className="w-full mb-4 flex justify-between">
        <BaseInput type="search" placeholder="search..." />
        
        <Link href='/notes'>
          <BaseButton text="➕" className="ms-3" />
        </Link>
      </div>

      {
        isLoad
        ? <div className="flex justify-center"><CircularProgress/></div>
        : listNotes.length == 0
          ? <p className="text-center">Data not yet</p>
          : <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {listNotes.map((note) => (
                <BaseCard key={note.id}
                  head={note.head}
                  body={note.body}
                  hrefId={note.id}
                  onClickDelete={() => clickOpenDeleteModal(note.id)}
                />
              ))}
            </div>
      }

      <Dialog
        open={isOpenModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            you can't put it back again!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button onClick={deleteNote}>Yes, Delete it</Button>
        </DialogActions>
      </Dialog>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isOpenBackdrop} >
        <CircularProgress color="inherit" />
      </Backdrop>

    </>
  );
}
