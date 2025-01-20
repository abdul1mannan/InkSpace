import axios from "axios";
import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handlePublish = async () => {
    try {
      await axios
        .post(
          "$${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/create",
          {
            title: title,
            content: content,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          navigate(`/blog/${res.data.id}`);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <Appbar />
      </div>
      <div className="flex justify-center ">
        <div className="w-1/2 mb-4">
          <div className="px-4 pt-10">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="px-4 py-2">
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Content"
              rows={5}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="px-4 py-2">
            <button
              type="button"
              onClick={handlePublish}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
