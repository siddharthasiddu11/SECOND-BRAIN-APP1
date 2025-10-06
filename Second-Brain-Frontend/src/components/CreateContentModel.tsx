import axios from "axios";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../config";

export enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModel({ open, onClose }: CreateContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title || !link) return;

    await axios.post(
      BACKEND_URL + "/api/v1/content",
      {
        title,
        link,
        type,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      }
    );
    onClose();
  }

  if (!open) return null;

  return (
    <div>
      <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60"></div>

      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
        <span className="bg-white opacity-100 p-4 rounded flex flex-col gap-4">
          <div className="flex justify-end">
            <div onClick={onClose} className="cursor-pointer">
              <CrossIcon />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Input ref={titleRef} placeholder="Title" />
            <Input ref={linkRef} placeholder="Link" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <h1>Type</h1>
            <div className="flex gap-2">
              <Button
                text="Youtube"
                varient={type === ContentType.Youtube ? "primary" : "secondary"}
                onClick={() => setType(ContentType.Youtube)}
              />
              <Button
                text="Twitter"
                varient={type === ContentType.Twitter ? "primary" : "secondary"}
                onClick={() => setType(ContentType.Twitter)}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={addContent} varient="primary" text="Submit" />
          </div>
        </span>
      </div>
    </div>
  );
}

