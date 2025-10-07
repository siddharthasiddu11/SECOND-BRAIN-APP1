import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

// Define the structure of a single content item
export interface Content {
  title: string;
  type: "twitter" | "youtube";
  link: string;
}

export function useContent() {
  const [contents, setContents] = useState<Content[]>([]);

  function refresh() {
    axios
      .get(BACKEND_URL + "/api/v1/content", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContents(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
      });
  }

  useEffect(() => {
    refresh();

    const interval = setInterval(() => {
      refresh();
    }, 10 * 1000);

    return () => clearInterval(interval);
  }, []);

  return { contents, refresh };
}
