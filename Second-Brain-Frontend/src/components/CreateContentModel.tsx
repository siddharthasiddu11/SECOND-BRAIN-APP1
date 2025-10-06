import axios from "axios";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import {Input} from "./Input"
import { useRef, useState } from "react";
import { BACKEND_URL } from "../config";


enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}
interface CreateContentModalProps {
    open: boolean; 
    onClose: () => void; 
}


export function CreateContentModel ({open, onClose}: CreateContentModalProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);
  
     async function addContent () {
         const title = titleRef.current?.value;
         const link = linkRef.current?.value;

         await axios.post(BACKEND_URL + '/api/v1/content', {
           title,
           link,
           type
         }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
         })
     onClose()
    }
    return <div>
        {open &&
        <div>
            <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
            
        <div className="w-screen h-screen  fixed top-0 left-0 flex justify-center">
            <div className="flex flex-col justify-center">
                <span className="bg-white opacity-100 p-4 rounded ">
                    <div className="flex justify-end">
                        <div onClick={onClose} className="cursor-pointer">
                            <CrossIcon/>
                        </div>
                        
                    </div>
                    <div>
                       <Input ref={titleRef} placeholder={"Title"}/>
                       <Input ref={linkRef} placeholder={"Link"}/>
                    </div>
                    <div className="flex items-center justify-center flex-col ">
                        <h1>Type</h1>
                        <div className="flex gap-1 p-2 ">
                            <Button text="Youtube" varient={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => {
                            setType(ContentType.Youtube)
                            }}></Button>
                             <Button text="Twitter" varient={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
                            setType(ContentType.Twitter)
                            }}></Button>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button onClick={addContent} varient="primary" text="Submit"/>
                    </div>

                </span>
            </div>
            

          </div>
          </div>}
    </div>
}

