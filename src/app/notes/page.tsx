"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { GetNoteApi, CreateNoteApi, UpdateNoteApi } from "@/api/noteApi"
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation"
import BaseButton from "@/components/BaseButton"


export default function Notes() {
  const classInput = 'bg-white rounded-md py-2 px-3 focus:outline-none w-full border border-1 border-gray-400'
  const [textHead, setTextHead] = useState<string>('')
  const [textBody, setTextBody] = useState<string>('')

  const searchParams = useSearchParams()
  const router = useRouter()
  const idNote = searchParams.get('id_note')
  
  const getNoteById = async () => {
    const result = await GetNoteApi(idNote)
    if (result.data) {
      setTextHead(result.data.head)
      setTextBody(result.data.body)
    }
  }

  const createNote = async () => {
    console.log('lakukan create');
    const result = await CreateNoteApi({
      head: textHead,
      body: textBody,
      id_user: 1
    })
    if (result.status == 201) {
      alert(result.message)
      router.push('/')
    }
  }

  const updateNote = async () => {
    console.log('lakukan update');
    const result = await UpdateNoteApi({
      head: textHead,
      body: textBody,
      id_user: idNote
    })
    console.log(result, '<-- result update note');
    
    if (result.status == 200) {
      alert(result.message)
      router.push('/')
    }
  }

  const createOrUpdateNote = async () => {
    if (!textHead || !textBody) {
      alert('head and body is required!');
    } else {
      idNote ? updateNote() : createNote();
    }
  }

  useEffect(() => {
    if (idNote) {
      getNoteById()
    }
  }, [])

  return (
    <>
      <div className="w-full mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Title here"
          className={classInput}
          value={textHead}
          onChange={(e) => setTextHead(e.target.value)}
        />
      </div>

      <div>
        <textarea
          cols={1} rows={8}
          className={classInput} 
          placeholder="Text here"
          value={textBody}
          onChange={(e) => setTextBody(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <Link href='/'>
          <BaseButton title="Kembali" text="⬅️" />
        </Link>

        <BaseButton onClick={createOrUpdateNote} className="ms-3" title="Simpan" text="💾"/>
      </div>
    </>
  )
}