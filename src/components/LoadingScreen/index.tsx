import { CircularProgress } from "@mui/material"

export default function() {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 z-50 bg-white flex justify-center items-center">
      <CircularProgress size={80} />
    </div>
  )
}