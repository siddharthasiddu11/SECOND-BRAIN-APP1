import type { ReactElement } from "react"

export function SideBarItems({text, icon}: {
    text: String,
    icon: ReactElement
}) {
    return <div className="flex text-gray-700 hover:bg-gray-200 cursor-pointer rounded max-w-48 transition-all duration-150">
       <div className="p-2">
        {icon}
       </div>
       <div className="p-2">
        {text}
       </div>
    </div>
}