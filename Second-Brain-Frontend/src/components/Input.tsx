interface InputProps{type?: string, placeholder: string,  ref?:any}

export function Input({ placeholder, type, ref}: InputProps) {
   return <div>
    <input ref={ref} placeholder={placeholder} type={type} className="px-4 py-2 border rounded m-2 border-grey-600 placeholder:text-grey-600" ></input>
   </div>
}