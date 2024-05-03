type props = {
  type?: string,
  placeholder?: string,
  className?: string,
  value?: any,
  onChange?: any,
  text?: string
}

export default function (props: props) {
  if (props.text) {
    return (
      <div className="mb-4">
        <div className="text-sm pb-1">{props.text}</div>
        <input
          type={props.type || 'text'}
          placeholder={props.placeholder}
          className={`${props.className} bg-white rounded-md py-2 px-3 focus:outline-none w-full border border-1 border-gray-400`}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    )
  } else {
    return (
      <input
        type={props.type || 'text'}
        placeholder={props.placeholder}
        className={`${props.className} bg-white rounded-md py-2 px-3 focus:outline-none w-full border border-1 border-gray-400`}
        value={props.value}
        onChange={props.onChange}
      />
    )
  }

  // props.text
  //   ? <div className="mb-4">
  //       <div className="text-sm pb-1">{props.text}</div>
  //       <input
  //         type={props.type || 'text'}
  //         placeholder={props.placeholder}
  //         className={`${props.className} bg-white rounded-md py-2 px-3 focus:outline-none w-full border border-1 border-gray-400`}
  //         value={props.value}
  //         onChange={props.onChange}
  //       />
  //     </div>
  //   : <input
  //       type={props.type || 'text'}
  //       placeholder={props.placeholder}
  //       className={`${props.className} bg-white rounded-md py-2 px-3 focus:outline-none w-full border border-1 border-gray-400`}
  //       value={props.value}
  //       onChange={props.onChange}
  //     />

  // return (
  //   <>
  //     <input
  //       type={props.type || 'text'}
  //       placeholder={props.placeholder}
  //       className={`${props.className} bg-white rounded-md py-2 px-3 focus:outline-none w-full border border-1 border-gray-400`}
  //       value={props.value}
  //       onChange={props.onChange}
  //     />
  //   </>
  // )
}