"use client"
type props = {
  text: string
  className?: string
  onClick?: any
  title?: string
}

export default function (props: props) {
  return (
    <button
      title={props.title}
      onClick={props.onClick}
      className={`${props.className} border border-1 border-gray-400 py-2 px-2.5 rounded-md bg-white hover:bg-blue-100`}
    >
      {props.text}
    </button>
  )
}