import { useEffect, useState } from "react";
import axios from "axios";

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name?: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
  useEffect(() => {
    try {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/get/${id}`, {
          headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
          setBlog(res.data.post);
      });
    } catch (error) {
      console.error("Failed to fetch blog data", error);
    } finally {
      setLoading(false);
    }
  }, [id]);
  return { loading, blog };
};


export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:8787/api/v1/blog/bulk", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setBlogs(res.data.posts);
        setLoading(false);
      });
  }, []);
  return { loading, blogs };
};


