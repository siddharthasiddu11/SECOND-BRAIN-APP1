import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModel, ContentType } from "../components/CreateContentModel";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { SideBar } from "../components/SideBar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface Content {
  type: ContentType;
  title: string;
  link: string;
}

export function DashBoard() {
  const [modelOpen, setModelOpen] = useState(false);
  const [filterType, setFilterType] = useState<string | null>(null);
  const { contents, refresh } = useContent<Content>();

  useEffect(() => {
    refresh();
  }, [modelOpen]);

  const filteredContents = filterType
    ? (contents as Content[]).filter((c) => c.type === filterType)
    : (contents as Content[]);

  return (
    <div>
      <SideBar onFilter={setFilterType} />

      <div className="p-4 ml-72 min-h-screen bg-gray-100">
        <CreateContentModel open={modelOpen} onClose={() => setModelOpen(false)} />

        <div className="flex justify-end gap-4">
          <Button
            onClick={() => setModelOpen(true)}
            varient="primary"
            text="Add content"
            startIcon={<PlusIcon />}
          />
          <Button
            onClick={async () => {
              const response = await axios.post(
                BACKEND_URL + "/api/v1/brain/share",
                { share: true },
                {
                  headers: {
                    Authorization: localStorage.getItem("token") || "",
                  },
                }
              );
              const shareUrl = `${import.meta.env.VITE_BASE_URL ?? "http://localhost:5173"}/share/${response.data.hash}`;
              alert(shareUrl);
            }}
            varient="secondary"
            text="Share"
            startIcon={<ShareIcon />}
          />
        </div>

        <div className="columns-4 gap-4 space-y-4 pt-3">
          {filteredContents.map(({ type, link, title }) => (
            <Card key={link} type={type} link={link} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
}
