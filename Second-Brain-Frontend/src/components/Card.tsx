
import { ShareIcon } from "../icons/ShareIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";

interface CardProps {
  title: string; 
  type: "twitter" | "youtube";
  link: string; 
}


const iconMap = {
  twitter: TwitterIcon,
  youtube: YoutubeIcon,
};

export function Card({ title, type, link }: CardProps) {
  
  const Icon = iconMap[type];

  return (
    <div className="break-inside-avoid">
      <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border min-h-48 min-w-72">
        <div className="flex justify-between items-start">
         
          <div className="flex items-center text-gray-600 pt-1">
            <Icon />
          </div>

          <div className="text-center font-semibold flex-grow mx-2">{title}</div>

         
          <div className="flex items-center text-gray-600 pt-1">
            <div className="pr-3">
              <a href={link} target="_blank" rel="noopener noreferrer">
                <ShareIcon />
              </a>
            </div>
            <div>
              <TrashIcon/>
            </div>
          </div>
        </div>

        <div className="pt-4">
          {type === "youtube" && (
            <iframe
              className="w-full aspect-video" 
              src={link
                .replace("watch", "embed")
                .replace("?v=", "/")}
              title="Youtube Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}