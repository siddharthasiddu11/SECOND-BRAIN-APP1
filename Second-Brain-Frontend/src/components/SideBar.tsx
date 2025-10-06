import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SideBarItems } from "./SideBarItems";

export function SideBar({ onFilter }: { onFilter: (type: string) => void }) {
  return (
    <div className="h-screen w-72 fixed bg-white border-r border-gray-200 left-0 top-0">
      <div
        className="flex pt-8 items-center text-2xl font-black cursor-pointer select-none"
        onClick={() => onFilter(null)}  
      >
        <div className="pl-6 pr-2 text-purple-600 ">
          <Logo />
        </div>
        Second Brain
      </div>

      <div className="pt-8 pl-6">
        <div onClick={() => onFilter("twitter")} className="cursor-pointer">
          <SideBarItems text="Twitter" icon={<TwitterIcon />} />
        </div>
        <div onClick={() => onFilter("youtube")} className="cursor-pointer">
          <SideBarItems text="Youtube" icon={<YoutubeIcon />} />
        </div>
      </div>
    </div>
  );
}
