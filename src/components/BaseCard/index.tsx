import Link from "next/link"

type props = {
  head: string,
  body: string,
  hrefId?: string | number,
  onClickDelete?: any
}

export default function(props: props) {
  return (
    <div className="bg-white border border-1 border-gray-400 rounded w-full cursor-pointer flex flex-col justify-between">
      <Link href={`/notes?id_note=${props.hrefId}`} className="h-full">
        <div className="p-3 h-full">
          <h2 className="font-bold pb-1">{props.head}</h2>
          <p className="text-sm">{props.body}</p>
        </div>
      </Link>
      <div className="flex justify-end items-end mt-1 text-xs px-3 pb-3">
        <span onClick={props.onClickDelete} title="delete this note">❌</span>
      </div>
    </div>
  )
}